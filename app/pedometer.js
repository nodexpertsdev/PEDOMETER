import React, { Component } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import Pedometer from 'react-native-pedometer';
import ProgressCircle from 'react-native-progress-circle';
import helper from './util/helper';
import { weekDays, month } from './util/config';
import { styles, color } from './pedometer.style';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayStepCount: 0,
      money: 0,
      totalSteps: 0,
    };
    this.activeDate = null;
    this.startDate = null;
    this.totalSteps = 0;
    this.now = new Date();
    this.now.setHours(0, 0, 0, 0);
    this.getStartDate();
    this.getTodaySteps();
    this.getTotalSteps();
  }

  getPercentage = () => this.state.todayStepCount.numberOfSteps / 100;

  getStartDate = async () => {
    try {
      this.startDate = await helper.getItem('startDate');
    } catch (error) {
      Alert.alert(`Error Occured ${error}`);
    }
    if (!this.startDate) {
      try {
        await helper.setItem('startDate', new Date());
      } catch (error) {
        Alert.alert(`Error Occured ${error}`);
      }
    }
  }

  getTodaySteps = async () => {
    try {
      this.activeDate = await helper.getItem('activeDate');
    } catch (error) {
      Alert.alert(`Error Occured ${error}`);
    }
    if (!this.activeDate) {
      try {
        await helper.setItem('activeDate', this.now);
      } catch (error) {
        Alert.alert(`Error Occured ${error}`);
      }
    }
    Pedometer.isStepCountingAvailable((error, isAvailable) => {
      if (isAvailable) {
        Pedometer.startPedometerUpdatesFromDate(
          new Date(this.activeDate).getTime(),
          (pedometerData) => {
            if (new Date(pedometerData.startDate) < this.now) {
              const newActiveDate = new Date();
              newActiveDate.setHours(0, 0, 0, 0);
              this.setActiveDate(newActiveDate);
              this.saveStepCounting();
            }
            this.setState({
              todayStepCount: pedometerData,
              money: parseInt((pedometerData.numberOfSteps + this.totalSteps) / 1000, 10),
            });
          },
        );
      }
      if (error) {
        Alert.alert(`Error: ${error}`);
      }
    });
  }

  getStepsBetweenDates = (initialDate, finalDate) => (
    new Promise((resolve, reject) =>
      Pedometer.queryPedometerDataBetweenDates(
        initialDate.getTime(),
        finalDate.getTime(),
        (error, totalSteps) => {
          if (error) {
            return reject();
          }
          this.setState({ totalSteps });
          return resolve();
        },
      ))
  );

  getMilesFromMeter = () => parseFloat(this.state.stepCount.distance * 0.000621371192).toFixed(2);

  getActiveTime = () => {
    let hour = 0;
    let minutes = 0;
    if (this.startDate) {
      const now = new Date();
      const time = Math.abs(now.getTime() - new Date(this.startDate).getTime());
      hour = parseInt(time / (1000 * 3600), 10);
      minutes = parseInt(((time / (1000 * 3600)) - hour) * 60, 10);
    }
    return `${hour}h ${minutes}m`;
  }

  setActiveDate = async (date) => {
    try {
      await helper.setItem('activeDate', date);
    } catch (error) {
      Alert.alert(`Error Occured ${error}`);
    }
  }

  getTotalSteps = async () => {
    try {
      const data = await helper.getItem('totalSteps');
      this.totalSteps = JSON.parse(data);
      this.setState({ totalSteps: this.totalSteps });
    } catch (error) {
      Alert.alert(`Error Occured ${error}`);
    }
  }

  saveStepCounting = async () => {
    const initialDate = new Date();
    initialDate.setDate((new Date().getDate() - 1));
    initialDate.setHours(0, 0, 0, 0);
    const finalDate = new Date(initialDate);
    finalDate.setHours(23, 59, 59, 59);
    try {
      const data = await helper.getItem('totalSteps');
      this.totalSteps = JSON.parse(data);
    } catch (error) {
      Alert.alert(`Error Occured ${error}`);
    }
    if (this.totalSteps) {
      try {
        await this.getStepsBetweenDates(initialDate, finalDate);
      } catch (error) {
        Alert.alert(`Error Occured ${error}`);
      }
    } else {
      try {
        await this.getStepsBetweenDates(new Date(this.startDate), finalDate);
      } catch (error) {
        Alert.alert(`Error Occured ${error}`);
      }
    }
    try {
      const steps = this.totalSteps + this.state.totalSteps.numberOfSteps;
      await helper.setItem('totalSteps', JSON.stringify(steps));
    } catch (error) {
      Alert.alert(`Error Occured ${error}`);
    }
    // const startDate = new Date();
    // startDate.setHours(0, 0, 0, 0);
    // const endDate = new Date();
    // Pedometer.queryPedometerDataBetweenDates(
    //   startDate.getTime(),
    //   endDate.getTime(),
    //   (error, todayStepCount) => this.setState({ todayStepCount }),
    // );
    // console.log(new Date(endDate.setHours(23, 59, 59, 59)));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <View style={styles.walletContainer}>
            <View style={styles.walletSubContainer}>
              <Image source={require('./assets/wallet.png')} style={styles.walletImage} />
              <View style={{ marginLeft: 5 }}>
                <Text style={{ fontSize: 10 }}>Earned</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: color.dodgerBlue, fontWeight: 'bold', fontSize: 15 }}>{this.state.money}</Text>
                  <Image source={require('./assets/cent.png')} style={styles.centImage} />
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.header, styles.centerItems]}>
            <Text style={styles.headerDate}>
              {weekDays[this.now.getDay()]} {this.now.getDate()} {month[this.now.getMonth()]}
            </Text>
            <Text style={styles.headerName}>Hey Dean Ambrose</Text>
          </View>
        </View>
        <View style={{ flex: 6 }}>
          <View style={[{ flex: 7 }, styles.centerItems]}>
            <ProgressCircle
              containerStyle={styles.centerItems}
              percent={this.getPercentage()}
              radius={110}
              borderWidth={4}
              bgColor={color.white}
              color={color.dodgerBlue}
            >
              <ImageBackground source={require('./assets/shadow.png')} style={[{ height: 200, width: 200 }, styles.centerItems]} >
                <Text style={[styles.totalStepsFont]}>
                  Total Steps
                </Text>
                <Text style={{ fontSize: 40, fontWeight: '800', color: color.mineShaft }}>{this.state.todayStepCount.numberOfSteps}</Text>
                <Image source={require('./assets/Shoe.png')} style={styles.shoeImage} />
              </ImageBackground>
            </ProgressCircle>
          </View>
          <View style={styles.weekDayContainer}>
            <Text style={{ alignSelf: 'center', fontSize: 20 }}>Track Your Activity</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {
                weekDays.map((data, i) => (
                  <View key={`Week${i + 1}`} style={[styles.weekDaySubContainer, this.now.getDay() === i ? styles.activeWeekDay : styles.inactiveWeekDay]}>
                    <Text style={[{ fontSize: 18, fontWeight: 'bold' }, this.now.getDay() === i ? { color: color.white } : { color: color.silver }]}>{data.charAt(0)}</Text>
                  </View>
                ))
              }
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.totalStepsContainer}>
            <Image source={require('./assets/totalSteps.png')} style={styles.totalStepsImage} />
            <View style={{ marginLeft: 10 }}>
              <Text>Total Steps</Text>
              <Text style={{ color: color.dodgerBlue }}>
                {this.totalSteps + this.state.todayStepCount.numberOfSteps}
              </Text>
            </View>
          </View>
          <View style={styles.activeTimeContainer}>
            <Image source={require('./assets/watch.png')} style={styles.timeImage} />
            <View style={{ marginLeft: 10 }}>
              <Text>Active Time</Text>
              <Text style={{ color: color.dodgerBlue }}>{this.getActiveTime()}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

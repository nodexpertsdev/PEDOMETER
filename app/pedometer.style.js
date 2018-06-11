import { StyleSheet } from 'react-native';
import { color } from './util/config';

const styles = {
  centerItems: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
    margin: 20,
  },
  walletContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    margin: 15,
  },
  walletSubContainer: {
    height: 25,
    width: 60,
    flexDirection: 'row',
  },
  walletImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  centImage: {
    height: 8,
    width: 8,
    resizeMode: 'contain',
  },
  header: {
    flex: 2,
  },
  headerDate: {
    color: color.dodgerBlue,
    fontSize: 15,
    fontWeight: 'bold',
  },
  headerName: {
    fontWeight: '700',
    fontSize: 25,
  },
  totalStepsFont: {
    fontSize: 15,
    fontWeight: 'bold',
    color: color.silver,
    marginTop: 15,
  },
  shoeImage: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  weekDayContainer: {
    flex: 3,
    justifyContent: 'space-around',
  },
  weekDaySubContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeWeekDay: {
    borderColor: color.dodgerBlue,
    backgroundColor: color.dodgerBlue,
  },
  inactiveWeekDay: {
    borderColor: color.lightGrey,
  },
  bottomContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalStepsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  timeImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  activeTimeContainer: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  totalStepsImage: {
    height: 70,
    width: 35,
    resizeMode: 'contain',
  },
};

export {
  color,
  styles,
};

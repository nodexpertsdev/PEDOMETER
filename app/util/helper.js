import { AsyncStorage } from 'react-native';

const helper = {
  /**
   * @description get the value of the key from localStorage
   * @param {*} key key whose value to be fetched
   */
  getItem: (key) => {
    let data = null;
    try {
      data = AsyncStorage.getItem(`Pedometer:${key}`);
    } catch (error) {
      // Countly.log('Error while getting', key);
      return null;
    }
    return data;
  },

  /**
   * @description store the value with key in local Storage
   * @param {*} key key for the data to be store
   * @param {*} value value of the data
   */
  setItem: (key, value) => {
    try {
      AsyncStorage.setItem(`Pedometer:${key}`, value);
    } catch (error) {
      return error;
    }
    return 'Saved';
  },
};

export default helper;

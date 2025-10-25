import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAsyncStorage() {
  const getItem = async key => {
    try {
      const raw = await AsyncStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('AsyncStorage getItem failed', e);
      return null;
    }
  };

  const setItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('AsyncStorage setItem failed', e);
      return false;
    }
  };

  return { getItem, setItem };
}

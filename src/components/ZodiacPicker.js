import React from 'react';
import { View, Picker, StyleSheet, Platform } from 'react-native';

const SIGNS = [
  'aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'
];

const ZodiacPicker = ({ value, onValueChange }) => {
  if (Platform.OS === 'ios') {
    // basic fallback
  }

  return (
    <View style={styles.wrapper}>
      <Picker
        selectedValue={value}
        onValueChange={val => onValueChange(val)}
        style={styles.picker}
      >
        {SIGNS.map(s => (
          <Picker.Item key={s} label={s.charAt(0).toUpperCase() + s.slice(1)} value={s} />
        ))}
      </Picker>
    </View>
  );
};

export default ZodiacPicker;

const styles = StyleSheet.create({
  wrapper: { backgroundColor: 'transparent' },
  picker: { color: '#fff' },
});

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SIGNS = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
];

const ZodiacPicker = ({ value, onValueChange }) => {
  // ensure there's always a selected value to avoid uncontrolled state
  const selected = value ?? 'aries';
  const [visible, setVisible] = useState(false);
  const [temp, setTemp] = useState(selected);

  // label for display
  const label = selected.charAt(0).toUpperCase() + selected.slice(1);

  // Android: use native dropdown mode inline
  if (Platform.OS === 'android') {
    return (
      <View style={styles.wrapper}>
        <View style={styles.containerAndroid}>
          <Picker
            selectedValue={selected}
            onValueChange={val => onValueChange && onValueChange(val)}
            style={styles.picker}
            mode="dropdown"
            accessibilityLabel="Zodiac sign picker"
            testID="zodiac-picker"
          >
            {SIGNS.map(s => (
              <Picker.Item
                key={s}
                label={s.charAt(0).toUpperCase() + s.slice(1)}
                value={s}
              />
            ))}
          </Picker>
        </View>
      </View>
    );
  }

  // iOS: show a pill that opens a modal with the wheel picker
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.pill}
        onPress={() => {
          setTemp(selected);
          setVisible(true);
        }}
        accessibilityLabel="Open zodiac picker"
      >
        <Text style={styles.pillText}>{label}</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Pressable
                onPress={() => setVisible(false)}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setVisible(false);
                  onValueChange && onValueChange(temp);
                }}
                style={styles.modalButton}
              >
                <Text style={[styles.modalButtonText, { fontWeight: '700' }]}>
                  Done
                </Text>
              </Pressable>
            </View>

            <Picker
              selectedValue={temp}
              onValueChange={v => setTemp(v)}
              style={styles.pickerIOS}
              itemStyle={{ fontSize: 18 }}
              accessibilityLabel="Zodiac wheel picker"
            >
              {SIGNS.map(s => (
                <Picker.Item
                  key={s}
                  label={s.charAt(0).toUpperCase() + s.slice(1)}
                  value={s}
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ZodiacPicker;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  containerAndroid: {
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    overflow: 'hidden',
  },
  pill: {
    backgroundColor: '#f6f6f6',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignSelf: 'flex-start',
    width: '100%',
  },
  pillText: {
    color: '#111',
    fontSize: 16,
    textAlign: 'center',
  },
  picker: { color: '#111', height: 44 },
  pickerIOS: { backgroundColor: '#fff' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  modalButton: { paddingHorizontal: 12, paddingVertical: 6 },
  modalButtonText: { color: '#007aff', fontSize: 16 },
});

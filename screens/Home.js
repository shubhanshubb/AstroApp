import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import ZodiacPicker from '../src/components/ZodiacPicker';
import { JournalContext } from '../src/context/JournalContext';
import { fetchHoroscope } from '../src/services/horoscope';

const Home = ({ navigation }) => {
  const { selectedSign, setSelectedSign } = useContext(JournalContext);
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadHoroscope = async sign => {
    try {
      setLoading(true);
      const data = await fetchHoroscope(sign || selectedSign);
      setHoroscope(data || { description: 'No horoscope available.' });
    } catch (e) {
      console.warn('Horoscope fetch failed', e);
      setHoroscope({ description: 'Failed to fetch horoscope.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHoroscope(selectedSign || 'aries');
  }, [selectedSign]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{new Date().toDateString()}</Text>
        <ZodiacPicker
          value={selectedSign}
          onValueChange={val => setSelectedSign(val)}
        />
      </View>

      <View style={styles.horoscopeCard}>
        {loading ? (
          <ActivityIndicator size="large" color="#00D4AA" />
        ) : (
          <Text style={styles.horoscopeText}>{horoscope?.description}</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Journal')}
      >
        <Text style={styles.buttonText}>Write Journal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#000' },
  header: { marginTop: 20, marginBottom: 24 },
  date: { color: '#fff', fontSize: 18, marginBottom: 12 },
  horoscopeCard: {
    backgroundColor: '#0b0b0b',
    borderRadius: 12,
    padding: 16,
    minHeight: 160,
    borderWidth: 1,
    borderColor: 'rgba(0,212,170,0.12)',
  },
  horoscopeText: { color: '#ddd', fontSize: 16, lineHeight: 22 },
  button: {
    marginTop: 24,
    backgroundColor: '#00D4AA',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#00221a', fontWeight: '700' },
});

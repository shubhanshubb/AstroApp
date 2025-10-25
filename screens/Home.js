import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
    >
      <View style={styles.topHeader}>
        <Text style={styles.appTitle}>Astro Journal</Text>
        <Text style={styles.date}>{new Date().toDateString()}</Text>
      </View>

      <View style={styles.pickerWrap}>
        <ZodiacPicker
          value={selectedSign}
          onValueChange={val => setSelectedSign(val)}
        />
      </View>

      <View style={styles.horoscopeCard}>
        {loading ? (
          <ActivityIndicator size="large" color="#2655A3" />
        ) : (
          <>
            {horoscope?.cached ? (
              <Text style={styles.cachedNotice}>
                Showing cached horoscope (service unavailable)
              </Text>
            ) : null}

            {/* month/title */}
            {horoscope?.month ? (
              <Text style={styles.monthText}>{horoscope.month}</Text>
            ) : null}

            {/* main description */}
            <Text style={styles.horoscopeText}>{horoscope?.description}</Text>

            {/* standout / challenging as chips */}
            <View style={styles.chipsRow}>
              {horoscope?.standout_days ? (
                <View style={[styles.chip, { backgroundColor: '#003f2f' }]}>
                  <Text style={styles.chipText}>
                    Standout: {horoscope.standout_days}
                  </Text>
                </View>
              ) : null}
              {horoscope?.challenging_days ? (
                <View style={[styles.chip, { backgroundColor: '#3f0006' }]}>
                  <Text style={styles.chipText}>
                    Challenging: {horoscope.challenging_days}
                  </Text>
                </View>
              ) : null}
            </View>
          </>
        )}
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Journal')}
        >
          <Text style={styles.primaryText}>Write Journal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topHeader: { alignItems: 'center', marginBottom: 8 },
  appTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00221a',
    marginBottom: 6,
  },
  header: { marginTop: 20, marginBottom: 24 },
  date: { color: '#111', fontSize: 14, marginBottom: 12 },
  horoscopeCard: {
    backgroundColor: '#0b0b0b',
    borderRadius: 12,
    padding: 16,
    minHeight: 160,
    borderWidth: 1,
    borderColor: 'rgba(0,212,170,0.12)',
  },
  horoscopeText: {
    color: '#ddd',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 6,
  },
  cachedNotice: { color: '#ffd166', marginBottom: 8 },
  monthText: { color: '#9fd9c7', fontSize: 13, fontWeight: '600' },
  chipsRow: { flexDirection: 'row', marginTop: 10, gap: 8 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: { color: '#fff', fontSize: 12 },
  debugPreview: { color: '#9fd9c7', marginTop: 10, fontSize: 12 },
  button: {
    marginTop: 24,
    backgroundColor: '#2655A3',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#00221a',
    fontWeight: '700',
  },
  retryButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2655A3',
  },
  retryText: { color: '#2655A3', fontWeight: '700' },
  pickerWrap: { alignItems: 'center', marginVertical: 8 },
  actionsRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2655A3',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
  },
});

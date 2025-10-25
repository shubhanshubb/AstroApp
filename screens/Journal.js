import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { JournalContext } from '../src/context/JournalContext';

const Journal = () => {
  const { saveEntry, getEntry, selectedSign } = useContext(JournalContext);
  const dateKey = new Date().toISOString().slice(0, 10);
  const [text, setText] = useState('');

  useEffect(() => {
    const e = getEntry(dateKey);
    if (e) setText(e.text);
  }, []);

  const handleSave = async () => {
    await saveEntry(dateKey, selectedSign, text);
    alert('Saved');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.date}>{new Date().toDateString()}</Text>
      <Text style={styles.sign}>Sign: {selectedSign}</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        multiline
        placeholder="Write your journal..."
        style={styles.input}
      />
      <View style={styles.actions}>
        <Button title="Save" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

export default Journal;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  date: { color: '#fff', fontSize: 18, marginBottom: 6 },
  sign: { color: '#aaa', marginBottom: 12 },
  input: { minHeight: 240, color: '#fff', backgroundColor: '#0b0b0b', padding: 12, borderRadius: 8 },
  actions: { marginTop: 16 },
});

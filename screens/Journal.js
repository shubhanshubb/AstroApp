import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { JournalContext } from '../src/context/JournalContext';

const Journal = ({ route }) => {
  const { saveEntry, getEntry, getEntries, deleteEntry, selectedSign } = useContext(JournalContext);
  const paramDate = route?.params?.dateKey || null;
  const paramEntryId = route?.params?.entryId || null;
  const dateKey = paramDate || new Date().toISOString().slice(0, 10);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(paramEntryId);

  useEffect(() => {
    // if an entryId is provided (came from SavedJournal), load that entry for editing
    if (paramEntryId) {
      const e = getEntry(dateKey, paramEntryId);
      if (e) {
        setText(e.text);
        setEditingId(e.id);
      }
    } else {
      // Normal journal tab - always start fresh
      setText('');
      setEditingId(null);
    }
  }, [dateKey, paramEntryId]);

  const handleSave = async () => {
    if (!text || text.trim().length === 0) {
      Alert.alert('Empty', 'Please write something before saving.');
      return;
    }
    // Only pass editingId if we came from SavedJournal, otherwise always create new
    const saved = await saveEntry(dateKey, selectedSign, text, paramEntryId ? editingId : null);
    setText(''); // Clear after saving
    Alert.alert('Saved');
  };

  const handleNew = () => {
    setText('');
    setEditingId(null);
  };

  const handleDelete = async id => {
    Alert.alert('Delete entry', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => { await deleteEntry(dateKey, id); setText(''); setEditingId(null); } },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16 }}
    >
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
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => handleSave()}
        >
          <Text style={styles.primaryText}>{paramEntryId ? 'Update' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Journal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  date: {
    color: '#2655A3',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  sign: {
    color: '#111',
    marginBottom: 12,
  },
  input: {
    minHeight: 240,
    color: '#111',
    fontWeight: '500',
    // backgroundColor: '#0b0b0b',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#111',
    padding: 6,
    borderRadius: 4,
  },
  actions: {
    marginTop: 16,
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

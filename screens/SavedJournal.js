import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { PencilSimple, Trash } from 'phosphor-react-native';
import { JournalContext } from '../src/context/JournalContext';

const SavedJournal = ({ navigation }) => {
  const { entries, getEntries, deleteEntry } = useContext(JournalContext);

  // flatten all entries across dates into a list
  const data = Object.keys(entries || {})
    .flatMap(dateKey => {
      const list = getEntries(dateKey) || [];
      return list.map(entry => ({ dateKey, ...entry }));
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const handleLongPress = (item) => {
    Alert.alert(
      'Choose Action',
      `What would you like to do with this entry?`,
      [
        {
          text: 'Edit',
          onPress: () => {
            navigation.navigate('Journal', {
              dateKey: item.dateKey,
              entryId: item.id,
            });
          },
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Delete Entry',
              'Are you sure you want to delete this entry?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: async () => {
                    await deleteEntry(item.dateKey, item.id);
                  },
                },
              ],
            );
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onLongPress={() => handleLongPress(item)}
        delayLongPress={500}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.date}>
            {item.dateKey} • {new Date(item.createdAt).toLocaleTimeString()}
          </Text>
          <Text style={styles.sign}>Sign: {item.sign}</Text>
          <Text style={styles.excerpt}>
            {(item.text || '').slice(0, 140)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No saved entries yet.</Text>
        }
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
};

export default SavedJournal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f6f6f6',
    marginBottom: 10,
    alignItems: 'center',
  },
  date: { fontWeight: '700', marginBottom: 4 },
  sign: { color: '#333', marginBottom: 6 },
  excerpt: { color: '#555' },
  empty: { padding: 24, textAlign: 'center', color: '#666' },
});

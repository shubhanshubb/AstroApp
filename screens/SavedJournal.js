import React, { useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Animated } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { PencilSimple, Trash, BookOpen } from 'phosphor-react-native';
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

  const renderRightActions = (progress, dragX, onDelete) => {
    const scale = dragX.interpolate({
      inputRange: [-120, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.rightAction} onPress={onDelete}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Trash size={20} color="#fff" weight="bold" />
        </Animated.View>
      </RectButton>
    );
  };

  const renderLeftActions = (progress, dragX, onEdit) => {
    const scale = dragX.interpolate({
      inputRange: [0, 120],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.leftAction} onPress={onEdit}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <PencilSimple size={20} color="#fff" weight="bold" />
        </Animated.View>
      </RectButton>
    );
  };

  const renderItem = ({ item }) => {
    let swipeRef = null;
    const onEdit = () => {
      swipeRef && swipeRef.close();
      navigation.navigate('Journal', { dateKey: item.dateKey, entryId: item.id });
    };
    const onDelete = () => {
      swipeRef && swipeRef.close();
      Alert.alert('Delete entry', 'Are you sure you want to delete this entry?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteEntry(item.dateKey, item.id);
          },
        },
      ]);
    };

    return (
      <Swipeable
        ref={ref => (swipeRef = ref)}
        renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, onEdit)}
        renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, onDelete)}
      >
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.iconWrap}>
              <BookOpen size={20} color="#00D4AA" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.date}>{item.dateKey} • {new Date(item.createdAt).toLocaleTimeString()}</Text>
              <Text style={styles.sign}>Sign: {item.sign}</Text>
              <Text style={styles.excerpt}>{(item.text || '').slice(0, 140)}</Text>
            </View>
          </View>
          <RectButton
            style={styles.open}
            onPress={() => navigation.navigate('Journal', { dateKey: item.dateKey, entryId: item.id })}
          >
            <PencilSimple size={16} color="#00221a" />
          </RectButton>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={i => i.id}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.empty}>No saved entries yet.</Text>}
            contentContainerStyle={{ padding: 12 }}
          />
    </View>
  );
};

export default SavedJournal;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
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
  open: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#00D4AA', borderRadius: 8 },
  openText: { color: '#00221a', fontWeight: '700' },
  empty: { padding: 24, textAlign: 'center', color: '#666' },
});

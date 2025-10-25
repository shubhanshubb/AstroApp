import React, { createContext, useState, useEffect } from 'react';
import useAsyncStorage from '../hooks/useAsyncStorage';

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const { getItem, setItem } = useAsyncStorage();
  const [entries, setEntries] = useState({});
  const [selectedSign, setSelectedSign] = useState('aries');

  useEffect(() => {
    (async () => {
      const saved = await getItem('@journal_entries');
      if (saved) setEntries(saved);
    })();
  }, []);

  // Entries shape: { [dateKey]: [ { id, sign, text, createdAt, updatedAt, createdAtEpoch, updatedAtEpoch } ] }
  const saveEntry = async (dateKey, sign, text, id = null) => {
    const now = new Date().toISOString();
    const epoch = Date.now();
    const makeId = () => `${epoch}-${Math.random().toString(36).slice(2, 9)}`;

    const list = Array.isArray(entries[dateKey]) ? [...entries[dateKey]] : [];
    if (id) {
      // update existing
      const idx = list.findIndex(i => i.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], sign, text, updatedAt: now, updatedAtEpoch: epoch };
      } else {
        list.unshift({ id, sign, text, createdAt: now, updatedAt: now, createdAtEpoch: epoch, updatedAtEpoch: epoch });
      }
    } else {
      // create new
      const newEntry = { id: makeId(), sign, text, createdAt: now, updatedAt: now, createdAtEpoch: epoch, updatedAtEpoch: epoch };
      list.unshift(newEntry);
    }

    const next = { ...entries, [dateKey]: list };
    setEntries(next);
    await setItem('@journal_entries', next);
    return list[0];
  };

  const getEntries = dateKey => Array.isArray(entries[dateKey]) ? entries[dateKey] : [];

  const getEntry = (dateKey, id) => {
    const list = getEntries(dateKey);
    if (!id) return list[0] || null;
    return list.find(i => i.id === id) || null;
  };

  const deleteEntry = async (dateKey, id) => {
    const list = getEntries(dateKey).filter(i => i.id !== id);
    const next = { ...entries, [dateKey]: list };
    setEntries(next);
    await setItem('@journal_entries', next);
    return true;
  };

  return (
    <JournalContext.Provider
      value={{ entries, saveEntry, getEntries, getEntry, deleteEntry, selectedSign, setSelectedSign }}
    >
      {children}
    </JournalContext.Provider>
  );
};

export default JournalContext;

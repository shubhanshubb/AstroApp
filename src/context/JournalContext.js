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

  const saveEntry = async (dateKey, sign, text) => {
    const payload = { sign, text, updatedAt: new Date().toISOString() };
    const next = { ...entries, [dateKey]: payload };
    setEntries(next);
    await setItem('@journal_entries', next);
    return payload;
  };

  const getEntry = dateKey => entries[dateKey] || null;

  return (
    <JournalContext.Provider
      value={{ entries, saveEntry, getEntry, selectedSign, setSelectedSign }}
    >
      {children}
    </JournalContext.Provider>
  );
};

export default JournalContext;

import { MMKV } from 'react-native-mmkv';

// Initialize MMKV storage instance
export const storage = new MMKV({
  id: 'location-tracker-storage',
  encryptionKey: 'location-tracker-secret-key', // Optional: for encrypted storage
});

// MMKV Storage adapter for Zustand
export const mmkvStorage = {
  getItem: (name) => {
    const value = storage.getString(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name, value) => {
    storage.set(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    storage.delete(name);
  },
};


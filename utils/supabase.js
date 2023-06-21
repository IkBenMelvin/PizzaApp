import 'react-native-url-polyfill/auto'
import * as SecureStore from 'expo-secure-store'
import { createClient } from "@supabase/supabase-js";

const ExpoSecureStoreAdapter = {
  getItem: (key) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key, value) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key) => {
    SecureStore.deleteItemAsync(key)
  },
}

export default supabase = createClient(
  "https://xbxjnbuwdqtdstrkqcpa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhieGpuYnV3ZHF0ZHN0cmtxY3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUwOTIyNjksImV4cCI6MjAwMDY2ODI2OX0.p005pNyXQzshBa48fQzHyXonQkUe5JEq6gUOG-FlHd8",
  {auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }}
);
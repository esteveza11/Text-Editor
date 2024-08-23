import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add content to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, content }); // Use id: 1 to overwrite existing content
  const result = await request;
  console.log('Data saved to the database', result);
};

// Method to get all content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll(); // Use store.getAll() to get all entries
  const result = await request;
  console.log('Data retrieved from the database', result);
  return result?.content;
};

initdb();

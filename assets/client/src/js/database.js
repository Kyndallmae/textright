import { openDB } from 'idb';

const initdb = async () =>
  openDB('textEditor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('textEditor')) {
        console.log('textEditor database already exists');
        return;
      }
      db.createObjectStore('textEditor', { keyPath: 'id', autoIncrement: true });
      console.log('textEditor database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { 
  console.log('update dateabase');

 // Create a connection to the database database and version we want to use.
 const textEditorDb = await openDB('textEditor', 1);

// Create a new transaction and specify the database and data privileges.
const tx = textEditorDb.transaction('textEditor', 'readwrite');

 // Open up the desired object store.
 const store = tx.objectStore('textEditor');

// Use the .add() method on the store and pass in the content.
const request = store.add({ id: 1, value: content });

const result = await request;
console.log('Data saved to the database', result);
return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get from the database');
// Create a connection to the database database and version we want to use.
const textEditorDb = await openDB('textEditor', 1);

// Create a new transaction and specify the database and data privileges.
const tx = textEditorDb.transaction('textEditor', 'readonly');

// Open up the desired object store.
const store = tx.objectStore('textEditor');

// Use the .get() method to get a piece of data from the database based on the id.
const request = store.get(1);

// Get confirmation of the request.
const result = await request;
console.log('result.value', result);
return result?.value;

};
// Start database
initdb();
import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  console.log("Post to db");

  // open connection to jate DB
  const jateDB = await openDB("jate", 1);

  // create transaction with database
  const tx = jateDB.transaction("jate", "readwrite");

  // open object store we want to add to
  const store = tx.objectStore("jate");

  const req = store.put({ content });

  // await confirmation for the request
  const res = await req;
  console.log('Data successfully saved to DB!');
  // return res;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from DB');

  // open connection to db
  const jateDB = await openDB('jate', 1);

  // create transaction. only need to read for this request
  const tx = await jateDB.transaction('jate', 'readonly');

  // open object store
  const store = tx.objectStore('jate');

  // getAll() data in db
  const req = store.getAll();

  const res = await req;
  return res;
};

initdb();

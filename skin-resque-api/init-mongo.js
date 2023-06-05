import { MongoClient } from 'mongodb';
import fs from 'fs';

const uri = 'mongodb://localhost:27017';
const dbName = 'skin-resque';
const data = JSON.parse(fs.readFileSync('../scrapper/cosmetics.json', 'utf-8'));
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function insertDataToCollection() {
  try {
    await client.connect();
    const db = client.db(dbName);
    await db.createCollection('Cosmetics', { capped: false });
    await db.collection('Cosmetics').insertMany(data);
  } catch (err) {
    console.error(err);
  }
}

insertDataToCollection();

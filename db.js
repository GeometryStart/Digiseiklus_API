const admin = require('firebase-admin');

const { serviceAccount, databaseUrl } = require('./config');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseUrl
});

const db = admin.firestore();

module.exports = db;
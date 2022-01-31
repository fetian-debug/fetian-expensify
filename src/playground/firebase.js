import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "firebase-api-key",
  authDomain: "example-db.firebaseapp.com",
  databaseURL: "https://example-db.firebaseio.com",
  projectId: "example-project-id",
  storageBucket: "expensify-88855.appspot.com",
  messagingSenderId: "example-messaging-id",
  appId: "example-app-id",
  measurementId: "example-measurement-id"
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

const database = firebase.database()

//child_added : Runs for existing ones and added ones
database.ref('expenses')
  .on('child_added', (snapshot) => {
    console.log(snapshot.key, snapshot.val())
  })

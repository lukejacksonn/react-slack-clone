// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const crypto = require('crypto');

class Fire {
  constructor() {
    this.init();
  }

  init = () => {
    try {
      firebase.initializeApp({
        apiKey: "AIzaSyAgFBIvwiDkOTf3ndJr-q3-mvrbEBlLJ6Q",
        authDomain: "ecs153project-52c11.firebaseapp.com",
        databaseURL: "https://ecs153project-52c11.firebaseio.com",
        projectId: "ecs153project-52c11",
        storageBucket: "ecs153project-52c11.appspot.com",
        messagingSenderId: "153276828224",
      });
    } catch ({ message }) {
      alert(message);
    }
  }

  signIn = (user, pass) =>
    firebase.auth().signInWithEmailAndPassword(user, pass).catch(function (error) {
      // Handle Errors here.
      alert(error.code);
      alert(error.message);
    });

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = (user, pass) => {
    if (!user) {
      try {
        firebase.auth().createUserWithEmailAndPassword(user, pass).catch(function (error) {
/*           // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ... */
        });
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages');
    // loop through and decrypt here
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };

      // prob encrypt here
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  encrypt = message => {
    const algorithm = 'aes-192-cbc';
    const password = message;
    // Key length is dependent on the algorithm. In this case for aes192, it is
    // 24 bytes (192 bits).
    // Use async `crypto.scrypt()` instead.
    const key = crypto.scryptSync(password, 'salt', 24);
    // Use `crypto.randomBytes()` to generate a random iv instead of the static iv
    // shown here.
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = '';
    cipher.on('readable', () => {
      let chunk;
      while (null !== (chunk = cipher.read())) {
        encrypted += chunk.toString('hex');
      }
    });
    return encrypted;
  };

  decrypt = message => {
    const algorithm = 'aes-192-cbc';
    const password = message;
    // Key length is dependent on the algorithm. In this case for aes192, it is
    // 24 bytes (192 bits).
    // Use the async `crypto.scrypt()` instead.
    const key = crypto.scryptSync(password, 'salt', 24);
    // The IV is usually passed along with the ciphertext.
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = '';
    let chunk;
    decipher.on('readable', () => {
      while (null !== (chunk = decipher.read())) {
        decrypted += chunk.toString('utf8');
      }
    });
    return decrypted;
  };


  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;

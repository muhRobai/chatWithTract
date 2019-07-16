import firebase from 'firebase'; // 4.8.1

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCs3BoUPxqCPYSD8dbVIj99uqjhxdsVKbA",
        authDomain: "gochat-cb0c5.firebaseapp.com",
        databaseURL: "https://gochat-cb0c5.firebaseio.com",
        projectId: "gochat-cb0c5",
        storageBucket: "",
        messagingSenderId: "680567289667",
        appId: "1:680567289667:web:1e31e4d7ad0f94e3"
      });
    }
  };

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
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
      this.append(message);
    }
  };

  login = async(users, success_callback, failed_callback) => {
    await firebase.auth()
      .signInWithEmailAndPassword(users.email, users.password)
    .then(success_callback, failed_callback);
  }

  append = message => this.ref.push(message);

  //add account gmail

  createAccount = async (users) => {
    firebase.auth()
      .createUserWithEmailAndPassword(users.email, users.password)
    .then(function() {
      var userf = firebase.auth().currentUser;
      userf.updateProfile({ displayName: users.username})
      .then(function() {
        alert("User " + users.username + " was created successfully.");
      }, function(error) {
        console.warn("Error update displayName.");
      });
    }, function(error) {
      console.error("got error:" + error.message);
      alert("Create account failed.");
    });
  }

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;

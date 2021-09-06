import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { useState } from 'react';
firebase.initializeApp(firebaseConfig);

function App() {

  const provider = new firebase.auth.GoogleAuthProvider();

  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    picture: ''

  });

  const handleSignIn = () => {
    firebase.auth()
    .signInWithPopup(provider)
    .then((data) => {

      const {displayName, email, photoURL} = data.user;
      console.log(displayName, email, photoURL);
      const signInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        picture: photoURL
      }
      setUser(signInUser);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }

  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      const signOutUser = {
        isSignIn: false,
        name: '',
        email: '',
        picture: ''
      }
      setUser(signOutUser);
    })

    .catch((error) => {
      // An error happened.
    });
  }

  
  return (
    <div className="App">
      
      {
        user.isSignIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In</button>
      }
      
      {
          user.isSignIn && <div>
          <h3>Welcome: {user.name}</h3>
          <p>Email: {user.email}</p>
          <img src={user.picture} alt="" />
        </div>
        }
    </div>
  );
}

export default App;

import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [user,setUser] = useState({});
  const[loggedInUser,setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // var credential = result.credential;
        // var token = credential.accessToken;
        const {displayName,email,photoURL} = result.user;
        const signInUser = {
            name:displayName,
            email:email,
            image: photoURL
        }
        setUser(signInUser);
        setLoggedInUser(signInUser);
        history.replace(from);
        console.log(signInUser);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        var email = error.email;
        var credential = error.credential;
        // ...
      });
  };

  return (
    <div className="container">
      <button className="btn btn-info text-center" onClick={handleGoogleSignIn}>Google sign in</button>
    </div>
  );
};

export default Login;

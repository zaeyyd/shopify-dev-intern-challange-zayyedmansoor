// NOTES

// - new Date().toISOString()

//Firebase
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const firebase = require("firebase");


firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  })

//UTIL
const bodyParser = require("body-parser");
const cors = require("cors");

//Express
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(cors());





//AUTH MIDDLEWARE

const authMid = (req, res, next) => {
  // make sure a token is recieved
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("no token");
    return res.status(403).json({ error: "unauthorized" });
  }

  // authorize token
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;

     
    })

    .catch((err) => {
      console.error("Error while varifying token", err);
      return res.status(403).json(err);
    });
};


// ----- UNAUTHED -----

//  SIGN UP
app.post("/signup", (req, res) => {
  // vars
  let password = req.body.password;
  let email = req.body.email;
  let admin = req.body.admin;
  let userID;
  let JWT;

  // - check if passwords match
  if (req.password != req.passwordConfirm) {
    console.log(req.password);
    return res.status(422).send("passwords don't match");
  }

  // - check if email exists
  // - sign up and return token
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      console.log(`SIGNED UP ${data.user.uid}`);
      userID = data.user.uid;

      return data.user.getIdToken();
    })
    .then((token) => {
      JWT = token;
      // return res.status(201).send(token);
      console.log(userID);

      const newUser = new UsersModel({
        email: email,
        name: req.body.name,
        userID: userID,
        admin: admin
      });

      // save user to db and return token
      newUser
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({JWT});
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).send(err);
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send(err);
    });
});

//  SIGN IN
app.post("/signin", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);

      return res.status(403).send(err);
    });
});


exports.api = functions.https.onRequest(app);

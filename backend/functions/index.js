// NOTES

// - new Date().toISOString()

//Firebase
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
var firebaseConfig = {
  apiKey: "AIzaSyC3jhNrtekRiyOc0ctbaGCW4c3J8--tqB8",
  authDomain: "se3316-zmansoo2-lab5.firebaseapp.com",
  projectId: "se3316-zmansoo2-lab5",
  storageBucket: "se3316-zmansoo2-lab5.appspot.com",
  messagingSenderId: "203249425129",
  appId: "1:203249425129:web:25bf5c4853efefcce42e78",
  measurementId: "G-EMXK75LHQV",
};
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

//UTIL
const bodyParser = require("body-parser");
const cors = require("cors");

//Express
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(cors());

//MongoDB Stuff
const mongoose = require("mongoose");
const connection = require("./connection");
const Classes = require("./models/Classes");
const ClassesModel = mongoose.model("classes");
const Schedules = require("./models/Schedules");
const SchedulesModel = mongoose.model("schedules");
const Users = require("./models/Users");
const { decode } = require("firebase-functions/lib/providers/https");
const UsersModel = mongoose.model("users");


const stringSimilarity = require('string-similarity');

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

      UsersModel.findOne({ userID: decodedToken.uid }, (err, doc) => {
        if (doc) {
          console.log("here");

          req.user.admin = doc.admin;
          req.user.active = doc.active;

          return next();
        } else {
          return res.status(404).send("no schedule with that name");
        }
      });
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

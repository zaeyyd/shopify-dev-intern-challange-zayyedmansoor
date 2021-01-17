import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../components/Navbar.css";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bar: {
    color: "grey",
    border: "5px solid #00d604",
    borderRadius: "40px",
    padding: 5,
  },

  barButton: {
    borderRadius: "20px",
    margin: 5,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontWeight: "bold",
    backgroundColor: "white",
    color: "black",
    "&:hover": {
      color: "white",
      backgroundColor: "#00d604",
    },
  },

  name: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontWeight: "bold",
    color: "#00d604",
  },

  logo:{ 
    borderRadius: "20px",
    "&:hover": {
        backgroundColor: "#FFFFFF",
      },
  }

}));

export default function Navbar() {
  const classes = useStyles();


  return (
    <div className={classes.bar}>
      <Button
        className={classes.logo}
        to="/"
      >

        <Typography variant="h4" className={classes.name}>
          DREAMBOARDIFY
        </Typography>

      </Button>


      <Button href="/" className={classes.barButton}>Dashboard</Button>
      <Button href="/signin" className={classes.barButton}>Sign In</Button>
      <Button href="/signup" className={classes.barButton}>Sign Up</Button>
      <Button href="/makedreamboard" className={classes.barButton}>Make A Dream Board 😃</Button>
    </div>
  );
}

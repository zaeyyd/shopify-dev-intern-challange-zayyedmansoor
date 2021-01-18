import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../components/Navbar.css";
import { Button, Typography } from "@material-ui/core";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  bar: {
    borderRadius: "20px",
    padding: 15,
    backgroundColor: "rgb(0, 67, 54)",
    width: "80vw",
  },

  barButton: {
    borderRadius: "20px",
    margin: 10,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",

    color: "rgb(250, 246, 234)",
    "&:hover": {
      backgroundColor: "rgb(6, 139, 57)",
    },
  },

  name: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",

    color: "rgb(250, 246, 234)",
    "&:hover": {
      fontWeight: "bold",
    },
  },

  logo: {
    borderRadius: "20px",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const { currentUser } = useAuth();

  return (
    <div className={classes.bar}>
      <Button className={classes.logo} to="/">
        <Typography variant="h4" className={classes.name}>
          DREAMBOARDIFY ✨
        </Typography>
      </Button>

      <div style={{ float: "right" }}>
        {currentUser ? (
          <>
            <Button href="/" className={classes.barButton}>
              Dashboard
            </Button>
            <Button href="/makedreamboard" className={classes.barButton}>
              Make A Dream Board 😃
            </Button>{" "}
          </>
        ) : (
          <>
            {" "}
            <Button href="/signin" className={classes.barButton}>
              Sign In
            </Button>
            <Button href="/signup" className={classes.barButton}>
              Sign Up
            </Button>{" "}
          </>
        )}
      </div>
    </div>
  );
}

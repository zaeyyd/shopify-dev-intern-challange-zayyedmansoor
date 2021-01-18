import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  nameInput: {
    textAlign: "center",
    fontWeight: "bold",
    borderBottom: "1px solid rgba(0, 0, 0, 1)",
  },

  top: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  save: {
    border: '2px rgba(255, 0, 0, 0.5) solid',
    borderRadius: 20
  },
}));

export default function MakeDreamBoard() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.top}>
        <Typography style={{ fontWeight: "bold" }}>
          <TextField
            color={"secondary"}
            inputProps={{ style: { textAlign: "center", fontWeight: "bold" } }}
            id="standard-basic"
          />
          's New Dream Board!
        </Typography>
      
          <Button disabled color="secondary" className={classes.save}>
            AUTO SAVE ENABLED
          </Button>
       
      </div>
      <div className={classes.board}></div>
    </div>
  );
}

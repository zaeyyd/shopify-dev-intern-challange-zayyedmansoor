import React, { useRef, useState } from "react";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 10,
    borderRadius: "20px",
    width: 400
  },
}));

export default function SignIn() {

    const classes = useStyles();

    const email = useRef()
    const password = useRef()



    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
  
    async function handleSubmit(e) {
      e.preventDefault()
      console.log(email)

      console.log(password)
  

      try {
        setError("")
        setLoading(true)
        await login(email.current.value, password.current.value)
        history.push("/")
      } catch {
        setError("Failed to sign in")
      }
  
      setLoading(false)
    }
  

    return (
        <div className={classes.container}>
      <h2>SIGN IN</h2>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField inputRef={email} className={classes.input} placeholder={"EMAIL"} variant="outlined" />

      <TextField type="password" inputRef={password} className={classes.input} placeholder={"PASSWORD"} variant="outlined" />

 
      <Button onClick={handleSubmit} className={classes.input} variant="outlined" disabled={loading}>SUBMIT</Button>

      <Button href="/signin"> <Typography variant="caption">don't have an account?</Typography> </Button>
    </div>
    )
}

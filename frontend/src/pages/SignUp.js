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

export default function SignUp() {

    const classes = useStyles();

    const email = useRef()
    const password = useRef()
    const passwordConfirm = useRef()


    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
  
    async function handleSubmit(e) {
      e.preventDefault()
      console.log(email)
      console.log(passwordConfirm)
      console.log(password)
  
      if (password.current.value !== passwordConfirm.current.value) {
        return setError("Passwords do not match")
      }
  
      try {
        setError("")
        setLoading(true)
        await signup(email.current.value, password.current.value)
        history.push("/")
      } catch {
        setError("Failed to create an account")
      }
  
      setLoading(false)
    }
  

    return (
        <div className={classes.container}>
      <h2>SIGN UP</h2>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField inputRef={email} className={classes.input} placeholder={"EMAIL"} variant="outlined" />

      <TextField type="password" inputRef={password} className={classes.input} placeholder={"PASSWORD"} variant="outlined" />

      <TextField type="password" inputRef={passwordConfirm} className={classes.input} placeholder={"CONFIRM PASSWORD"} variant="outlined" />
 
      <Button onClick={handleSubmit} className={classes.input} variant="outlined" disabled={loading}>SUBMIT</Button>

      <Button href="/signin"> <Typography variant="caption">already have an account?</Typography> </Button>
    </div>
    )
}

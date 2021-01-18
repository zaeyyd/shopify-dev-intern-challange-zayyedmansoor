import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Alert from '@material-ui/lab/Alert'

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()



    async function handleLogout() {
        setError("")
    
        try {
          await logout()
          history.push("/signin")
        } catch {
          setError("Failed to log out")
        }
      }

    return (
        <div>
            <h2>{currentUser.email.substring(0,currentUser.email.indexOf("@"))}'s Dashboard</h2>

            {error && <Alert severity="error">{error}</Alert>}
            {console.log(currentUser)}

            <Button onClick={handleLogout}>LOG OUT</Button>

        </div>
    )
}

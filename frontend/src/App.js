import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MakeDreamBoard from "./pages/MakeDreamBoard";
import Navbar from "./components/Navbar";
import { makeStyles } from "@material-ui/core";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const useStyles = makeStyles((theme) => ({
  container:{
      borderRadius: 20,
      backgroundColor: 'white',
      margin: 20,
      padding: 20,
      width: "80vw"

  }

}))

function App() {

  const classes = useStyles()

  return (
    <div className="App">
      <AuthProvider>
      <div className="front">
       

        <Navbar />

        <Router>
         
          <div className={classes.container}>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <PrivateRoute exact path="/makedreamboard" component={MakeDreamBoard} />
            </Switch>
          </div>
        </Router>
      </div>
      </AuthProvider>
    </div>
  );
}

export default App;

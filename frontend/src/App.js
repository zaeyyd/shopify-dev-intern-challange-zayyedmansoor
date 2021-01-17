import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import MakeDreamBoard from './pages/MakeDreamBoard';

function App() {
  return (
    <div className="App">
      <div className="front">
      <h1> YO</h1>

      <Router>
          
          

          <div>
            <Switch>
             <Route  exact path= "/" component={Dashboard}/>
             <Route  exact path= "/signin" component={SignIn} />
             <Route  exact path= '/signup' component={SignUp} />
             <Route  exact path='/makedreamboard' component={MakeDreamBoard} />

    
            </Switch>
          </div>
 

          
        </Router>
      </div>
     
    </div>
  );
}

export default App;

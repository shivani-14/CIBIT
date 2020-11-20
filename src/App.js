import './App.css';
import React, { Component } from 'react';
import AppRouter from './components/Routers/Routers';

import Login from './components/Auth/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isAuthenticated:!!sessionStorage.getItem("username")||false,
      username:sessionStorage.getItem("username")||"",
      error:''
    }
    this.handleLogin=this.handleLogin.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
  }
  handleLogout(username,isAuthenticated,error){
   
    this.setState({
      username,
      isAuthenticated,
      error
      
    })
    console.log("log out");
    sessionStorage.removeItem("username");

  }

  handleLogin(username,isAuthenticated,error){
    console.log(username,isAuthenticated,error)
    this.setState({
      isAuthenticated,
      username,
      error
    })
    if(isAuthenticated)
      sessionStorage.setItem("username",username);
  }
  componentDidMount(){
    console.log(this.state);
  }
  render(){
    const {isAuthenticated,username,error}=this.state
    console.log(isAuthenticated,"hello");
    return (
      <Router>
        <Switch>
          {!isAuthenticated ?
              <Route path="/" render ={ (props) => <Login  {...props} error={error} handleLogin = {this.handleLogin}/>}></Route> 
                :
              <Route path="/" render = {(props) => <AppRouter  {...props} username={username} handleLogout={this.handleLogout}/>}></Route>
        
          }
          <Route path="*" render={()=> <h1>404 page not found</h1>}></Route>
        </Switch>
    </Router>
    )
  }
  
}





export default App;

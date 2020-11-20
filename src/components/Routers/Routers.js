import React from 'react'
import Home from '../Home/Home';
import Transfer from '../FundTransfer/transfers'
import Fd from '../FixedDeposit/fixedDeposit';
import Navbar from '../Navbar/Navbar';
import Logout from '../Auth/logout'
import {createBrowserHistory} from 'history';
import {BrowserRouter as Router,Route ,Link,Switch, Redirect} from 'react-router-dom';
class AppRouter extends React.Component{

constructor(props){
  super(props);
}
render(){
    const {username,handleLogout}=this.props;
    const history = createBrowserHistory();
    return <Router history={history} >

    <Navbar  uid={username}/>
    <Switch>
    
      <Route exact path = "/"><Redirect to ={"/dashboard/"+username }></Redirect></Route>
      <Route exact path ="/dashboard/:acid" component={Home}></Route>
      <Route exact path = "/transfers/:acid" component={Transfer}></Route>
      <Route exact path = "/fd/:acid" component={(props) => <Fd history={history} {...props}/>}></Route>
      <Route exact path = "/logout/:acid" component = {(props)=><Logout {...props} history={history} handleLogout={handleLogout}/>}></Route>
      <Route path = "*" component ={() => {
        return <h1>Page Not Found</h1>
      }
      }></Route>
    </Switch>
  </Router>
}

}


export default AppRouter;


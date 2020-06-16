import React, {Component} from 'react';
import {HashRouter,Route,Switch} from "react-router-dom"
import Login from "./views/login/login";
import Admin from "./views/admin/admin";
import {connect} from "react-redux";
import actions from "./store/action";
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/" component={Admin}/>
        </Switch>
      </HashRouter>
    );
  }
}


export default connect(
    null,
    actions.user
)(App);

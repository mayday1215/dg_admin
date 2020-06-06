import React, {Component} from 'react';
import {HashRouter,Route,Switch} from "react-router-dom"
import Login from "./views/login/login";
import Admin from "./views/admin/admin";
import {connect} from "react-redux"
import {getUser} from "./utils/storageUtils"
import actions from "./store/action"

// const user = getUser()

class App extends Component {
  render() {
    // console.log(this.props.saveLoginUser);
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

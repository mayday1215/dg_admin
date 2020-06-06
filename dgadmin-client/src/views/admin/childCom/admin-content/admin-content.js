import React, {Component} from 'react';
import {Route,Switch,Redirect} from "react-router-dom"
import Home from "../../../home/home";
import Category from "../../../category/category";
import Bar from "../../../charts/bar";
import Line from "../../../charts/line";
import Pie from "../../../charts/pie";
import Product from "../../../product/product";
import Role from "../../../role/role";
import User from "../../../user/user";
import Order from "../../../order/order";



class AdminContent extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/category" component={Category}/>
          <Route path="/charts/bar" component={Bar}/>
          <Route path="/charts/line" component={Line}/>
          <Route path="/charts/pie" component={Pie}/>
          <Route path="/product" component={Product}/>
          <Route path="/role" component={Role}/>
          <Route path="/user" component={User}/>
          <Route path="/order" component={Order}/>
          <Redirect to="/home"/>
        </Switch>
      </div>
    );
  }
}

export default AdminContent;

import React, {Component} from 'react';
import {Switch,Route,Redirect} from "react-router-dom"
import ProductHome from "./childCom/productHome";
import ProductDetail from "./childCom/productDetail";
import ProductAddUpdate from "./childCom/productAddUpdate";
import "./product.less"
class Product extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/product" exact component={ProductHome}/>
          <Route path="/product/detail" component={ProductDetail}/>
          <Route path="/product/addupdate" component={ProductAddUpdate}/>
          <Redirect to="/"/>
        </Switch>
      </div>
    );
  }
}

export default Product;

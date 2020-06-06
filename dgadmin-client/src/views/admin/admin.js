import React, {Component} from 'react';
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import { Layout } from 'antd';
import AdminLeftNav from "./childCom/admin-left-nav/admin-left-nav";
import AdminHeader from "./childCom/admin-header/admin-header";
import AdminFooter from "./childCom/admin-footer/admin-footer"
import AdminContent from "./childCom/admin-content/admin-content";

const { Header, Footer, Sider, Content } = Layout;

class Admin extends Component {
  render() {
    const {user}  = this.props
    if (!user || !user._id){
      return <Redirect to="/login"/>
    }
    return (
      <Layout style={{height:"100%"}}>
        <Sider>
          <AdminLeftNav></AdminLeftNav>
        </Sider>
        <Layout>
          <AdminHeader></AdminHeader>
          <Content style={{backgroundColor:"#fff",margin:24}}>
            <AdminContent/>
          </Content>
          <Footer>
            <AdminFooter/>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  state => ({user:state.user})
)(Admin);

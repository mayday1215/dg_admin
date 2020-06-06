import React, {Component} from 'react';
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {Button} from "antd"
import AdminHeaderDate from "./childCom/admin-header-date";
import menuList from "../../../../config/menuConfig"
import "./admin-header.less"


class AdminHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  getTitle = () => {
    const path = this.props.location.pathname
    let title = ""
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        const cm = item.children.find(citem => {
          return citem.key === path
        })
        if (cm) {
          title = cm.title
        }

      }
    })
    return title
  }


  render() {
    
    const {username} = this.props.user
    const title = this.getTitle()

    return (
      <div className="admin-header">
        <div className="top">
          <span>欢迎，{username}</span>
          <Button type="link">退出</Button>
        </div>
        <div className="bottom">
          <div className="left">
            {title}
          </div>
          <div className="right">
            <AdminHeaderDate/>
            <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1542844738,3590951515&fm=26&gp=0.jpg"
                 alt=""/>
            <span>晴</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user})
)(withRouter(AdminHeader));

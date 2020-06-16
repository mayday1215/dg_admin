import React, {Component} from 'react';
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {Button,Modal} from "antd"
import AdminHeaderDate from "./childCom/admin-header-date";
import menuList from "../../../../config/menuConfig"
import {reqWeather} from "./../../../../network/api"
import {removeUser} from "../../../../utils/storageUtils"
import actions from "../../../../store/action"
import "./admin-header.less"

const { confirm } = Modal;
class AdminHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city:'深圳',
      weat:'',
      dayPictureUrl:'',

    }
  }

  async componentDidMount() {
    const {city} = this.state
    const data = await reqWeather(city)
    this.setState({
          dayPictureUrl:data.dayPictureUrl,
          weat:data.weather
        })
    // const data = await reqWeather()
    // if (data.status === 0){
    //   this.setState({
    //     city:data.result.location.city,
    //     weat:data.result.now.text
    //   })
    // }
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

  //退出
  loginUp = () => {
    confirm({
      content: '确定退出吗？',
      okText: '确定',
      cancelText:'取消',
      onOk:() => {
        removeUser("user_key")
        this.props.removeUser()
      },

    })

  }


  render() {

    const {username} = this.props.user
    const title = this.getTitle()
    const {weat,city,dayPictureUrl} = this.state

    return (
      <div className="admin-header">
        <div className="top">
          <span>欢迎，{username}</span>
          <Button type="link" onClick={this.loginUp}>退出</Button>
        </div>
        <div className="bottom">
          <div className="left">
            {title}
          </div>
          <div className="right">
            <AdminHeaderDate/>
            <img src={dayPictureUrl}
                 alt="" style={{marginLeft:10}}/>
            <span className="city">{city}</span>
            <span>{weat}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  actions.user

)(withRouter(AdminHeader));

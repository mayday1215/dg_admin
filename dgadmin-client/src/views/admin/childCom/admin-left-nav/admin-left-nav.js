import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom"
import {Menu} from 'antd';
import Logo from "../../../../assets/images/logo.png"
import "./admin-left-nav.less"
import menuList from "../../../../config/menuConfig";
import {connect} from "react-redux"


const {SubMenu} = Menu;

class AdminLeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKey: ""
    }

  }

  isAtuh = (item) => {
    const {username, role} = this.props.user
    const {menus} = role
    if (username === "admin" || menus.indexOf(item.key) >= 0 || item.publicAuto) {
      return true
    }else if (item.children){
      return item.children.some(child => {
        return menus.indexOf(child.key) >= 0
      })
    }
    return false

  }

  getMenuNodes = (menuList) => {
    //console.log(menuList)

    const path = this.props.location.pathname


    return menuList.map(item => {
      if (this.isAtuh(item)) {
        if (item.children) {
          //多级菜单
          const cItme = item.children.find(citem => {
            // return citem.key === path
            return path.indexOf(citem.key) === 0
          })
          if (cItme) {
            this.openKey = item.key
          }

          return (
            <SubMenu icon={<item.icon/>} title={item.title} key={item.key}>
              {this.getMenuNodes(item.children)}
            </SubMenu>
          )
        } else {
          //以及菜单
          return (<Menu.Item key={item.key} icon={<item.icon/>}>
              <Link to={item.key}>{item.title}</Link>
            </Menu.Item>
          )
        }
      }
      //console.log(item)

    })

  }

  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {
    let path = this.props.location.pathname
    // console.log(path)
    if (path.indexOf("/product") === 0) {
      path = "/product"
    }

    return (
      <div className="left-nav">
        <div className="header">
          <img src={Logo} alt={Logo}/>
          <h1>DG后台</h1>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
        >

          {
            this.menuNodes
          }
          {/* <Menu.Item key="/home" icon={<PieChartOutlined />}>
            <Link to="/home">首页</Link>
          </Menu.Item>
          <SubMenu  icon={<MailOutlined />} title="商品">
            <Menu.Item key="/category"  icon={<ContainerOutlined />}>
              <Link to="/category">商品管理</Link>
            </Menu.Item>
            <Menu.Item key="/product" icon={<ContainerOutlined />}>
              <Link to="/product">商品分类</Link>
            </Menu.Item>
          </SubMenu>*/}
        </Menu>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user})
)(withRouter(AdminLeftNav));

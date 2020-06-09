import React, { Component } from 'react';
import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from './../../network/api'
import {connect} from "react-redux"
import actions from "../../store/action"
import {saveUser} from "../../utils/storageUtils"
import {Redirect} from "react-router-dom"




import "./login.less"
import LOGO from "../../assets/images/logo.png"

class Login extends Component {
  constructor(props) {
    super(props);
  }

  formRef = React.createRef();
  userChange = () =>{
    // console.log(e.target.value)
    // console.log(this.formRef.current.getFieldValue("user"))
  }
  pwdChange = () =>{
    // console.log(this.formRef.current.getFieldValue("pwd"))
  }
  onFinish = async (value) =>{

    const data = await reqLogin(value.user,value.pwd)
    if (data.status === 0){
      //登录成功
      message.success("登录成功")
      this.props.saveLoginUser(data.data)
      saveUser(data.data)
      this.props.history.replace("/")

    }else{
      //登录失败
      message.error(data.msg)
    }
  }
  render() {
    const {user}  = this.props
    if (user && user._id){
      return <Redirect to="/"/>
    }
    return (

      <div className="login">
        <header>
          <img src={LOGO} />
          <h1>DG 后台管理系统</h1>
        </header>
        <section>
          <h2>用户登录</h2>
          <div>
            <Form
              name="normal_login"
              className="login-form"
              ref={this.formRef}
              onFinish={this.onFinish}
            >
              <Form.Item name="user"
               rules={[
                {required: true,message: '必须输入用户名'},
                {min: 4,message: '用户名至少4位'},
                {max: 12,message: '用户名不能超过12位'},
              ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} onChange={this.userChange} placeholder="用户名" />
              </Form.Item>
              <Form.Item
                name="pwd"
                rules={[
                  {required: true,message: '必须输入密码'},
                  {min: 4,message: '密码不能少于4位'},
                  {max: 12,message: '密码不能超过12位'},
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                  onChange = {this.pwdChange}
                />
              </Form.Item>


              <Form.Item>
                <Button type="primary" block htmlType="submit" className="login-form-button">登录</Button>
              </Form.Item>
            </Form>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(
  state => ({user:state.user}),
  actions.user
)(Login);























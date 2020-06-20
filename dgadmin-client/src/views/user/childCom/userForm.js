import React, {Component} from 'react';
import {Form,Input,Select} from "antd"
import PropTypes from "prop-types"

const {Item} = Form
const {Option} = Select

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};


class UserForm extends Component {

  constructor(props) {
    super(props);

  }

  formRef = React.createRef();
  static propTypes = {
    setForm:PropTypes.func.isRequired,
    user:PropTypes.object,
    roles:PropTypes.array
  }


  componentWillMount() {
    this.props.setForm(this.formRef)
  }






  render() {
    const {user,roles} = this.props

    return (
      <Form {...layout} ref={this.formRef} initialValues={{
        username:user.username,
        password:user.password,
        phone:user.phone,
        email:user.email,
        role_id:user.role_id

      }}>
        <Item label="用户名" name="username"
              rules={[
                {required: true,message: '必须输入用户名'},
                {min: 4,message: '用户名至少4位'},
                {max: 12,message: '用户名不能超过12位'},
              ]}
        >
          <Input placeholder="请输入用户名"/>
        </Item>
        {
          user._id ? null : (
            <Item label="密码" name="password"
                  rules={[
                    {required: true,message: '必须输入密码'},
                    {min: 4,message: '密码至少4位'},
                    {max: 12,message: '密码不能超过12位'},
                  ]}
            >
              <Input placeholder="请输入密码" type="password"/>
            </Item>
          )
        }

        <Item label="手机号" name="phone"
              rules={[
                {required: true,message: '必须输入手机号码'},
              ]}>
          <Input placeholder="请输入手机号" type="phone"/>
        </Item>
        <Item label="邮箱" name="email"
              rules={[
                {required: true,message: '必须输入邮箱'},
              ]}
        >
          <Input placeholder="请输入邮箱" type="email"/>
        </Item>
        <Item label="角色" name="role_id"
              rules={[
                {required: true,message: '必须选择角色'},
              ]}
        >
          <Select placeholder="请选择角色">
           {
             roles.map(item => (<Option value={item._id} key={item._id}>{item.name}</Option>))
           }
          </Select>
        </Item>
      </Form>
    );
  }
}

export default UserForm;

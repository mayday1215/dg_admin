import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd';
import {reqUserList, reqUserAdd, reqUserUpdate,reqUserDelete} from "../../network/api"
import {fromDate} from "./../../utils/formDateUtils"
import {ExclamationCircleOutlined} from "@ant-design/icons"
import UserForm from "./childCom/userForm";

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      roles: [],
      isShowModal: false
    }
  }

  //删除用户
  deleteUser = (user) => {
    Modal.confirm({
      title:'您确定要删除'+user.username+'吗？',
      icon: <ExclamationCircleOutlined />,
      onOk:async () => {

        const data =await reqUserDelete(user._id)
        if (data.status === 0){
          this.getUserList()
          message.success("删除成功!")
        }else{
          message.error("删除失败")
        }
      },
    })
  }

  //点击ok
  onSubmitInfo = () => {
    this.from.current.validateFields().then(async values => {
      let data;
      if (this.user && this.user._id) {
        //修改用户
        values._id = this.user._id
        data = await reqUserUpdate(values)
        if (data.status === 0) {
          message.success("修改用户成功")
          this.getUserList()
          this.setState({
            isShowModal: false
          })
        } else {
          message.error("修改用户失败")
        }

      } else {
        //添加用户
        data = await reqUserAdd(values)
        if (data.status === 0) {
          message.success("添加用户成功")
          this.getUserList()
          this.setState({
            isShowModal: false
          })
        } else {
          message.error("添加用户失败")
        }
      }
    }).catch(err => {
    })


  }

  //获取用户列表
  getUserList = async () => {
    const data = await reqUserList()
    if (data.status === 0) {
      const {users, roles} = data.data
      this.setState({
        users, roles
      })

    }


  }

  componentDidMount() {
    this.getUserList()
  }

  render() {
    const {users, roles, isShowModal} = this.state
    const columns = [
      {
        title: '用户',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: (create_time) => fromDate(create_time)
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => roles.find(item => item._id === role_id).name
      },
      {
        title: '操作',
        render: (user) => {
          return (
            <span>
              <a onClick={() => {
                this.setState({isShowModal: true}, () => {
                  if (this.from) {
                    this.from.current.resetFields()
                  }
                })
                this.user = user
              }}>修改</a>
              &nbsp; &nbsp;
              <a onClick={() => {
                this.deleteUser(user)
              }}>删除</a>
            </span>
          )
        }
      },
    ];
    const user = this.user || {}

    const title = (<Button type="primary" onClick={() => {
      this.user = null
      this.setState({isShowModal: true}, () => {
        if (this.from) {
          this.from.current.resetFields()
        }
      })
    }}>创建用户</Button>)
    return (
      <div>
        <Card title={title}>
          <Table dataSource={users}
                 columns={columns}
                 bordered
                 rowKey={"_id"}
                 pagination={{defaultPageSize:3, showQuickJumper: true}}
          />
        </Card>


        <Modal
          title={user._id ? "修改用户" : "添加用户"}
          visible={isShowModal}
          onOk={this.onSubmitInfo}
          onCancel={() => {
            this.setState({isShowModal: false})
          }}
        >
          <UserForm
            setForm={(formRef) => {
              this.from = formRef
            }}
            user={user}
            roles={roles}
          />
        </Modal>
      </div>
    );
  }
}

export default User;

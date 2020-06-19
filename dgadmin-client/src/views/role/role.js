import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd';
import {reqRoleList, reqAddRole, reqUpdateRole} from "../../network/api"
import {connect} from "react-redux"
import AddRole from "./childCom/addRole";
import RoleAuth from "./childCom/roleAuth";
import {fromDate} from "../../utils/formDateUtils"

class Role extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      role: {},
      showAddRole: false,
      isShowAuth: false
    }
  }

  //点击确定权限
  clickUpdateAuth = async () => {
    //获取最新权限
    const {role} = this.state
    role.menus = this.roleAuth.getCheckedKeys()
    role.auth_name = this.props.user.username
    role.auth_time = Date.now()
    const data = await reqUpdateRole(role)
    if (data.status === 0) {
      this.setState({
        roles: [...this.state.roles],
        isShowAuth: false
      })

    }
  }

  //点击添加角色
  clickAddRole = async () => {

    const values = await this.from.current.validateFields()
    const {roleName} = values
    const data = await reqAddRole(roleName)
    if (data.status === 0) {
      message.success("添加角色成功")
      this.setState({
        roles: [...this.state.roles, data.data],
        showAddRole: false
      })

    } else {
      message.error("添加角色失败")
    }

  }

  //点击行 保存行对象
  onRow = (record) => {
    return {
      onClick: event => {
        this.setState({role: record})
      }
    }
  }

  //获取角色列表
  getRolesList = async () => {
    const data = await reqRoleList()
    if (data.status === 0) {
      this.setState({
        roles: [...data.data]
      })
    }
  }


  onRef = (ref) => {
    this.roleAuth = ref
  }

  componentDidMount() {
    this.getRolesList()
  }

  render() {

    const {role, roles, showAddRole, isShowAuth} = this.state
    console.log(role)
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render:(create_time) => fromDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render:(auth_time) => fromDate(auth_time)
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',

      },
    ];
    const title = (<span>
      <Button type="primary" onClick={() => {
        this.setState({showAddRole: true})
      }}>创建角色</Button>
      &nbsp;&nbsp;&nbsp;
      <Button type="primary" disabled={!role._id}
              onClick={() => {
                this.setState({isShowAuth: true})
              }}
      >设置角色权限</Button>
    </span>)

    return (
      <div>
        <Card title={title}>
          <Table dataSource={roles}
                 columns={columns}
                 bordered
                 rowKey={"_id"}
                 pagination={{defaultPageSize: 5, showQuickJumper: true}}
                 rowSelection={{type: 'radio', selectedRowKeys: [role._id]}}
                 onRow={this.onRow}
          />;
        </Card>

        <Modal
          title="添加角色"
          visible={showAddRole}
          onOk={this.clickAddRole}
          onCancel={() => {
            this.setState({showAddRole: false})
            this.from.current.resetFields()
          }}
        >
          <AddRole setForm={(formRef) => {
            this.from = formRef
          }}/>
        </Modal>


        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.clickUpdateAuth}
          onCancel={() => {
            this.setState({isShowAuth: false})

          }}
        >
          <RoleAuth role={role} onRef={this.onRef}/>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
)(Role);

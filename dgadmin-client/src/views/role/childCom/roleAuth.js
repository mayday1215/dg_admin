import React, {Component} from 'react';
import {Form,Input,Tree} from "antd"
import PropTypes from "prop-types"
import menuList from "../../../config/menuConfig"
const { TreeNode } = Tree;
const {Item} = Form



class RoleAuth extends Component {

  constructor(props) {
    console.log("constructor")
    super(props);
    this.state = {
      checkedKeys:this.props.role.menus
    }
  }
  static propTypes = {
    role:PropTypes.object
  }

  //点击权限
  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({
      checkedKeys:checkedKeys
    })
  };

  componentDidMount(){
    this.props.onRef(this)
  }

  //返回更新数据给父元素
  getCheckedKeys = () => {
    return this.state.checkedKeys
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({checkedKeys:nextProps.role.menus})
  }

  render() {
    const treeData = menuList
    const {role} = this.props
    const {checkedKeys} = this.state
    return (
      <div>
        <Form>
          <Item label="角色名称">
            <Input value={role.name} disabled/>
          </Item>
        </Form>

        <Tree
          checkable
          checkedKeys={checkedKeys}
          defaultExpandAll={true}
          treeData={treeData}
          onCheck={this.onCheck}
        />



      </div>
    );
  }
}

export default RoleAuth;

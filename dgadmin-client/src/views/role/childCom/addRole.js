import React, {Component} from 'react';
import {Form, Input} from "antd"
import PropTypes from "prop-types"
class AddRole extends Component {
  constructor(props) {
    super(props);

  }

  formRef = React.createRef();
  static propTypes = {
    setForm:PropTypes.func.isRequired
  }



  componentWillMount() {
    this.props.setForm(this.formRef)
  }

  render() {
    return (
      <div>
        <Form ref={this.formRef}>
          <Form.Item label="角色名称"
                     name="roleName"
                     rules={[
                        {
                          required: true,
                          message: '必须输入角色名称',
                        },
                      ]}>
            <Input placeholder="请输入角色名称"/>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddRole;

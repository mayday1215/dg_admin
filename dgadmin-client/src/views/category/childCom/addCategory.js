import React, {Component} from 'react';
import {Form, Input, Select} from "antd"
import PropTypes from "prop-types"

const { Option } = Select;

class AddCategory extends Component {
  constructor(props) {
    super(props);

  }
  formRef = React.createRef();
  static propTypes = {
    cateGoryList:PropTypes.array.isRequired,
    setForm:PropTypes.func.isRequired,
    parentId:PropTypes.string.isRequired
  }

  componentWillMount() {
    this.props.setForm(this.formRef)
  }

  render() {
    const {cateGoryList,parentId} = this.props
    return (
      <div>
        <Form ref={this.formRef}>
          <Form.Item name="parentId" initialValue={parentId}

          >
            <Select>
              <Option value={"0"}>一级分类</Option>
              {
                cateGoryList.map(item => {
                  return ( <Option value={item._id} key={item._id}>{item.name}</Option>)
                })
              }
            </Select>
          </Form.Item>

          <Form.Item name="categoryName"
                     rules={[
                       {required: true,message: '必须输入分类名称'},

                     ]}
          >
            <Input/>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddCategory;

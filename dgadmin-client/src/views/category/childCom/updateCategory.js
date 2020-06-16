import React, {Component} from 'react';
import { Form, Input} from 'antd';
import PropTypes from "prop-types"

class UpdateCategory extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    cateGoryName:PropTypes.string.isRequired,
    setForm:PropTypes.func.isRequired
  }


  formRef = React.createRef();
  componentWillMount() {
    this.props.setForm(this.formRef)
  }
  componentDidMount() {
  }


  render() {


    const cateGoryName =  this.formRef.current ? this.formRef.current.getFieldValue("category"): this.props.cateGoryName
    return (
      <div>
        <Form
          name="normal_login"
          className="login-form"
          ref={this.formRef}
          initialValues={{category:cateGoryName}}
        >
          <Form.Item name="category"

                     rules={[
                       {required: true,message: '必须输入分类名称'},

                     ]}

          >
            <Input placeholder="请输入分类名称"/>
          </Form.Item>

        </Form>
      </div>
    );
  }
}

export default UpdateCategory;

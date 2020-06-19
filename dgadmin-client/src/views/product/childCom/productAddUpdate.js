import React, {Component} from 'react';
import { Card,Form,Input,Button,Cascader,message  } from 'antd';
import {ArrowLeftOutlined} from "@ant-design/icons"
import {reqCategoryList,reqCategoryInfo,reqProductAdd,reqProductUpdate} from "../../../network/api"
import ProductImgUpload from "./productImgUpload";
import EditorConvertToHTML from "./EditorConvertToHTML";


const {Item} = Form
const { TextArea } = Input;

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 8 },
};



class ProductAddUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options:[],
      parentCategoryName:'',
      childCategoryName:'',
      categoryId:'',
      pCategoryId:''
    }

  }


  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
    const data = await this.getCategorys(targetOption.value)
    targetOption.loading = false;
    if (data.status === 0){
      const list = data.data
      if (list && list.length > 0){
        const childCotegorys = list.map(item => {
          return {
            label: item.name,
            value: item._id
          }
        })
        targetOption.children = childCotegorys
      }else{
       targetOption.isLeaf = true
      }
      this.setState({options:this.state.options})

    }
  };
  //初始化options
  initOptions = (categorys) => {
    const options = categorys.map(item => {
      return {
        value: item._id,
        label: item.name,
        isLeaf: false,
      }
    })
    this.setState({
      options
    })

  }
  //获取一级分类或者二级分类列表
  getCategorys =async (parentId) => {
    const data = await reqCategoryList(parentId)
    if (parentId === "0"){
      //请求一级列表
      if (data.status === 0){
        const categorys = data.data
        this.initOptions(categorys)
      }
    }else{
      //请求二级列表
      return data
    }

  }
  //验证表单通过发送请求
  submitAddUpdate = async (values) => {
      let {state} = this.props.location
      state = state || {}
      const name = values.pName
      const desc = values.pDesc
      const price = values.pPrice
      const { categoryId,pCategoryId} = this.state
      const _id = state._id
      const imgs = this.child.getImgList()
      const detail = this.childEdit.getHtml()
      const product = {
        name,desc,price, categoryId,pCategoryId,imgs,detail
      }

    if (_id){
      //修改商品

      const data = await reqProductUpdate({...product,_id})
      if (data.status === 0){
        message.success("修改商品成功")
        this.props.history.goBack()
      }else{
        message.error("修改商品失败")
      }
    }else{
      //添加商品
      const data = await reqProductAdd(product)
      if (data.status === 0){
        message.success("添加商品成功")
        this.props.history.goBack()
      }else{
        message.error("添加商品失败")
      }
    }


  }

  //验证价格
  validatePrice = (rule, value) => {
    if (value >= 0){
      return Promise.resolve()
    }
    return Promise.reject("价格不能低于0元")
  }
  //选中后更改内容
  categorysChange = (value, selectedOptions) => {
    if (selectedOptions.length >= 2){
      this.setState({
        categoryId:selectedOptions[1].value,
        pCategoryId:selectedOptions[0].value
      })
    }else if (selectedOptions.length === 1){
      this.setState({
        categoryId:selectedOptions[0].value,
        pCategoryId:"0"
      })
    }
  }


  componentDidMount() {
    this.getCategorys("0")

  }

  render() {
    let {state} = this.props.location
    state = state || {}
    //console.log(state)


    const imgs = state.imgs
    const title = (
      <span>
        <ArrowLeftOutlined
          style={{fontSize: 20, color: '#1890ff', marginRight: 15}}
          onClick={() => {
            this.props.history.goBack()
          }}
        />
        { state && state._id ? '修改商品' : "添加商品" }
      </span>
    )
    return (
      <div>
        <Card title={title}>
          <Form {...layout} onFinish={this.submitAddUpdate}>
            <Item
              name="pName"
              label="商品名称"
              rules={[{required:true,message:'必须输入商品名称'}]}
              initialValue={state.name}
            >
              <Input placeholder="请输入商品名称"/>
            </Item>
            <Item label="商品描述"
                  name="pDesc"
                  rules={[{required:true,message:'必须输入商品描述'}]}
                  initialValue={state.desc}
            >
              <TextArea placeholder="请输入商品描述" autoSize={{minRows:2}}></TextArea>
            </Item>
            <Item label="商品价格"
                  name="pPrice"
                  rules={[
                    {required:true,message:'必须输入商品价格'},
                    {validator:this.validatePrice}
                    ]}
                  initialValue={state.price}
            >
              <Input type="number"  addonAfter="元" placeholder="请输入商品价格"/>
            </Item>
            <Item label="商品分类"
                  name="cascader"
                  rules={[
                    {required:true,message:'必须选择商品分类'},

                  ]}
            >
              <Cascader
                options={this.state.options}
                loadData={this.loadData}
                changeOnSelect
                placeholder="请指定商品分类"
                onChange={this.categorysChange}

              />
            </Item>
            <Item label="商品图片">
              <ProductImgUpload imgs={imgs}  onRef={(ref) => {this.child = ref}}/>
            </Item>

            <Item label="商品详情" labelCol={{span: 3}} wrapperCol={{ span: 20 }}>
              <EditorConvertToHTML detail={state.detail} onRef={(ref) => {this.childEdit = ref}}/>
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">提交</Button>
            </Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default ProductAddUpdate;

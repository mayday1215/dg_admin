import React, {Component} from 'react';
import {Card, Button, Table,Modal} from 'antd';
import {PlusOutlined, ArrowRightOutlined} from "@ant-design/icons"
import {reqCategoryList,reqUpdateCategroy,reqAddCategroy} from "../../network/api"
import UpdateCategory from "./childCom/updateCategory";
import AddCategory from "./childCom/addCategory";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cateGoryList: [], //一级分类
      subCateGoryList: [], //二级分类
      isLoading: false, //loading加载
      parentId: '0', //请求分类id
      subName: '', //二级分类名字
      showStatus:0, //显示Modal状态  0  不显示  1显示修改分类   2显示添加分类
      cateGoryName:'',
    }
  }
  //确定更新分类
  clickUpdateCategory =  () => {

    this.from.current.validateFields().then(async values => {
      const categoryId = this.cateGory._id
      const categoryNam = this.from.current.getFieldValue("category")
      const data = await reqUpdateCategroy(categoryId,categoryNam)
      if (data.status === 0){
        this.setState({showStatus:0})
        this.getCateGory()
      }
    }).catch(err => {})







  }
  //点击确定添加
  clickUAddCategory =  () => {

   this.from.current.validateFields().then(async values => {
     console.log(values)
     const categoryName = values.categoryName
     const parentId = values.parentId
     const data =await reqAddCategroy(parentId,categoryName)
     if (data.status === 0){
       this.setState({showStatus:0})
       this.getCateGory()
       this.from.current.resetFields()

     }
   }).catch(err => {})





  }

  //点击取消更新和添加分类
  handleCancel = () => {

    this.setState({showStatus:0})

    this.from.current.resetFields()


  }
  //点击显示修改分类
  showUpdateCategory = (record) => {
    this.setState({showStatus:1,cateGoryName:record.name})
    this.cateGory = record
    if (this.from){
      this.from.current.setFieldsValue({category:record.name})
    }



  }
  //返回一级分类
  backPreCateGory = () => {
    this.setState({
      parentId: '0',
      subName: '',
      subCateGoryList: []
    })
  }
  //获取子分类
  getSubCategoryList = (record) => {
    const {_id, name} = record

    this.setState({
      parentId: _id,
      subName: name
    }, () => {
      this.getCateGory()
    })

  }
  //获取一级列表或者二级分类
  getCateGory = async () => {
    this.setState({isLoading: true})
    const {parentId} = this.state
    const data = await reqCategoryList(parentId)
    const cateGoryList = data.data
    this.setState({isLoading: false})
    if (data.status === 0) {
      if (parentId === "0") {
        this.setState({
          cateGoryList
        })
      } else {
        this.setState({
          subCateGoryList: cateGoryList
        })
      }

    }
  }

  componentDidMount() {
    const {parentId} = this.state
    this.getCateGory()

  }

  render() {
    const {
      cateGoryList, isLoading, subCateGoryList, parentId,
      subName,showStatus,cateGoryName
    } = this.state
    // console.log("Category渲染")

    const title = parentId === "0" ? "一级分类列表" : (
      (<span>
        <a onClick={this.backPreCateGory}>一级分类列表</a>
        <ArrowRightOutlined style={{margin: "0 10px"}}/>
        <span>{subName}</span>
      </span>)
    )
    const extra = (
      <Button type="primary" icon={<PlusOutlined/>} onClick={() => {
        this.setState({showStatus:2})
      }}>
        添加
      </Button>
    )


    const columns = [

      {
        title: '分类的名称',
        dataIndex: 'name',
        key: 'age',
      },
      {
        title: '操作',
        dataIndex: 'address',
        key: 'address',
        width: 300,
        render: (text, record) => <span>
          <a style={{marginRight: 20}} onClick={() => {this.showUpdateCategory(record)}}>修改分类</a>
          {
            parentId === "0" ? <a onClick={() => {
              this.getSubCategoryList(record)
            }}>查看子分类</a> : null
          }

        </span>,


      },
    ];

    return (

      <div>
        <Card title={title} extra={extra}>
          <Table dataSource={parentId === "0" ? cateGoryList : subCateGoryList}
                 columns={columns}
                 bordered
                 rowKey={"_id"}
                 pagination={{defaultPageSize: 5, showQuickJumper: true}}
                 loading={isLoading}
          />;
        </Card>
        <Modal
          title="更新分类"
          visible={showStatus === 1}
          onOk={this.clickUpdateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateCategory cateGoryName={cateGoryName} setForm={(formRef) => {this.from = formRef}}/>
        </Modal>
        <Modal
          title="添加分类"
          visible={showStatus === 2}
          onOk={this.clickUAddCategory}
          onCancel={this.handleCancel}
        >
          <AddCategory cateGoryList={cateGoryList}
                       setForm={(formRef) => {this.from = formRef}}
                       parentId={parentId}
          />
        </Modal>
      </div>
    );
  }
}

export default Category;

import React, {Component} from 'react';
import {Card, Button, Table, message} from 'antd';
import {PlusOutlined, ArrowRightOutlined} from "@ant-design/icons"
import {reqCategoryList} from "../../network/api"

class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cateGoryList: [],
      subCateGoryList: [],
      isLoading: false,
      parentId: '0',
      subName: ''

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
    console.log(parentId)
    this.getCateGory()

  }

  render() {
    const {cateGoryList, isLoading, subCateGoryList, parentId, subName} = this.state
    const title = parentId === "0" ? "一级分类列表" : (
      (<span>
        <a onClick={this.backPreCateGory}>一级分类列表</a>
        <ArrowRightOutlined style={{margin: "0 10px"}}/>
        <span>{subName}</span>
      </span>)
    )
    const extra = (
      <Button type="primary" icon={<PlusOutlined/>}>
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
          <a style={{marginRight: 20}}>修改分类</a>
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
      </div>
    );
  }
}

export default Category;

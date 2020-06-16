import React, {Component} from 'react';
import {Card, Select, Input, Button, Table,message} from 'antd';
import {PlusOutlined} from "@ant-design/icons"
import {reqProductList, reqSearchProducs, reqUpdateStatus} from "../../../network/api"

const {Option} = Select;

class ProductHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      pageSize: 3,
      total: 0,
      searchType: 'productName',
      searchContent: '',
      currentName: 1,
      isShowLoding:false,
    }

  }


  //点击上下架
  updateStatus = async (record) => {
    const {status, _id} = record
    // 1是上架状态
    //productId,status
    const data = await reqUpdateStatus(_id, status === 1 ? 2 : 1)
    if (data.status === 0){
      this.getProducts(this.state.currentName)
      message.success({
        content:"更新上下架",
        duration:1
      })
    }
  }
  //点击搜索
  clickSearchBtn = () => {
    this.getProducts(1)

  }

  //请求商品数据方法
  getProducts = async (page) => {

    this.setState({currentName: page,isShowLoding:true})
    const {pageSize} = this.state
    const {searchType, searchContent} = this.state
    let data;
    if (searchContent) {
      //搜索分页
      data = await reqSearchProducs(page, pageSize, searchType, searchContent)
      console.log("一般分页", this.state)
      console.log(data)
    } else {
      //一般分页
      data = await reqProductList(page, pageSize)

    }

    if (data.status === 0) {
      const {total, list} = data.data
      this.setState({total, dataSource: list})
    }
    this.setState({isShowLoding:false})
  }

  componentDidMount() {
    this.getProducts(1)
  }


  render() {

    const {dataSource, pageSize, total, searchType, searchContent, currentName,isShowLoding} = this.state
    const {history} = this.props
    const columns = [
      {
        width: 100,
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        render: (text, record) => {
          return "￥" + record.price
        }
      },

      {
        title: '状态',
        width: 100,
        render: (text, record) => {
          const {status} = record
          return (
            <span>
              <Button type="primary" onClick={() => {
                this.updateStatus(record)
              }}>{status === 1 ? "下架" : "上架"}</Button>

              {status === 1 ? "在售" : "已下架"}
          </span>)
        }
      },

      {
        title: '操作',
        width: 100,
        render: (text, record) => {
          return (
            <span>
              <a onClick={() => {
                history.push({pathname: "/product/detail", state: record})
              }}>详情</a>
              <br/>
              <br/>
              <a>修改</a>
          </span>)
        }
      },
    ];


    const title = (
      <span>
        <Select defaultValue={searchType} style={{width: 150}} onChange={(val) => {
          this.setState({searchType: val})
        }}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{width: 150, margin: "0 15px"}} value={searchContent} onChange={(e) => {
          this.setState({searchContent: e.target.value})
        }}/>
        <Button type="primary" onClick={this.clickSearchBtn}>搜索</Button>
      </span>
    )
    const extra = (
      <Button type="primary" icon={<PlusOutlined/>}>
        添加商品
      </Button>
    )
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            loading={isShowLoding}
            bordered
            rowKey={"_id"}
            dataSource={dataSource}
            columns={columns}
            pagination={{
              current: currentName, defaultPageSize: pageSize, total, onChange: (pagination, filters, sorter) => {
                this.getProducts(pagination)
              }
            }}
          />
        </Card>
      </div>
    );
  }
}

export default ProductHome;

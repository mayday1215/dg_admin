import React, {Component} from 'react';
import {Card, List} from "antd"
import {ArrowLeftOutlined} from "@ant-design/icons"
import {Redirect} from "react-router-dom"
import {reqCategoryInfo} from "../../../network/api"
import {IMG_BASE_URL} from "../../../utils/constantUtils"

const {Item} = List

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pName:'',
      cName:''
    }

  }

   getCategoryNameById =async () => {
    const {state} = this.props.location
    if (!state) {

      return <Redirect to="/product"/>
    }



    const {pCategoryId, categoryId} = state
    // console.log(pCategoryId)
    // reqCategoryInfo(pCategoryId).then(data => {
    //   console.log(data)
    // })
    const datas = await Promise.all([reqCategoryInfo(pCategoryId),reqCategoryInfo(categoryId)])
     if (datas[0].status === 0 && datas[1].status === 0){
       this.setState({
         pName:datas[0].data.name,
         cName:datas[1].data.name
       })
     }

  }

  componentDidMount() {
    this.getCategoryNameById()
  }


  render() {
    const {history, location} = this.props
    if (!location.state) {

      return <Redirect to="/product"/>
    }
    const {name, desc, price, detail, imgs} = location.state
    const {pName,cName} = this.state
    const title = (
      <span>
        <ArrowLeftOutlined
          style={{fontSize: 20, color: '#1890ff', marginRight: 15}}
          onClick={() => {
            history.goBack()
          }}
        />
        商品详情
      </span>
    )
    return (
      <div className="product-detail">
        <Card title={title}>
          <List>
            <Item className='item'>
              <span>商品名称:</span>
              <span>{name}</span>
            </Item>

            <Item className='item'>
              <span>商品描述:</span>
              <span>{desc}</span>
            </Item>

            <Item className='item'>
              <span>商品价格:</span>
              <span>{price}元</span>
            </Item>
            <Item className='item'>
              <span>所属分类:</span>
              <span>{pName} --> {cName}</span>
            </Item>

            <Item className='item'>
              <span>商品图片:</span>
              <span>
                {
                  imgs.map((item, index) => {
                    return <img src={IMG_BASE_URL + item} alt="" key={index}/>
                  })
                }

              </span>
            </Item>

            <Item className='item'>
              <span>商品详情:</span>
              <span dangerouslySetInnerHTML={{__html: detail}}>
              </span>
            </Item>
          </List>

        </Card>
      </div>
    );
  }
}

export default ProductDetail;

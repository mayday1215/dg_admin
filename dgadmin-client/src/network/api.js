import {request} from "./request"
import jsonp from 'jsonp'
import {message} from "antd"
//登录请求
export const reqLogin = (username,password) => request({url:'/login',method:'post',data:{username,password}})

//请求天气
// const WEATHERURL = "/weather/v1/?district_id=440300&data_type=all&ak=SKWz4teGUuKgOgASNUvOFK88zufoxd15"
// export const reqWeather = () => request2({url:WEATHERURL,method:"get"})

// export const reqWeather = () => request2({url:WEATHERURL,method:"get"})

export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,{},(err,data) => {

      if (!err && data.status==='success') {
        // 取出需要的数据
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // 如果失败了
        message.error('获取天气信息失败!')
      }
    })
  })


}

//获取一级或某个二级分类列表
export const reqCategoryList = (parentId) =>request({url:"/manage/category/list",method:"get",params:{parentId}})

//修改分类
export const  reqUpdateCategroy = (categoryId ,categoryName) => request({url:'/manage/category/update',method:'post',data:{
    categoryId,
    categoryName
  }})

//添加分类
export const reqAddCategroy = (parentId,categoryName) => request({url:'/manage/category/add',method:'POST',data:{parentId,categoryName}})


//获取商品分页列表
export const reqProductList = (pageNum,pageSize) => request({
  url:'/manage/product/list',
  method:'get',
  params: {
    pageNum,
    pageSize
  }
})

//搜索商品列表
export const reqSearchProducs = (pageNum,pageSize,searchType,searchContent) => request({
  url:'/manage/product/search',
  method:'get',
  params:{
    pageNum,
    pageSize,
    [searchType]:searchContent
  }
})

//根据id获取分类信息
export const reqCategoryInfo = (categoryId) => request({
  url:'/manage/category/info',
  method:'get',
  params:{categoryId},
})


//更改上下架

export const reqUpdateStatus = (productId,status) => request({url:'/manage/product/updateStatus',method:'post',data:{productId,status}})

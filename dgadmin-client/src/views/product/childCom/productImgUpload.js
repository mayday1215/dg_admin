import React, {Component} from 'react';
import { Upload, Modal,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeleteImg} from "../../../network/api"
import PropTypes from "prop-types"

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class ProductImgUpload extends Component {
  static propTypes = {
    imgs:PropTypes.array
  }



  constructor(props) {
    super(props);
    let fileList = []
    const {imgs} = this.props
    if(imgs && imgs.length > 0){

      fileList = imgs.map((item,index) => {
        return {
            uid: -index,
            name: item,
            status: 'done',
            url: "http://localhost:5000/upload/"+item,
          }
      })
    }


    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList
    }
  }
  getImgList = () => {
    return this.state.fileList.map(item => item.name)
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    console.log("handlePreview")

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);

    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };



  componentDidMount() {
    this.props.onRef(this)
  }

  //点击上传删除
  handleChange = async ({ file,fileList }) => {
    // console.log(file,fileList,file.status)
    if (file.status === "done"){
      //图片上传成功
      const {status,data} = file.response
      if (status === 0){
        file = fileList[fileList.length-1]
        file.name = data.name
        file.url = data.url
        message.success("图片上传成功")
      }else{
        message.error("图片上传失败")
      }
    }else if (file.status === "removed"){
      //删除照片
      const data = await reqDeleteImg(file.name)
      if (data.status === 0){
        message.success("删除图片成功")
      }else{
        message.error("删除图片失败")
      }
    }

    this.setState({ fileList });
  }



  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          accept="image/*"
          action="/api/manage/img/upload"
          listType="picture-card"
          name="image"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default ProductImgUpload;

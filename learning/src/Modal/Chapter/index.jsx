import React, { Component } from 'react';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import { Input, Select, Upload, Form, Icon, message, Button, InputNumber } from 'antd';
import { $addChapter } from '../../services';
import './index.css';

const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.init();
    }

    init()  {
      this.state = {
        name: '',
        desc:'',
        title: '',
        test: '',
        videoUrl: '',
        more: '',
        //video 上传
        video: {},
        loading: false,
        imageUrl: '',
    }
    }

    componentDidMount() {
        document.title = '在线学习系统-视频上传';
    }

    async onSubmit() {
      const {name, title, desc, test, videoUrl, more} = this.state;
      const opts = {
        title,
        name,
        desc,
        videoUrl,
        more,
      };

      if (test) {
        opts.test = test;
      }

      const respData = await $addChapter(opts);
      if(respData.ret > 0) {
        message.success('添加成功', 2);
        this.init()
      }
    }

    chapterNameChange = (value) => {
      this.setState({
        name: value
      })
    }

    chapterTitleChange = (e) => {
      this.setState({
        title: e.target.value
      })
    }

    chapterVideoURlChange = (e) => {
      this.setState({
        videoUrl: e.target.value
      })
    }

    chapterDescChange = (e) => {
      this.setState({
        desc: e.target.value
      })
    }

    chapterMoreChange = (e) => {
      this.setState({
        more: e.target.value
      })
    }

  render() {

    const formItemLayout =  {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }

    const uploadButton = (
      <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (  
      <div>
        <Header />
            <div className="container">
                <Form layout="horizontal">
                    <FormItem label="课程 " {...formItemLayout}>
                        <Select defaultValue="c">
                            <Option value="c">程序设计基础</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="chapter " {...formItemLayout}>
                        <Input style={{width: 400}} placeholder="请输入知识点标题" onChange={this.chapterTitleChange} />
                    </FormItem>
                    <FormItem label="chapter " {...formItemLayout}>
                        <InputNumber  style={{width: 200}} min={1} placeholder="请选择章节"  onChange={this.chapterNameChange} />
                    </FormItem>
                    <FormItem label="url " {...formItemLayout}>
                        <Input style={{width: 400}} placeholder="请输入视频url" onChange={this.chapterVideoURlChange} />
                    </FormItem>
                    <FormItem label="desc " {...formItemLayout}>
                        <TextArea style={{width: 400}} placeholder="输入描述内容" autosize={{ minRows: 2, maxRows: 6 }} onChange={this.chapterDescChange} />
                    </FormItem>
                    <FormItem label="more " {...formItemLayout}>
                        <TextArea style={{width: 400}} placeholder="输入详细内容" autosize={{ minRows: 4}} onChange={this.chapterMoreChange} />
                    </FormItem>
                    <FormItem label="上传视频 " {...formItemLayout}>
                      <Upload
                        // name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="//jsonplaceholder.typicode.com/posts/"
                        // beforeUpload={beforeUpload}
                        // onChange={this.handleChange}
                      >
                        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="" /> : uploadButton}
                      </Upload>
                    </FormItem>
                    <Button type="primary" style={{marginLeft: 400}} onClick={this.onSubmit} >提交</Button>
                </Form>
            </div>
        <Bottom />
      </div>
    )
  }
}
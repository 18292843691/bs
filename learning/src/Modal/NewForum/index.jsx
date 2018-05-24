import React, { Component } from 'react';
import { Select, Input, Button, message, Form } from 'antd';
import  Header from '../../components/Header';
import './index.css';
import { $addForum } from '../../services';
import { getTokenParams } from '../../utils/index';

const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;

export default class NewForum extends React.Component {
    constructor(props) {
        super(props)
        this.addNewForum = this.addNewForum.bind(this);
        this.state = {
            kind: '指针',
            content: '',
            title: '',
        }
    }

    kindChange = (value) => {
        this.setState({
            kind: value,
        })
    }

    titleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    contentChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    async addNewForum() {
        const { content, title, kind } = this.state;
        const msg = getTokenParams();
        const opts = {
            content,
            title,
            kind,
        }

        if (msg.member_info && msg.member_info._id) {
            opts.cid = msg.member_info._id;
        }

        const respData = await $addForum(opts);
        if (respData.ret > 0) {
            message.success('创建成功', 2);
        }
    }

    render() {
        const { kind, content, title } = this.state;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }

        return (
            <div >
                <Header />
                <div className="newForum">
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <h1>发表文章</h1>
                    </div>
                    <div className="newForum-container">
                        <Form layout="horizontal">
                            <FormItem label="文章标题: " {...formItemLayout}>
                                <Input style={{width: 200}} placeholder="请输入文章标题" value={title} onChange={this.titleChange} />
                            </FormItem>
                            <FormItem label="分类: " {...formItemLayout}>
                                <Select value={kind} onChange={this.kindChange}>
                                    <Option value="指针">指针</Option>
                                    <Option value="数组">数组</Option>
                                    <Option value="循环">循环</Option>
                                    <Option value="算法">算法</Option>
                                    <Option value="数据类型">数据类型</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="文章正文: " {...formItemLayout}>
                                <TextArea placeholder="输入文章正文" autosize={{ minRows: 4}} value={content} onChange={this.contentChange} />
                            </FormItem>
                        </Form>     
                    </div>
                    <Button type="primary" style={{width: 100}} ghost onClick={this.addNewForum} >提交</Button>
                </div>
            </div>
        )
    }
}
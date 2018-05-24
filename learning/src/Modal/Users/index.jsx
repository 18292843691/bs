import React, { Component } from 'react';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import { InputNumber, Divider, Table, Button, message } from 'antd';
import { $getUsers, $updateUsers, $deleteUsers } from '../../services';
import './index.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.state = {
            users: [],
            data: [],
            token: 0,
        }
    }

    componentDidMount() {
        document.title = '在线学习系统-用户管理';
        this.fetchData();
    }

    async changeUser(index) {

        const { data } = this.state;
        const opts = {
            user: data[index],
        }
        console.log(index, data, data[index])
        const respData = await $updateUsers(opts);
        // if (respData.ret > 0) {
            message.success('修改成功', 2);
            this.setState({
                data: data,
            })
        // }
    }

    async deleteUser(index) {
        const { data } = this.state;
        const opts = {
            user_id: data[index].id,
        }
        const respData = await $deleteUsers(opts);
        data.splice(index, 1);
        if (respData.ret > 0) {
            message.success('删除成功', 2);
            this.setState({
                data: data,
            })
        }
    }

    async fetchData() {
        const respData = await $getUsers();
        const { data } = this.state;
        if(respData.ret > 0) {
            this.setState({
                users: respData.data.users
            }, () => {
                let users = respData.data.users
                if (users) {
                    users.forEach((v) => {
                        data.push({
                            name: v.name,
                            age: v.age,
                            token: v.token,
                            gender: v.gender,
                            id: v._id,
                        })
                    })
                }
                this.setState({
                    data: data
                })
            })
        }
    }

  render() {
      const {token} = this.state;

      const columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        // render: text => <a href="javascript:;">{text}</a>,
      },{
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        // render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
      },{
        title: '权限',
        dataIndex: 'token',
        key: 'token',
        render: (text, index) => <InputNumber min={0} defaultValue={text} />
      }, {
        title: '操作',
        key: 'action',
        render: index => (
          <span>
            <Button type="danger" ghost onClick={(index) => this.deleteUser(index)}>删除</Button>
            <Divider type="vertical" />
            <Button type="primary" ghost onClick={(index) => this.changeUser(index)}>修改</Button>
          </span>
        ),
      }];

    return (  
      <div>
        <Header />
            <div className="container">
                <Table columns={columns} dataSource={this.state.data} />
            </div>
        <Bottom />
      </div>
    )
  }
}
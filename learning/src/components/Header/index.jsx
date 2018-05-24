import React, { Component } from 'react';
import './index.css';
import { Button, Modal, Input, Icon, message, Avatar, Popover } from 'antd';
// import $hxPost from '../../utils/request';
import { Link } from 'react-router-dom'
import { setMID, setToken, getTokenParams, setMEMBER_INFO, logOut } from '../../utils/index';
import { $register, $login } from '../../services/index';

export default class Header extends React.Component {
  constructor(props) {
      super(props);
      this.loginOk = this.loginOk.bind(this);
      this.registerOk = this.registerOk.bind(this);
  
      this.state = {
        loginModal: false,
        phoneNumber: '',
        password: '',
        onRegister: false,
        isLogin: false,
        user: {},
      }
    }
  
    componentDidMount() {
      const msg = getTokenParams();
      if (msg && msg.member_info) {
        this.setState({
          isLogin: true,
          user: msg.member_info
        })
      }
    }

    componentWillReceiveProps(nextProps) {
      
    }
  
    onLogin = () => {
      this.setState({
        loginModal: true,
        onRegister: false,
      })
    }
  
    onRegister = () => {
      this.setState({
        onRegister: true,
        loginModal: true,
      })
    }
  
    async loginOk() {
      const { phoneNumber, password } = this.state;
      if (phoneNumber === '' || password === '') {
        message.error('请输入正确的手机号或密码');
        return;
      }
  
      const opts = {
        phoneNumber,
        password,
      }
  
      const respData = await $login(opts);
  
      if (respData.ret > 0) {
        message.success(`欢迎你：${respData.data.user.name}`, 2);
        setMID(respData.data.user._id);
        setToken(respData.data.user.token);
        setMEMBER_INFO(JSON.stringify(respData.data.user));
        
        this.setState({
          isLogin: true,
          loginModal: false,
          user: respData.data.user
        })
      } else {
      }
    }
  
    async registerOk() {
      const { phoneNumber, password } = this.state;
      if (phoneNumber === '' || password === '') {
        message.error('请输入正确的手机号或密码');
        return;
      }
  
      const opts = {
        phoneNumber,
        password,
      }
  
      const respData = await $register(opts);
  
      if (respData.ret > 0) {
        message.success(`欢迎你：${respData.data.user.name}`, 2);
        setMID(respData.data.user._id);
        setToken(respData.data.user.token);
        setMEMBER_INFO(JSON.stringify(respData.data.user));
        this.setState({
          isLogin: true,
          loginModal: false,
          user: respData.data.user
        })
      } else {
      }
    }
    
    loginCancel = () => {
      this.setState({
        loginModal: false,
      })
    }
  
    passwordOnChange = (e) => {
      this.setState({
        password: e.target.value,
      })
    }
  
    phoneNumberOnChange = (e) => {
      this.setState({
        phoneNumber: e.target.value,
      })
    }

    onloginOut = () => {
      logOut(true);
    }

    render() {
      const { loginModal, onRegister, user } = this.state;

      const inputStyle = {
        marginTop: 10,
        marginBottom: 10
      }

      const PopoverContent = (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Button type="primary" style={{margin: 5}} ghost onClick={this.toUserDetail}>个人中心<Icon type="user" /></Button>
          {
            user.token && user.token > 1 &&
            <div>
              {/* <Link to="/course/add"><Button type="primary" style={{margin: 5}} ghost >添加课程</Button></Link> */}
              <Link to="/chapter/add"><Button type="primary" style={{margin: 5}} ghost >添加章节</Button></Link>
              <Link to="/users/manage"><Button type="primary" style={{margin: 5}} ghost >用户管理</Button></Link>
            </div>
          }
           <Link to="/course/c/learning"><Button type="primary" style={{margin: 5}} ghost >在线学习</Button></Link>
          <Link to="/forum/new"><Button type="primary" style={{margin: 5}} ghost >新建文章</Button></Link>
          <Button type="danger" style={{margin: 5}} ghost onClick={this.onloginOut}>退出登陆<Icon type="close" /></Button>
        </div>
      )
      return (
        <div>
          <div className="header">
          {
            !this.state.isLogin &&
            <div>
              <Button type="primary" ghost style={{ margin: 5 }} onClick={this.onLogin}>登陆</Button>
              <Button type="primary" ghost style={{ margin: 5 }} onClick={this.onRegister}>注册</Button>
              <Modal
                  visible={loginModal}
                  title={onRegister ? '快速注册' : '登陆'}
                  onOk={onRegister ? this.registerOk : this.loginOk}
                  onCancel={this.loginCancel}
                  >
                  <div>
                  <Input style={inputStyle} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" onChange={this.phoneNumberOnChange} placeholder="请输入登陆手机号" />
                  </div>
                  <div>
                  <Input 
                      type="password" 
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      style={inputStyle} 
                      size="large" 
                      onChange={this.passwordOnChange} 
                      placeholder="请输入密码" />
                  </div>
              </Modal>
            </div>
          }

          {
            this.state.isLogin && 
            <div style={{margin: '5px 20px'}}>
              <Popover content={PopoverContent} placement="bottomLeft">
                {
                  this.state.user.name ?
                  <div>
                    <Avatar src={this.state.user.avatar} />
                  </div> :
                  <Avatar icon="user" />
                }
              </Popover>
            </div>
          }
          </div>
        </div>
        )
    }
}
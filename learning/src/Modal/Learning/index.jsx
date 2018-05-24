import React, { Component } from 'react';
import Header from '../../components/Header';
import { Menu, Icon } from 'antd';
import HXVideo from '../../components/HXVideo';
import JiaoCai from '../../components/JiaoCai';
import Pdf2 from '../../components/Pdf2';
import Forum from '../Forum';
import './index.css';

export default class Learning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'video',
        }
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <div>
                <Header />
                <div>
                    <Menu selectedKeys={[this.state.current]} onClick={this.handleClick} mode="horizontal">
                        <Menu.Item key="video">
                            <Icon type="bars" />课件
                        </Menu.Item>
                        <Menu.Item key="pdf">
                            <Icon type="file-pdf" />教材
                        </Menu.Item>
                        <Menu.Item key="ans">
                            <Icon type="file-pdf" /> 习题解答
                        </Menu.Item>
                        <Menu.Item key="forum">
                            <Icon type="team" />讨论区
                        </Menu.Item>
                    </Menu>
                </div>
                <div>
                  {
                    this.state.current === 'video' &&
                    <HXVideo />
                  } 
                  {
                    this.state.current === 'pdf' &&
                    <JiaoCai />
                  }    
                                    {
                    this.state.current === 'ans' &&
                    <Pdf2 />
                  }
                  {
                    this.state.current === 'forum' && 
                    <Forum />
                  }            
                </div>
            </div>
        )
    }
}
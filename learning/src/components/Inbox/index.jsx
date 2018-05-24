import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './index.css';

export default class Inbox extends Component {
  render() {
    return (  
      <div className="container">
        <div className="main">
          <Link to="/course/c/learning">
            <h1>程序设计基础在线学习</h1>
            <h5>兴趣是最好的老师</h5>
          </Link>
        </div>
      </div>
    )
  }
}
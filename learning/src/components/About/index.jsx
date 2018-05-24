import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Inbox extends Component {
  render() {
    return (  
        <div>
        <h1>about</h1>
        <ul>
          <li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">repos</Link></li>
          </li>
        </ul>
      </div>
    )
  }
}
import React, { Component } from 'react';
import Inbox from '../../components/Inbox';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';

export default class Home extends Component {
  render() {
    return (  
      <div>
        <Header />
        <Inbox />
        <Bottom />
      </div>
    )
  }
}
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Inbox from './components/Inbox';
import Home from './Modal/Home';
import About from './components/About';
import Errors from './Modal/Errors';
import Chapter from './Modal/Chapter';
import Users from './Modal/Users';
import Learning from './Modal/Learning';
import NewForum from './Modal/NewForum';
import ForumDetail from './Modal/ForumDetail';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path="/repos" component={Inbox}/>
        <Route path="/about" component={About}/>
        <Route path="/chapter/add" component={Chapter}/>
        <Route path="/users/manage" component={Users}/>
        <Route path="/course/c/learning" component={Learning}/>
        <Route path="/forum/new" component={NewForum}/>
        <Route path="/forum/detail/:id" component={ForumDetail}/>
        <Route component={Errors}/>
      </Switch>
    );
  }
}

export default App;

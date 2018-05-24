'use strict'

var xss = require('xss')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var uuid = require('uuid')
var md5 = require('md5')
var _ = require('underscore');

// 用户注册
exports.signup = function *(next) {
  let { phoneNumber, password } = this.request.body;

  var user = yield User.findOne({
    phoneNumber: phoneNumber
  }).exec()

  if (!user) {
    user = new User({
      name: '学生' + uuid.v4().slice(0,5),
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      phoneNumber: phoneNumber,
      password: md5(password),
      token: 1,
    })
  } else {
    this.body = {
      ret: -1,
      msg: '该手机号已被注册',
      data: {}
    }
    return next
  }

  try {
    user = yield user.save()
  }
  catch (e) {
    this.body = {
      ret: -1,
      msg: '创建用户失败',
      data: {}
    }

    return next
  }

  this.session = this.session || {};
  this.session.user = user;
  this.body = {
    ret: 1,
    data: {
      user,
    }
  }
}

// 用户登录
exports.login = function *(next) {
  const { phoneNumber, password, remember } = this.request.body;

  var user = yield User.findOne({
    phoneNumber: phoneNumber
  }).exec()

  if(!user) {
    this.body = {
      ret: -1,
      msg: '此用户不存在',
    }
  } else {
      if(user.password === md5(password)) {
        this.session = this.session || {};
        this.session.user = user;
        this.body = {
          ret: 1,
          msg: '登陆成功',
          data: {
            user
          }
        }
      } else {
        this.body = {
          ret: -1,
          msg: '密码错误'
        }
      }
  }
}

// 用户更新状态
exports.update = function *(next) {
  var body = this.request.body
  var user = this.session.user
  console.log('session', user)
  var fields = 'avatar,gender,age,name,token'.split(',')

  fields.forEach(function(field) {
    if (body[field]) {
      user[field] = xss(body[field].trim())
    }
  })

  // user = yield user.save()
  user = yield User.findByIdAndUpdate(user.id, user, (err, user) => {
    if (err) {
      console.log(err)
    }
    if (user) {
      this.body = {
        ret: -1,
        data: {
          user
        }
      }
    } else {
      this.body = {
        ret: -1,
        msg: '更新失败',
      }
    }
  })
}

exports.get = function *(next) {
  const users = yield User.find().exec();
  if (users) {
    this.body = {
      ret: 1,
      msg: '成功',
      data: {
        users
      }
    }
  }
}

exports.remove = function *(next) {
  const { user_id } = this.request.body;
  User.findByIdAndRemove(user_id, (err, user) => {
    if (err) {
      console.log(err)
    }
    if (user) {
      this.body = {
        ret: 1,
        data: {
          user
        }
      }
    } else {
      this.body = {
        ret: -1,
        msg: '删除失败',
      }
    }
  })
}


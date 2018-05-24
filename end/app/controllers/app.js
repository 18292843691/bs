'use strict'

var mongoose = require('mongoose')
var uuid = require('uuid')
var User = mongoose.model('User')

exports.hasBody = function *(next) {
  var body = this.request.body || {}

  if (Object.keys(body).length === 0) {
    this.body = {
      ret: -1,
      msg: '是不是漏掉什么了'
    }

    return next
  }

  yield next
}

// exports.hasToken = function *(next) {
//   var {phoneNumber, token} = this.request.body;

//   if (!token) {
//     this.body = {
//       ret: -1,
//       msg: '请登陆后操作',
//     }

//     return next
//   }

//   this.session = this.session || {}
//   this.session.user = user

//   console.log('hasToken', this.session, this.cookie)

//   yield next
// }

exports.tokenOne = function *(next) {
  var {token} = this.request.body;
  if(token < 0) {
    this.body = {
      ret: -1,
      msg: '请登陆后操作',
    }
  }
  yield next
}


exports.tokenTen = function *(next) {
  var {token} = this.request.body;
  if(token < 10) {
    this.body = {
      ret: -1,
      msg: '用户权限不足',
    }
  }
  yield next
}

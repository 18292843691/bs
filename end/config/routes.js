'use strict'

var Router = require('koa-router')
var User = require('../app/controllers/user')
var App = require('../app/controllers/app')
const Course = require('../app/controllers/course')
const Chapter = require('../app/controllers/chapter')
const Comments = require('../app/controllers/comment')
const Forum = require('../app/controllers/forum')

module.exports = function() {
  var router = new Router({
    prefix: '/api'
  })

  // user
  router.post('/hx/user/signup', User.signup)
  router.post('/hx/user/login', User.login)
  router.post('/hx/user/get', User.get)
  router.post('/hx/user/update', App.tokenTen, User.update)
  router.post('/hx/user/delete', App.tokenTen, User.remove)

  //course
  router.post('/hx/course/add', Course.add)
  router.post('/hx/course/get', Course.get)

  //chapter
  router.post('/hx/chapter/add', App.tokenTen, Chapter.add)
  router.post('/hx/chapter/find', Chapter.find)
  router.post('/hx/chapter/delete', App.tokenTen, Chapter.delete)

  //comments
  router.post('/hx/chapter/comments/get',  Comments.findChapter)
  router.post('/hx/chapter/comments/add', App.tokenOne, Comments.saveChapter)

  router.post('/hx/forum/comments/get', App.tokenOne, Comments.findForum)
  router.post('/hx/forum/comments/add', App.tokenOne, Comments.saveForum)

  // forum
  router.post('/hx/forum/get', Forum.get)
  router.post('/hx/forum/add', App.tokenOne, Forum.add)
  router.post('/hx/forum/search', Forum.search)
  router.post('/hx/forum/delete', App.tokenOne, Forum.delete)

  return router
}




'use strict'

var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')
var db = 'mongodb://localhost/learning'

mongoose.Promise = require('bluebird')
mongoose.connect(db)

var models_path = path.join(__dirname, '/app/models')

var walk = function(modelPath) {
  fs
    .readdirSync(modelPath)
    .forEach(function(file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}

walk(models_path)

var koa = require('koa')
var logger = require('koa-logger')
var session = require('koa-session')
var bodyParser = require('koa-bodyparser')
// const convert = require('koa-convert')
// const body = require('koa-json-body')
var cors = require('koa-cors');
var app = koa()

// app.use(body())

app.keys = ['hexin']
app.use(cors())
app.use(logger())
app.use(session(app))
app.use(bodyParser())

var router = require('./config/routes')()

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(1234)
console.log('Listening: 1234')

'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CourseSchema = new Schema({
    subject: {
        type: String,
        default: '程序设计基础',
    },
    chapter: [{
        type: ObjectId,
        ref: 'Chapter',
    }],
    optUser: {
      type: ObjectId,
      ref: 'User', 
    },
    desc: String,
    meta: {
      createAt: {
        type: Date,
        dafault: Date.now()
      },
      updateAt: {
        type: Date,
        dafault: Date.now()
      }
    }
})

CourseSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

module.exports = mongoose.model('Course', CourseSchema)
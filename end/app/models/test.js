'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var TestSchema = new Schema({
    course: {
        type: ObjectId,
        ref: 'Course',
    },
    title: String,
    desc: String,
    chapter: {
        type: ObjectId,
        ref:'Chapter',
    },
    answer:{
        type: String,
    },
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

TestSchema.pre('save', function(next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
      this.meta.updateAt = Date.now()
    }
  
    next()
  })
  
  module.exports = mongoose.model('Test', TestSchema)
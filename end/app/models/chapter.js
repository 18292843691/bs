'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ChapterSchema = new Schema({
    course: {
        type: ObjectId,
        ref: 'Course',
    },
    name: String,
    title: String,
    videoUrl: String,
    desc: String,
    more: String,
    comment: {
        type: ObjectId,
        ref:'Comment',
    },
    test: [{
        type: ObjectId,
        ref: 'Test',
    }],
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

ChapterSchema.pre('save', function(next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
      this.meta.updateAt = Date.now()
    }
  
    next()
  })
  
  module.exports = mongoose.model('Chapter', ChapterSchema)
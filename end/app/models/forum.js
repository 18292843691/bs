'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ForumSchema = new Schema({
    title: String,
    content: String,
    kind: String,
    user: {type: ObjectId, ref: 'User'},
    comment: [{
        type: ObjectId,
        ref:'Comment',
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

ForumSchema.pre('save', function(next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
      this.meta.updateAt = Date.now()
    }
  
    next()
  })
  
  module.exports = mongoose.model('Forum', ForumSchema)
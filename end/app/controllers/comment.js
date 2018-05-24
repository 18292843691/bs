'use strict'

var mongoose = require('mongoose')
var Comment = mongoose.model('Comment')
var Chapter = mongoose.model('Chapter')
const Forum = mongoose.model('Forum')

var userFields = [
  'avatar',
  'name',
  'gender',
  'age',
]

exports.findChapter = function *(next) {
  var id = this.request.body.id

  if (!id) {
    this.body = {
      ret: -1,
      err: 'id 不能为空'
    }

    return next
  }

  var queryArray = [
    Comment.find({
      chapter: id
    })
    .populate('replyBy', userFields.join(' '))
    .populate('replyTo', userFields.join(' '))
    .sort({
      'meta.createAt': -1
    })
    .exec(),
    Comment.count({chapter: id}).exec()
  ]

  var data = yield queryArray

  this.body = {
    ret: 1,
    data: data[0],
    total: data[1]
  }
}

exports.saveChapter = function *(next) {
  var commentData = this.request.body
  var chapter = yield Chapter.findOne({
    _id: commentData.chapter
  })
  .exec()

  if (!chapter) {
    this.body = {
      ret: -1,
      err: '章节出错'
    }

    return next
  }

  var comment = new Comment({
    chapter: chapter._id,
    replyBy: commentData.cid,
    replyTo: commentData.tid ? commentData.tid : commentData.cid,
    content: commentData.content
  })

  comment = yield comment.save()

  this.body = {
    ret: 1,
    data: [comment]
  }
}

// forum
exports.findForum = function *(next) {
  var id = this.request.body.id;

  if (!id) {
    this.body = {
      ret: -1,
      err: 'id 不能为空'
    }

    return next
  }

  var queryArray = [
    Comment.find({
      forum: id
    })
    .populate('replyBy', userFields.join(' '))
    .populate('replyTo', userFields.join(' '))
    .sort({
      'meta.createAt': -1
    })
    .exec(),
    Forum.count({forum: id}).exec()
  ]

  var data = yield queryArray

  this.body = {
    ret: 1,
    data: data[0],
    total: data[1]
  }
}

exports.saveForum = function *(next) {
  var commentData = this.request.body
  console.log(commentData)
  var forum = yield Forum.findOne({
    _id: commentData.forum
  })
  .exec()

  if (!forum) {
    this.body = {
      ret: -1,
      err: '讨论区出错'
    }

    return next
  }

  var comment

  comment = new Comment({
    forum: forum._id,
    replyBy: commentData.cid,
    replyTo: commentData.tid ? commentData.tid : commentData.cid,
    content: commentData.content
  })

  comment = yield comment.save()

  this.body = {
    ret: 1,
    data: [comment]
  }
  
}
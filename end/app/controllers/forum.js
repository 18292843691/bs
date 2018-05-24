const xss = require('xss')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Chapter = mongoose.model('Chapter')
const Course = mongoose.model('Course')
const Forum = mongoose.model('Forum');

exports.add = function *(next) {
    const { title, content, kind, cid } = this.request.body;

    var forum = new Forum({
        title,
        content,
        user: cid,
        kind,
    });

    try {
        forum = yield forum.save();
    } catch (e) {
        console.log(e)
        this.body = {
            ret: -1,
            msg: '创建失败',
        }
        return next
    }

    this.body = {
        ret: 1,
        msg: '创建成功',
        data: {
            forum
        }
    }
}

exports.get = function *(next) {
    const forum = yield Forum.find().exec();

    this.body = {
        ret: 1,
        data: {
            forum
        }
    }
}

exports.search = function *() {
    const { id } = this.request.body;
    yield Forum.findById({_id: id}, (err, forum) => {
        if (err) {
            console.log(err)
        } else {
            this.body = {
                ret: 1,
                data: {
                    forum
                }
            }
        }
    })
}

exports.delete = function *(next) {
    const { id } = this.request.body;
    const forum = yield Forum.findOneAndRemove({_id: id}, (err, forum) => {
        if (err) {
            console.log(err);
        }

        this.body = {
            ret: 1,
            msg: '删除成功',
            data: {
                forum
            }
        }
    })
}

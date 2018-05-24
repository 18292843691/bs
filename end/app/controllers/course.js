const xss = require('xss')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Chapter = mongoose.model('Chapter')
const Course = mongoose.model('Course')

exports.add = function *(next) {
    const { subject, desc, optUser, chapter } = this.request.body;

    var user = yield User.findOne({
        phoneNumber: optUser
    }).exec()

    var course = new Course({
        subject,
        desc,
        optUser: user,
        chapter,
    });

    try {
        course = yield course.save();
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
            course
        }
    }
}

exports.get = function *(next) {
    const course = yield Course.findOne({subject: '程序设计基础'}, (err, course) => {
        if (err) {
            console.log(err);
        }

        this.body = {
            ret: 1,
            data: {
                course
            }
        }
    })
}

exports.delete = function *(next) {
    const { subject } = this.request.body;
    const course = yield Course.findOneAndDelete({subject: subject}, (err, course) => {
        if (err) {
            console.log(err);
        }

        this.body = {
            ret: 1,
            msg: '删除成功',
            data: {
                course
            }
        }
    })
}

const xss = require('xss')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Chapter = mongoose.model('Chapter')
const Course = mongoose.model('Course')

exports.add = function *(next) {
    const { name, desc, test, videoUrl, title, more } = this.request.body;
    var course = yield Course.findOne({
        subject: '程序设计基础'
    }).exec()

    console.log(course)
    var chapter = new Chapter({
        name,
        desc,
        videoUrl,
        test,
        title,
        more,
        course: course._id,
    })

    try {
        chapter = yield chapter.save();
    } catch (e) {
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
            chapter
        }
    }
}

exports.find = function *(next) {
    var chapter = yield Chapter.find()
                                .sort('name')
                                .exec();

    this.body = {
        ret: 1,
        data: {
            chapter
        }
    }
}


exports.delete = function *(next) {
    const { id } = this.request.body;

    if (id) {
        var chapter = yield Chapter.findByIdAndRemove({
            _id: id,
        }, (err, chapter) => {
            if (err) {
                console.log(err);
            } else {
                this.body = {
                    ret: 1,
                    msg: '删除成功',
                }
            }
        })
    } else {
        this.body = {
            ret: -1,
            msg: '删除失败，id 不存在',
        }
    }

}




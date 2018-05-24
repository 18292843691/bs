import React from 'react';
import{ $fetchForum, $fetchForumComment, $submitForumComment, $fetchForumDetail } from '../../services';
import { getTokenParams } from '../../utils/index';
import { Input, message, Button } from 'antd';
import moment from 'moment';
import Comment from '../../components/Comment';
import Header from '../../components/Header';
import './index.css';

const { TextArea } = Input;

export default class ForumDetail extends React.Component {
    constructor(props) {
        super(props);
        this.textarea = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            comment: [],
            forum: {},
            content: '',
            time: '',
            tid: '',
        }
    }

    componentDidMount() {
        this.fetchData();
        this.fetchComment();
    }

    componentWillReceiveProps(nextProps) {
        // this.state.comment = nextProps;
        console.log(nextProps);
    }

    async fetchData() {
        const id = this.props.match.params.id;
        const respData = await $fetchForumDetail({id: id});
        if (respData.ret > 0) {
            this.setState({
                forum: respData.data.forum || {},
                time: respData.data.forum.meta.updateAt,
            })
        }
    }

    async fetchComment() {
        const id = this.props.match.params.id;
        const respData = await $fetchForumComment({id: id});
        if (respData.ret > 0) {
            this.setState({
                comment: respData.data || [],
            })
        }
    }

    async handleSubmit() {
        const { content, tid, forum } = this.state;
        const user = getTokenParams();
        if (user && user.token > 0) {
            const opts = {
                forum: forum._id,
                cid: user.member_info._id,
                content,
            }
            if(tid) {
                opts.tid = tid;
            }
            const data = await $submitForumComment(opts);
            if (data.ret > 0) {
                message.success('评论成功', 2);
               this.setState({
                   content: '',
               }, () => {
                   this.fetchComment();
               })
            }
        } else {
            message.error('请登录后操作', 2)
        }
    }

    replyTo = (user) => {
        this.textarea.current.focus();
        this.setState({
            content: '@' + user.name + ' ',
            tid: user._id,
        }, () => {
            console.log(this.state.tid)
        })
    }

    commentChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    render() {
        const { forum, comment, content, time } = this.state;

        return (
            <div>
                <Header />
                {
                    // this.state.forum.length > 0 &&  
                    <div className="forumDetail">
                        <h1 className="forumDEtail-title">{forum.title}</h1>
                        <div>
                            <span className="forumDetail-kind">{forum.kind}</span> 
                            <span className="forumDetail-time">{moment(time).format('lll')}</span>
                        </div>
                        <div className="forumDetail-content">{forum.content}</div>
                    </div>
                }
                <div className="commentDetail">
                    <span style={{display: 'block', margin: 5}}>评论：</span>
                    <div>
                        <TextArea autosize={{minRows: 3, maxRows: 6}} ref={this.textarea} value={content} onChange={this.commentChange} placeholder="请输入评论"></TextArea>
                        <Button type="primary" style={{width: 100, marginTop: 10}} onClick={this.handleSubmit} >提交</Button>
                    </div>
                    {
                        this.state.comment && this.state.comment.map((v, k) => <Comment data={v} key={k} replyTo={this.replyTo} canReply={true} />)
                    }
                </div>
            </div>
        )
    }
}
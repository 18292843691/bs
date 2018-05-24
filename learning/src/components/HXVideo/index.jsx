import React from 'react';
import { Menu, Icon, Input, Avatar, Divider, Button, message } from 'antd';
import { $fetchChapter, $submitComment, $fetchChapterComment } from '../../services';
import { getTokenParams } from '../../utils/index';
import Comment from '../Comment';
import './index.css';
import Column from 'antd/lib/table/Column';

const { TextArea } = Input;

export default class Learning extends React.Component {
    constructor(props) {
        super(props);
        document.title = "程序设计基础在线学习-视频学习";
        this.textarea = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.fetchComment = this.fetchComment.bind(this);
        this.renderMore = this.renderMore.bind(this);
        this.init(props);
    }

    init = (props) => {
        this.state = {
            chapter: props.content || [],
            current: '1',
            currentChapter: {},
            content: props.content || '',
            tid: '',
            comment: props.comment || [],
            videoCurrent: 'video',
        }
    }

    handleClick = (e) => {
        const { chapter } = this.state;
        this.setState({
            current: e.key,
            currentChapter: chapter[e.key - 1],
            videoCurrent: 'video',
        }, () => {
            this.fetchComment();
        });
    }

    handleVideoClick = (e) => {
        if (e.key === 'pre') {
            this.setState({
                videoCurrent: 'video',
            })
        } else if (e.key === 'next') {
            this.setState({
                videoCurrent: 'text',
            })
        } else {
            this.setState({
                videoCurrent: e.key,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.init(nextProps);
    }

    componentDidMount() {
        this.fetchData();
    }

    commentChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    async fetchData() {
        const data = await $fetchChapter();
        if (data.ret > 0) {
            this.setState({
                chapter: data.data.chapter,
                currentChapter: data.data.chapter[this.state.current - 1] ? data.data.chapter[this.state.current - 1] : {},
            }, () => {
                this.fetchComment();
            })
        }
    }

    async fetchComment() {
        const opts = {
            id:  this.state.currentChapter._id,
        }
        const data = await $fetchChapterComment(opts);

        if (data.ret > 0) {
            this.setState({
               comment: data.data || [],
            })
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

    async handleSubmit() {
        const { content, currentChapter, tid } = this.state;
        const user = getTokenParams();
        if (user && user.token > 0) {
            const opts = {
                chapter: currentChapter._id,
                cid: user.member_info._id,
                content,
            }
            if(tid) {
                opts.tid = tid;
            }
            const data = await $submitComment(opts);
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

    renderMore() {
        let { currentChapter } = this.state;

        if (currentChapter && currentChapter.more) {
            let more = currentChapter.more.toString().split(' ');
            return more.map((v, k) => <p key={k}>{v}</p> );
        } else {
            return <a href="www.baidu.com">我自己能行</a>
        }
    }

    render() {
        const { chapter, current, videoUrl, desc, currentChapter, comment, content, videoCurrent } = this.state;
        return (
            <div style={{width: '100%', height: '100%', display: 'flex'}}>
                <Menu style={{width: 300}} selectedKeys={[this.state.current]} onClick={this.handleClick} >
                    {
                        chapter && 
                        chapter.map((v) => {
                            return <Menu.Item title={v.name} key={v.name} >
                                {v.name}. <span>{v.title}</span>
                            </Menu.Item>
                        })
                    }
                </Menu>
                <div className="videoContainer">
                    <Menu mode="horizontal" selectedKeys={[this.state.videoCurrent]} onClick={this.handleVideoClick} theme="dark"s >
                            <Menu.Item theme="light" style={{width: 30}} key="pre" title="pre">
                                <Icon type="caret-left" />
                            </Menu.Item>
                            <Menu.Item style={{width: 300}} key="video" title="video">
                                <Icon type="video-camera" /> 视频
                            </Menu.Item>
                            <Menu.Item style={{width: 300}} key="text" title="text">
                                <Icon type="file-text" /> 文档
                            </Menu.Item>
                            {/* <Menu.Item style={{width: 300}} key="test" title="test">
                                <Icon type="edit" /> 测试
                            </Menu.Item> */}
                            <Menu.Item theme="light" style={{width: 30}} key="next" title="next">
                                <Icon type="caret-right" />
                            </Menu.Item>
                    </Menu>
                    <div>
                        {
                            videoCurrent === 'video' && 
                            <div>
                                <div className="video">
                                    <video src={currentChapter.videoUrl} controls ></video>
                                </div>
                                
                                <div className="desc">
                                    <span style={{width: 200}}>课程简介：</span>
                                    <span style={{color: 'blue', textIndent: '2em'}}>{currentChapter.desc}</span>
                                </div>
                            </div>
                        }
                        {
                            videoCurrent === 'text' && 
                            <div style={{display: 'flex', paddingLeft: 50,justifyContent: 'center',  flexDirection: 'column', marginTop: 10, fontSize: 16}}>
                                {this.renderMore()}
                            </div>
                        }
                    </div>

                    <Divider />
                    <div className="comments">
                        <span style={{display: 'block', margin: 5}}>评论：</span>
                        <div>
                            <TextArea autosize={{minRows: 3, maxRows: 6}} ref={this.textarea} value={content} onChange={this.commentChange} placeholder="请输入评论"></TextArea>
                            <Button type="primary" style={{width: 100, marginTop: 10}} onClick={this.handleSubmit} >提交</Button>
                        </div>
                        {
                            this.state.comment && this.state.comment.map((v, k) => <Comment data={v} key={k} replyTo={this.replyTo} />)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
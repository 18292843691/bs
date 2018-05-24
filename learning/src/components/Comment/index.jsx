import React from 'react';
import { Input, Button, Avatar } from 'antd';
import { getTokenParams } from '../../utils/index';
import moment from 'moment';
import PropTypes from 'prop-types';
import './index.css';

export default class Comment extends React.Component {
    static defaultProps = {
        canReply: false,
    }

    constructor(props) {
        super(props);
        this.replyToUser = this.replyToUser.bind(this);
        this.state = {
            user: props.data.replyBy || {},
            content: props.data.content,
            time: props.data.meta.createAt || '',
            localToken: getTokenParams().token ? getTokenParams().token : 0,
            commentTo: props.data.replyTo || {},
            canReply: props.canReply || false,
        }
    }

    replyToUser() {
        const user = this.state.user;
        this.props.replyTo(user);
    }

    render() {
        const { user, content, time, localToken, commentTo, canReply } = this.state;

        return (
            <div className="comment" >
               <Avatar src={user.avatar} />
               <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
                   <div className="name"> {user.name || '不知名的小皮'} {commentTo.name && commentTo.name !== user.name ? '回复给: ' + commentTo.name : ''}</div>
                   <div className="content">{content}</div>
                   <div className="time">
                        <div> 时间: {moment(time).format('lll')}</div>
                        {
                            (this.state.canReply || localToken > 1)  && 
                            <Button type="primary" style={{marginRight: 10}} ghost size="small" onClick={this.replyToUser} >回复</Button>
                        }                      
                    </div>                  
               </div>
               
            </div>
        )
    }
}
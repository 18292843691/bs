import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import './index.css';

export default class Post extends React.Component {

    static defaultProps = {
        data: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.renderContent = this.renderContent.bind(this);

        this.state = {
            user: props.data.user,
            time: props.data.meta.updateAt || '',
        }
    }

    renderContent() {
        const { content } = this.props.data;
        return content.toString().split(' ')[0];
    }

    froumDetail = () => {
        const { _id } = this.props.data;
        window.open(`/forum/detail/${_id}`);
    }

    render() {
        const { user, time } = this.state;
        const { title, kind } = this.props.data;
        return (
            <div className="forum">
            <div>
                {
                    user &&  <Avatar style={{margin: 5}} src={user.avatar} />
                }
            </div>
            <div className="forumMain">
                <h2 className="title" onClick={this.froumDetail}> <a>{title}</a></h2>
                <div className="forumKind"> {kind}</div>
                <div className="forumContent">
                    <div className="text">
                        {this.renderContent()}
                    </div>
                    <div className="time">
                        {moment(time).format('lll')}
                    </div>
                </div>
            </div>

            </div>
        )
    }
}
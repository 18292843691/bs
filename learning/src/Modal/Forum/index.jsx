import React from 'react';
import Post from '../../components/Post';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { $fetchForum } from '../../services';
import './index.css';

export default class Forum extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            forum: [],
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const respData = await $fetchForum();
        if(respData.ret > 0) {
            this.setState({
                forum: respData.data.forum || [],
            })
        }
    }

    render() {
        const { forum } = this.state;
        return (
            <div className="forumContainer">
                <div className="left">
                    {
                        forum.map((v, k) => <Post data={v} key={k} />)
                    }
                </div>
                <div className="right">
                    <Link to="/forum/new"> <Button type="primary">发表帖子</Button></Link>
                </div>
            </div>
        )
    }
}
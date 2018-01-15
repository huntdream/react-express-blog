import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import List from './List';
import Navigator from './Navigator';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: true,
            page: 1,
            more: true
        }
        this.fetchPosts = this.fetchPosts.bind(this);
        this.pageNavgation = this.pageNavgation.bind(this);
    }

    fetchPosts(posts) {
        fetch(`http://localhost:3000/${posts}?&page=${this.state.page}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    this.setState({
                        posts: data.poetries,
                        isLoading: false,
                        more: true
                    })
                } else {
                    this.setState({
                        page: this.state.page - 1,
                        more: false
                    })
                    return false;
                }
            }
            )
    }

    async pageNavgation(e) {
        let curPage = this.state.page;
        let direction = e.target.classList.contains('left');
        if (direction) {
            curPage = curPage != 1 ? curPage - 1 : curPage;
        } else {
            curPage += 1;
        }

        await this.setState({
            page: curPage
        });
        this.fetchPosts('poetries');
        console.log(this.state.page);
    }

    componentDidMount() {
        this.fetchPosts('poetries');
    }

    render() {
        const { posts, isLoading } = this.state;
        if (isLoading) {
            return (
                <p>Loading...</p>
            )
        }
        return (
            <div>
                <List posts={this.state.posts} />
                <Navigator onClick={this.pageNavgation} left={this.state.page === 1 && 'none'} right={this.state.more || 'none'} />
            </div>
        )
    }
}

export default Home;
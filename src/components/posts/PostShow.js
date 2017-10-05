import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { loadPosts, deletePost } from '../../reducers/post/postIndex'

class PostShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.loadPosts(id)
  }
  goRootPage = () => {
    this.props.history.push('/')
  }
  
  render() {
    const { post } = this.props
    const { id } = this.props.match.params
    if (!post) {
      return <div>Loding...</div>
    }
    return (
      <div>
        <Link to="/">Back to index</Link>
        <div>
          <Button
            onClick={() => this.props.deletePost(id, this.goRootPage)}
          >
            Delete Post
          </Button>
        </div>
        <h4>제목: {post.title}</h4>
        <h4>분류: {post.categories}</h4>
        <h4>내용</h4>
        <p>{post.content}</p>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({ post: state.dashboard.posts[ownProps.match.params.id] }),
  { loadPosts, deletePost }
)(PostShow)
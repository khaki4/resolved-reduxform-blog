import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { requestOnePost, deletePostRequest } from '../../reducers/post/domainPosts'

class PostShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.requestOnePost(id)
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
            onClick={() => this.props.deletePostRequest(id, this.goRootPage)}
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

export default withRouter(connect(
  (state, { history, match}) => {
    return ({
      post: state.dashboard.postOne,
      history,
      match,
    })
  },
  { requestOnePost, deletePostRequest }
)(PostShow))
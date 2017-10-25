import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { requestOnePost, deletePostRequest, OnePostClear } from '../../reducers/post/domainPosts'

class PostShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.requestOnePost(id)
  }
  componentWillUnmount() {
    this.props.OnePostClear()
  }
  goRootPage = () => {
    this.props.history.push('/')
  }
  testFn = () => console.log('test')
  render() {
    const { post } = this.props
    const { id } = this.props.match.params
    if (!post) {
      return <div>Loding...</div>
    }
    return (
      <div>
        {/*<Link to="/">Back to index</Link>*/}
        <a onClick={() => {
          const location = {
            pathname: '/',
            props: {
              testFn: this.goRootPage
            }
          }
          this.props.history.push(location)
        }}>Back to index</a>
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
  (state, { history, match }) => {
    return ({
      post: state.dashboard.postOne,
      history,
      match,
    })
  },
  { requestOnePost, OnePostClear, deletePostRequest }
)(PostShow))
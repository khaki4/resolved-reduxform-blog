import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import map from 'lodash/map'
import { List, Grid } from 'semantic-ui-react'
import PostCreatModal from './PostAddButton';
import PostCategories from './PostCategories'
import { loadPosts, getVisiblePosts } from '../../reducers/post/postIndex';

class PostIndex extends Component {
  componentDidMount() {
    this.props.loadPosts()
  }
  renderPosts = () => {
    const { posts } = this.props
    if (!posts) return <div>Loading...</div>
    return map(posts, post => {
      return (
        <List.Item key={post.id}>
          <List.Content>
            <Link to={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </List.Content>
        </List.Item>
      )
    })
  }
  render () {
    return (
      <div>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <h3>Post List</h3>
              <List divided verticalAlign='middle' size="large">
                {this.renderPosts()}
              </List>
              <PostCreatModal />
            </Grid.Column>
            <Grid.Column>
              <h3>Post Categories</h3>
              <PostCategories
                posts={this.props.originalPosts}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    posts: getVisiblePosts(state.dashboard.posts, ownProps.match.params.filter),
    originalPosts: state.dashboard.posts,
  }),
  { loadPosts }
)(PostIndex)
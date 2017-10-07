import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import { List } from 'semantic-ui-react'
import { getSelectedCategories } from '../../reducers/post/postIndex';


const NO_CATEGORY = '분류 없음'
const PostCategories = ({ posts }) => {
  if (!posts || (Array.isArray(posts) && posts.length < 1)) return null
  console.log('render ')
  const uniqCategories = uniq(map(posts, (post) => {
    if (!post) return NO_CATEGORY
    return post.categories
  }))
  if (!uniqCategories) return null
  return (
    <div>
      <List divided verticalAlign='middle' size="large">
      {uniqCategories.map(item => {
        return (
          <List.Item key={item}>
            <List.Content>
              <Link to={`/${item}`}>{item}</Link>
            </List.Content>
          </List.Item>
        )
      })}
      </List>
    </div>
  )
}

export default connect(
  state => ({posts: getSelectedCategories(state)})
)(PostCategories)
import { normalize, schema } from 'normalizr';
import { Reducer, Selector } from 'redux-testkit'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga';
import reducers from '../../../reducers/rootReducer'
import uut, * as fromUut from '../domainPosts'

const storeInitState = {
  "dashboard": {
    "postOne": {},
    "posts": []
  },
  "form": {},
  "ui": {
    "uiPostAddModal": {"isOpen": false}
  }
}
const initState = {
  posts: [],
  postOne: {},
}
let store = {}

beforeEach(() => {
  jest.resetAllMocks();
  const sagaMiddleware = createSagaMiddleware({ })
  store = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware)
    )
  )
});

describe('reducers/post/domainPosts', () => {
  describe('reducer test', () => {
    it('initial state를 가져야 함', () => {
      expect(uut(undefined, {})).toEqual(initState)
    });
    it('존재 하지 않는 액션을 보냈을 때 state에 영향이 없어야 한다', () => {
      expect(uut(initState, {type: 'NOT_EXISTING'})).toEqual(initState)
    })
    it('fetch된 post를 기존 state를 override해야 한다', () => {
      const posts = {id: 158114, title: "..-_-", categories: "test", content: "ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ"}
      const action = {type: fromUut.POST_LOAD, payload: posts}
      Reducer(uut).withState(initState).expect(action).toReturnState({
        ...initState,
        posts: normalize(action.payload, fromUut.postsListSchema).entities.posts
      })
    })
    it('하나의 포스트만 load 해야 한다.', () => {
      const post = {id: 3, title: 'test post one', content: 'test content'}
      const action = {type: fromUut.POST_FETCH_ONE, payload: post}
      Reducer(uut).expect(action).toReturnState({
        ...initState,
        postOne: {
          ...post,
        }
      })
    })
    it('포스트를 클리어 해야 한다.', () => {
      const action = {type: fromUut.POST_FETCH_CLEAR}
      Reducer(uut).expect(action).toReturnState(({
        ...initState,
        postOne: {}
      }))
    })
    it('addpost가 가능 해야한다', () => {
      const post = {id: 3, title: 'test post one', content: 'test content'}
      const action = {type: fromUut.POST_ADD, payload: post}
      Reducer(uut).expect(action).toReturnState({
        ...initState,
        posts: {[action.payload.id]: {...action.payload}}
      })
    })
  })

  describe('selectors test', () => {
    it('filter를 넘기지 않았을 때 현재posts를 리턴한다.', () => {
      const posts = {}
      expect(fromUut.getSelectVisiblePosts(posts, undefined)).toBe(posts)
      expect(fromUut.getSelectVisiblePosts(posts)).toBe(posts)
    })
    it('posts가 filter 되어야 한다.', () => {
      const posts = {
        1 :{id: 1, title: "헐 2..-_-", categories: "test", content: "1"},
        2 :{id: 2, title: "헐 3..-_-", categories: "test1", content: "1"},
        3 :{id: 3, title: "헐 4..-_-", categories: "test3", content: "1"},
      }
      expect(fromUut.getSelectVisiblePosts(posts, 'test')).toEqual([posts[1]])
    })
  })

  describe('flow case test', () => {
    const post = {id: 1, title: "헐 2..-_-", categories: "test", content: "1"}
    it('알수 없는 타입의 결과로 이전 스테이트를 리턴한다', () => {
      const undefinedAction = {type: 'UNDEFINED'}
      Reducer(uut).expect(undefinedAction).toReturnState({
        ...initState,
      })
    })
    it('test1의 결과로 post가 추가되어야 한다', () => {
      const action = {type: fromUut.TEST_1, payload: post}
      Reducer(uut).expect(action).toReturnState({
        ...initState,
        posts: [
          post
        ]
      })
    })
    it('test2의 결과로 post가 추가되어야 한다', () => {
      const action = {type: fromUut.TEST_2, payload: post}
      Reducer(uut).expect(action).toReturnState({
        ...initState,
        posts: [
          post
        ]
      })
    })
    it('test3의 결과로 post가 추가되어야 한다', () => {
      const action = {type: fromUut.TEST_3, payload: post}
      Reducer(uut).expect(action).toReturnState({
        ...initState,
        posts: [
          post
        ]
      })
    })
    it('test1, test2, test3의 결과로 post3개가 추가 되어야 한다', () => {
      const action1 = {type: fromUut.TEST_1, payload: post}
      const action2 = {type: fromUut.TEST_2, payload: post}
      const action3 = {type: fromUut.TEST_3, payload: post}
      const initState = store.getState()
      store.dispatch(action1)
      store.dispatch(action2)
      store.dispatch(action3)
      expect(store.getState())
        .toEqual({
          ...initState,
          dashboard: {
            ...initState.dashboard,
            posts: [
              post,
              post,
              post
            ]
          }
        })
    })
    it('store는 initstate와 같아야 한다', () => {
      expect(store.getState())
        .toEqual(storeInitState)
    })
  })
})
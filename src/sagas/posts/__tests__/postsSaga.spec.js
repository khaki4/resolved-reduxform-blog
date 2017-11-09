import uut, * as fromUut from '../postsSaga'
import { call, put, take } from 'redux-saga/effects';
import * as fromPostService from '../../../service/postService';
import * as fromDomainPosts from '../../../reducers/post/domainPosts'
import * as fromUiPostAddModal from '../../../reducers/post/uiPostAddModal'

describe('sagas/posts/postsSaga', () => {
  describe('fetchPosts task', () => {
    describe('fetchPosts watch', () => {
      const gen = fromUut.watchFetchPostsRequest()

      it('request fetchPosts', () => {
        expect(gen.next().value).toEqual(take(fromDomainPosts.POST_FETCH_REQUEST))
      })
      it('call fetchPosts saga', () => {
        expect(gen.next().value).toEqual(call(fromUut.fetchPosts))
      })
      it('fetchPosts 재요청', () => {
        expect(gen.next().value).toEqual(take(fromDomainPosts.POST_FETCH_REQUEST))
      })
      it('fetchPosts 재요청시 fetchPosts saga call 수행', () => {
        expect(gen.next().value).toEqual(call(fromUut.fetchPosts))
      })
    })
    describe('fetchposts saga', () => {
      const response = {
        data: {
          id: 158114,
          title: '헐 다지워짐..-_-',
          categories: 'test',
          content: 'ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ',
        }
      }
      it('getPosts는 call되야 한다', () => {
        const gen = fromUut.fetchPosts()
        expect(gen.next().value)
          .toEqual(call(fromPostService.getPosts))
        expect(gen.next(response).value)
          .toEqual(put(fromDomainPosts.loadPosts(response.data)))
      })
    })
  })

  describe('fetchOnePostRequest task', () => {
    const action = {
      type: fromDomainPosts.POST_FETCH_ONE_REQUEST,
      payload: "158114",
    }
    it('request fetchOnePost', () => {
      const gen = fromUut.watchFetchOnePostRequest()
      expect(gen.next().value).toEqual(take(fromDomainPosts.POST_FETCH_ONE_REQUEST))
      expect(gen.next(action).value).toEqual(call(fromUut.fetchOnePost, action))
    })
    it('fetchOnePost: 하나의 포스트를 로드해야 한다', () => {
      const gen = fromUut.fetchOnePost(action)
      expect(gen.next(action.payload).value)
        .toEqual(call(fromPostService.getOnePost, action.payload))
    })
  })

  describe('watchCreatePostRequest task', () => {
    const gen = fromUut.watchCreatePostRequest()
    const action = {
      type: fromDomainPosts.POST_CREATE_REQUEST,
      payload: {id: 158114, title: "..-_-", categories: "test", content: "ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ"},
      resetForm: () => {}
    }
    const response = {
      data: {
        id: 158114,
        title: '헐 다지워짐..-_-',
        categories: 'test',
        content: 'ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ',
      }
    }
    it('request createPostRequest', () => {
      expect(gen.next().value).toEqual(take(fromDomainPosts.POST_CREATE_REQUEST))
    })
    it('call createNewPost saga', () => {
      expect(gen.next(action).value).toEqual(call(fromUut.createNewPost, action))
    })
    it('작성된 post로 새로운 post를 추가 하고 폼이 리셋되어야 한다', () => {
      const action = {
        type: fromDomainPosts.POST_CREATE_REQUEST,
        post: {id: 158114, title: "..-_-", categories: "test", content: "ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ"},
        resetForm: () => {console.log('reset form')}
      }
      const gen = fromUut.createNewPost(action)
      expect(gen.next(action.post).value)
        .toEqual(call(fromPostService.createPost, action.post))
      expect(gen.next(response).value)
        .toEqual(put(fromDomainPosts.addPost(response.data)))
      expect(gen.next().value)
        .toEqual(action.resetForm())
      expect(gen.next().value)
        .toEqual(put(fromUiPostAddModal.changeModalWindow(false)))
      expect(gen.next().value)
        .toEqual(action.resetForm())
      expect(gen.next().done)
        .toBe(true)
    })
  })

  describe('watchDeletePostRequest task', () => {
    const gen = fromUut.watchDeletePostRequest()
    it('request deletePOstRequest', () => {
      expect(gen.next().value).toEqual(take(fromDomainPosts.POST_DELETE_REQUEST))
    })
    it('call deletePost saga', () => {
      const action = {
        type: 'test',
        paylad: 'test'
      }
      expect(gen.next(action).value).toEqual(call(fromUut.deletePost, action))
    })
  })

  describe('deletePost: 지정된 post를 삭제 해야 한다', () => {
    const action = { type: fromDomainPosts.POST_DELETE_REQUEST, payload: 1, goRootPage: () => {console.log('go root page!!')}}
    const gen = fromUut.deletePost(action)
    it('destroypost 요청', () => {
      expect(gen.next().value)
        .toEqual(call(fromPostService.destoryPost, action.payload))
    })
    it('goRootPage saga call', () => {
      expect(gen.next(action).value)
        .toEqual(call(fromUut.goRootPage, action.goRootPage))
    })
  })
  describe('goRootPage saga는 call되면 pram으로 전달 받은 action을 실행해야 한다', () => {
    it('action이 실행 되야 한다', () => {
      const action = jest.fn()
      const gen = fromUut.goRootPage(action)
      expect(gen.next(action).value)
        .toEqual(call(action))
    })
  })
})

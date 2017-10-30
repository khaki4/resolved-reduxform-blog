import * as uut from '../postService';
global.fetch = require('jest-fetch-mock');

describe.only('service/postService', () => {

  beforeEach(() => {
    jest.resetAllMocks()
  })
  const data = [ { id: 158994,
    title: 'qwerqwer',
    categories: '분류 없음',
    content: 'qwerqwer' },
    { id: 158993,
      title: 'werwqer',
      categories: 'test',
      content: 'qwerqwer' },
    { id: 158114,
      title: '헐 다지워짐..-_-',
      categories: 'test',
      content: 'ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ' } ]
  it('초기 값을 fetch해야 한다', async () => {
    fetch.mockResponseOnce(JSON.stringify(data))
    const response = await uut.getPosts()
    expect(response.data).toEqual(data)
  })
})
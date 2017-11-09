import R from 'ramda';
import * as uut from '../postService';
global.fetch = require('jest-fetch-mock');

describe('service/postService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const data = [
    {
      id: 158994,
      title: 'qwerqwer',
      categories: '분류 없음',
      content: 'qwerqwer'
    },
    {
      id: 158993,
      title: 'werwqer',
      categories: 'test',
      content: 'qwerqwer'
    },
    {
      id: 158114,
      title: '헐 다지워짐..-_-',
      categories: 'test',
      content: 'ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ'
    }
  ];
  it.skip('초기 값을 fetch해야 한다', async () => {
    const response = await uut.getPosts();
    const responseData = response.data
    const hasIdInProps = R.compose(
      R.map(R.prop('id')),
      R.type
    )(data)
    const checkType = R.type
    const pred = R.where({id: R.equals(R.type, "Number")})
    expect(pred(responseData)).toEqual(true);
  });
});

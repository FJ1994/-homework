import mock from 'mockjs'
// 这个一个获取URL参数的方法
import { getParams } from './utils'

const Random = mock.Random

mock.mock('http://your.domain.com/test', {
  'users|1-10': [{
    'id|+1': 1,
    'name': '@cname',
    'city': '@city',
    'image': '@image'
  }]
})

mock.mock(RegExp('http://your.domain.com/lists' + '.*'), 'get', (options) =>{
  // 获取URL
  const url = options.url
  // 获取数量
  const num = getParams(url, 'num')
  // 获取页数
  // const page = getParams(options.url, 'page')
  let mockInfo = {
    'status': 0,
    'msg': '返回Mock数据'
  }
  mockInfo["data|" + num] = [
    {
      "tid|+1": 1,
      "title": Random.paragraph(3),
      "catalog": "index",
      "fav": 20,
      "created": /^[0-9]{9}$/,
      "isEnd": "0",
      "answer": /([1-9]?\d|100)$/,
      "user": {
        "avatar": "@image",
        "name": "@cname",
        "isVip": "1",
        "level": /^(10|[1-9])$/
      }
    }
  ]
  return mock.mock(mockInfo)
})

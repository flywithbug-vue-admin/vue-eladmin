import client from '../utils/fetch'

export function getModel(id) {
  return client({
    url: '/tools/model?id='+ id,
    method: 'get',
  })
}

export function queryModel(name) {
  return client({
    url: '/tools/model/list?name='+ name,
    method: 'get',
  })
}


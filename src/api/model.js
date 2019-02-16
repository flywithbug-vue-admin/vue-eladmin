import client from '../utils/fetch'

export function getModel(id) {
  return client({
    url: '/tools/model?id='+ id,
    method: 'get', })
}


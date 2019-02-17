import client from '../utils/fetch'

export function getModel(id) {
  return client({
    url: '/tools/model?id='+ id,
    method: 'get',
  })
}

export function queryModels(query) {
  return client({
    url: '/tools/model/list',
    method: 'get',
    params:query
  })
}



export function edit(param) {
  return client({
    url: '/tools/model',
    method: 'put',
    data:param
  })
}



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

export function model_apps(query) {
  return client({
    url: '/tools/model_apps',
    method: 'get',
    params:query
  })
}

export function modifyAppModelVersion(data) {
  return client({
    url: '/tools/model_app/version',
    method: 'put',
    data:data
  })
}

export function removeAppModelRelation(data) {
  return client({
    url: '/tools/model_app',
    method: 'Delete',
    data:data
  })
}






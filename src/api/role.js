import client from '../utils/fetch'
import config from '../config'

// 获取所有的Role
export function getRoleTree() {
  return client({
    url: config.PathRoleTree,
    method: 'get'
  })
}

export function add(data) {
  return client({
    url: '/role',
    method: 'post',
    data
  })
}

export function del(id) {
  const data = {
    id
  }
  return client({
    url: '/role',
    method: 'delete',
    data
  })
}

export function edit(data) {
  return client({
    url: '/role',
    method: 'put',
    data
  })
}

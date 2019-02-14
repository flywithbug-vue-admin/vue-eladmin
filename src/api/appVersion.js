import client from '../utils/fetch'

export function list(query) {
  return client({
    url: '/app/version/list',
    method: 'get',
    params: query
  })
}
/*
para:
{
	"app_id":10001,
	"version":"1.0.2",
	"parent_version":"1.0.0",
	"platform":["iOS","Android"],
	"approval_time":1546244371,
	"lock_time":1546444371,
	"gray_time":1546744371
}
*/
export function add(app_id, version, parent_version, platform, approval_time, lock_time, gray_time) {
  const data = {
    app_id,
    version,
    parent_version,
    platform,
    approval_time,
    lock_time,
    gray_time
  }
  return client({
    url: '/app/version',
    method: 'post',
    data
  })
}
export function edit(data) {
  return client({
    url: '/app/version',
    method: 'put',
    data
  })
}

export function del(id) {
  const data = {
    id
  }
  return client({
    url: '/app/version',
    method: 'delete',
    data
  })
}

export function editStatus(id, status) {
  const data = {
    id,
    status
  }
  console.log('editStatus', data)

  return client({
    url: '/app/version',
    method: 'put',
    data
  })
}


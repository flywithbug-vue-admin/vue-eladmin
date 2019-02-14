import client from '../utils/fetch'

export function initData(url, params) {
  return client({
    url: url,
    method: 'get',
    params
  })
}

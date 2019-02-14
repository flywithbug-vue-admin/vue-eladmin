import request from '@/utils/fetch'

export function count() {
  return request({
    url: '/visit',
    method: 'post'
  })
}

export function get() {
  return request({
    url: '/visit/info',
    method: 'get'
  })
}

export function getChartData() {
  return request({
    url: '/visit/chart',
    method: 'get'
  })
}

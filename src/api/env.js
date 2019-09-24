import request from '@/utils/request'

export function list(param) {
  return request({
    url: '/file/list',
    method: 'get',
    params: param
  })
}

export function get(param) {
  return request({
    url: '/file',
    method: 'get',
    params: param
  })
}

export function create(param) {
  return request({
    url: '/file',
    method: 'put',
    data: param
  })
}

export function update(param) {
  return request({
    url: '/file',
    data: param,
    method: 'post'
  })
}

export function remove(param) {
  return request({
    url: '/file',
    method: 'delete',
    data: param
  })
}

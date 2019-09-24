import request from '@/utils/request'

export function service() {
  return request({
    url: '/storage/services',
    method: 'get'
  })
}

export function saveService(item) {
  return request({
    url: `/storage/services/${item}`,
    method: 'post'
  })
}

export function deleteService(item) {
  return request({
    url: `/storage/services/${item}`,
    method: 'delete'
  })
}

export function env() {
  return request({
    url: '/storage/envs',
    method: 'get'
  })
}

export function saveEnv(item) {
  return request({
    url: `/storage/envs/${item}`,
    method: 'post'
  })
}

export function deleteEnv(item) {
  return request({
    url: `/storage/envs/${item}`,
    method: 'delete'
  })
}

export function label() {
  return request({
    url: '/storage/labels',
    method: 'get'
  })
}

export function saveLabel(item) {
  return request({
    url: `/storage/labels/${item}`,
    method: 'post'
  })
}

export function deleteLabel(item) {
  return request({
    url: `/storage/labels/${item}`,
    method: 'delete'
  })
}

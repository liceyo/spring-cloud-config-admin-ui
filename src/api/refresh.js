import request from '@/utils/request'

export function refresh(item) {
  return request({
    url: `/instance/${item}`,
    method: 'post'
  })
}

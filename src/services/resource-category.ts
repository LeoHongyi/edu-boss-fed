import request from '@/utils/request'

export const getResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

export function deleteCategory (id: number | string) {
  return request.delete(`/boss/resource/category/${id}`)
}

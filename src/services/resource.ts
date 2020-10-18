import request from '@/utils/request'

export const getResourcePages = (data: {
  id?: number | string;
  name?: string;
  startCreateTime?: string;
  url?: string;
  categoryId?: number | string;
  endCreateTime?: string;
  current?: number | string;
  size?: number | string;
}) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export function deleteResource (id: number | string) {
  return request.delete(`/boss/resource/${id}`)
}

export function getResource (id: number | string) {
  return request.get(`/boss/resource/${id}`)
}

export function createOrSaveResource (params: {
  id?: number;
  name: string;
  categoryId: number | undefined;
  url: string;
  description?: string;
}) {
  return request.post('/boss/resource/saveOrUpdate', params)
}

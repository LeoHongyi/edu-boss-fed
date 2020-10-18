import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string;
  password: string;
}

export const login = (form: User) => {
  return request({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: '/front/user/login',
    data: qs.stringify(form)
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
    // headers: {
    //   Authorization: store.state.user.access_token
    // }
  })
}

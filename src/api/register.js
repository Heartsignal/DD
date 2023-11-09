import request from '@/utils/request'

export function register(username, password,email,mobile) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}

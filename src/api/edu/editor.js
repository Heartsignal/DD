import request from '@/utils/request'

export default {
  submitEditor(title,article,userId) {
    return request({
      url: '/backend/publish_article',
      method: 'post',
      data: {
        title,
        article,
        userId
      }
    })
  }

}

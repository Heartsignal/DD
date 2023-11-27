import request from '@/utils/request'

export default {
  submitEditor(title,article,userId) {
    return request({
      url: '/backend/publishArticle',
      method: 'post',
      data: {
        title,
        article,
        userId
      }
    })
  }

}

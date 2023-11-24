import request from '@/utils/request'

export default {
  submitEditor(title,article) {
    return request({
      url: '/backend/publishArticle',
      method: 'post',
      data: {
        title,
        article
      }
    })
  }

}

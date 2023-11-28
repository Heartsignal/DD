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
  },
  showArticles(page){
    return request({
      url:'/backend/show_articles',
      method: 'post',
      data: {
        page:page
      }
    })
  },
  uploadPic(file){
    return request({
      url:'/backend/upload_pic',
      method:'post',
      data:{
        pic:file
      }
    })
  }

}

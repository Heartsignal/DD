import request from '@/utils/request'

export default {
  submitEditor(title,article,userId,cate) {
    return request({

      url: '/backend/publish_article',
      method: 'post',
      data: {
        title,
        article,
        userId,
        cate
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
  showOwnArticles(page,id){
    return request({
      url:'/backend/show_self_articles',
      method: 'post',
      data: {
        page:page,
        id:id
      }
    })
  },
  searchOwnArticles(userId,keyword,page,cate){
    return request({
      url:'/backend/search_article',
      method:'post',
      data:{
        user_id:userId,
        keyword:keyword,
        page:page,
        cate:cate
      }
    })
  },
  uploadPic(file){
    return request({
      url:'/backend/upload_photo',
      method:'post',
      data:file,
    })
  },
  getOneArticleById(id){
    return request({
      url:'/backend/display_article',
      method:'post',
      data:{
        id:id
      }
    })
  },
  updateArticle(id,content){
    return request({
      url:'/backend/update_article',
      method:'post',
      data:{
        id:id,
        content:content
      }
    })
  }


}

<template>
  <div>
    <div class="title-container">
      <div class="main-title">{{this.editor_title}}</div>
      <div class="subtitle">{{this.author_name}} {{this.create_time}}</div>
<!--      <div class="subtitle"></div>-->
      <div v-if="edit" class="edit-button">
        <el-button  style="background-color: rgb(48, 65, 86); color: rgb(191, 203, 217);"
                    @click="editSubmit">保存并提交</el-button>
      </div>
    </div>
    <div id="main">
      <mavon-editor v-model="editorValue" :toolbarsFlag="edit" :subfield="edit" defaultOpen="preview" >
      </mavon-editor>
    </div>
  </div>
</template>

<script>
  import editorMethods from '@/api/edu/editor'

  export default {
    name: 'index',
    props: ['edit','id','editor_title','create_time','author_name'],
    data() {
      return {
        editorValue: '### hello',
      }
    },
    created() {
      this.getOneArticleById()
    },
    methods: {
      //根据文章id获取一篇文章
      getOneArticleById() {
        editorMethods.getOneArticleById(this.id).then(res => {
          console.log(res)
          this.editorValue = res.data.content
        }).catch(err=>{
          console.log(err)
        })
      },
      //提交保存修改
      editSubmit(){
        editorMethods.updateArticle(this.id,this.editorValue).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  .title-container {
    text-align: center;
  }

  .main-title {
    font-size: 24px; /* 调整标题字体大小 */
    color: black; /* 调整标题字体颜色 */
  }

  .subtitle {
    font-size: 16px; /* 调整时间字体大小 */
    color: #666; /* 灰色字体颜色 */
  }

  .edit-button {
    position: absolute;
    top: 10px; /* 调整按钮距离顶部的距离 */
    right: 10px; /* 调整按钮距离右侧的距离 */
  }
</style>

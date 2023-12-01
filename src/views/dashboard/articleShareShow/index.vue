<template>
  <div>
    <div class="title-container">
      <div class="main-title">{{this.editor_title}}</div>
      <div class="subtitle">{{this.author_name}} {{this.create_time}}</div>
<!--      <div class="subtitle"></div>-->
    </div>
    <div id="main">
      <mavon-editor v-model="editorValue" :toolbarsFlag="false" :subfield="false" defaultOpen="preview" >
      </mavon-editor>
    </div>
  </div>
</template>

<script>
  import editorMethods from '@/api/edu/editor'

  export default {
    name: 'index',
    props: ['id','editor_title','create_time','author_name'],
    data() {
      return {
        editorValue: '### hello',
      }
    },
    created() {
      this.getOneArticleById()
    },
    methods: {
      getOneArticleById() {
        editorMethods.getOneArticleById(this.id).then(res => {
          console.log(res)
          this.editorValue = res.data.content
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

</style>

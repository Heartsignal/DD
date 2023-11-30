<template>
  <div>
    <div class="title-container">
      <div class="main-title">你的标题</div>
      <div class="subtitle">2023-11-08</div>
    </div>
    <div id="main">
      <mavon-editor v-model="editorValue" :toolbarsFlag="false" :subfield="false">
      </mavon-editor>
    </div>
  </div>
</template>

<script>
  import editorMethods from '@/api/edu/editor'

  export default {
    name: 'index',
    props: ['id'],
    data() {
      return {
        editorValue: '### hello'
      }
    },
    created() {
      this.getOneArticleById()
    },
    methods: {
      getOneArticleById() {
        editorMethods.getOneArticleById(this.$route.params.id).then(res => {
          console.log(this.$route.params.id)
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

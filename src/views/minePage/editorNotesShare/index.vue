<template>
  <div>
    <div>
      <el-input placeholder="请输入内容" v-model="title">
        <template slot="prepend">文章标题</template>
        <el-button slot="append" @click="submitValue" style="background-color: rgb(48, 65, 86); color: rgb(191, 203, 217);">提交</el-button>
      </el-input>
    </div>
    <div id="main">
      <mavon-editor v-model="value"/>
    </div>
  </div>
</template>

<script>
  import editorMethods from '@/api/edu/editor'

  export default {
    components: {},
    data() {
      return {
        title:'',
        value: ''
      }
    },
    methods: {
      submitValue() {
        console.log(this.title)
        console.log(this.value)
        editorMethods.submitEditor(this.title,this.value,this.$store.getters.id).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="css">

</style>

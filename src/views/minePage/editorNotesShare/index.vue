<template>
  <div>
    <div>
      <el-input placeholder="请输入内容" v-model="title">
        <template slot="prepend">文章标题</template>
        <el-button slot="append" @click="submitValue"
                   style="background-color: rgb(48, 65, 86); color: rgb(191, 203, 217);">提交
        </el-button>
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
        title: '',
        value: '',
        categories: ['Python', 'Java', '编程语言', '开发工具',
          '数据结构与算法', '大数据', '前端', '后端', '云原生',
          '移动开发', '人工智能', '网络与通信', '嵌入式', '硬件开发',
          '游戏', 'Harmonyos', '微软技术', '操作系统', '搜索',
          '设计模式', '测试', '云平台', '软件工程', '区块链',
          '数学', '运维', '网络空间安全', '服务器', , '学习和成长',
          '教育培训', '用户体验设计', '音视频', '行业数字化', '其他'
        ]
      }
    },
    methods: {
      submitValue() {
        console.log(this.title)
        console.log(this.value)
        editorMethods.submitEditor(this.title, this.value, this.$store.getters.id).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="css">

</style>

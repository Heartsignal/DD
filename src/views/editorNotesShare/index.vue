<template>
  <div>
<!--    <div>-->
<!--      <el-input placeholder="请输入内容" v-model="title">-->
<!--        <template slot="prepend">文章标题</template>-->
<!--        <el-button slot="append" @click="submitValue"-->
<!--                   style="background-color: rgb(48, 65, 86); color: rgb(191, 203, 217);">提交-->
<!--        </el-button>-->
<!--      </el-input>-->
<!--    </div>-->
    <div>
      <el-row>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="title" class="input-with-select">
            <!--        <span  slot="prepend">选择</span>-->
            <template slot="prepend">文章标题</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="selectCategory" placeholder="请选择类别" style="width: 100%">
            <el-option
              v-for="(item,index) in categories"
              :key="index"
              :label="item"
              :value="item"></el-option>
            <template slot="prepend">类别</template>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button style="width: 100%;background-color: rgb(48, 65, 86); color: rgb(191, 203, 217);"
                      @click="submitValue">提交</el-button>
        </el-col>
      </el-row>
    </div>
    <div id="main">
      <mavon-editor ref=md v-model="value" @imgAdd="imgAdd" @imgDel="imgDel"/>
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
        selectCategory: '',
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
        editorMethods.submitEditor(this.title, this.value, this.$store.getters.id,this.selectCategory).then(res => {
          console.log(res)
        })
      },

      imgAdd(pos, imgFile) {
        //imgFile是文件
        console.log(imgFile)
        console.log(imgFile.name)
        //将文件放到formData中
        var formdata = new FormData()
        formdata.append('image', imgFile, imgFile.name)
        console.log(formdata.get('image'))
        // this.$refs.md.$img2Url(pos, imgFile.miniurl);
        //上传
        editorMethods.uploadPic(formdata).then(res => {
          console.log(res)
          this.$refs.md.$img2Url(pos, res.data.url)
        })
      },
      imgDel(pos, imgFile) {

      }
    }
  }
</script>

<style lang="css">

</style>

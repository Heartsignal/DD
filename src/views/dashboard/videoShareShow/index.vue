<template>
  <div>
    <h2>目录展示</h2>
    <ul>
      <li v-for="(directory, index) in directories" :key="index">
        {{directory.course_unit}}--{{ directory.catalog_name }}
        <button @click="downloadDirectory(directory)" v-if="haveCourseIds.includes(courseId)">下载</button>
      </li>
    </ul>
  </div>
</template>

<script>
import courseMethods from '../../../api/edu/course'
  export default {
    name: 'index',
    props: ['course_id'],
    created(){
      this.showCourseCatalog()
    },
    data() {
      return {
        haveCourseIds:this.$store.getters.haveCourseIds,
        directories: [
          { course_unit: '第一节', catalog_name: '目录1', path: '/path/to/directory1' },
          { course_unit: '第二节', catalog_name: '目录2', path: '/path/to/directory2' }
          // 添加更多目录项
        ]
      }
    },
    methods: {
      //获取目录
      showCourseCatalog() {
        courseMethods.showCourseCatalog(this.course_id).then(res => {
          console.log(res)
          this.directories = res.data
        })
      },
      downloadDirectory(directory) {
        // 在这里处理下载逻辑，可以使用浏览器提供的下载功能或者发起下载请求
        console.log(`下载目录：${directory.name}, 路径：${directory.path}`)
      }
    }
  }
</script>

<style scoped>
  /* 可以添加一些样式 */
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }
</style>

<template>
  <div>
    <h2>视频展示</h2>
    <div>
      <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
      ></video-player>
    </div>
    <h2>目录展示</h2>
    <ul>
      <li v-for="(directory, index) in directories" :key="index">
        {{directory.course_unit}}--{{ directory.catalog_name }}
        <button @click="downloadDirectory(directory)" v-if="haveCourseIds.includes(course_id)">下载</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
  import VideoPlayer from 'vue-video-player'

  import courseMethods from '../../../api/edu/course'

  export default {
    name: 'index',
    props: ['course_id'],
    components: {
      'el-video': VideoPlayer
    },
    created() {
      this.showCourseCatalog()
    },
    data() {
      return {
        playerOptions : {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "https://zy.yunqishi8.com/upload/mp4/202012/4-1.mp4" //url地址
          }],
          poster: "../../static/images/test.jpg", //你的封面地址
          // width: document.documentElement.clientWidth, //播放器宽度
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        },
        haveCourseIds: this.$store.getters.haveCourseIds,
        directories: [
          { course_unit: '第一节', catalog_name: '目录1', path: '/path/to/directory1' },
          { course_unit: '第二节', catalog_name: '目录2', path: '/path/to/directory2' }
          // 添加更多目录项
        ]
      }
    },
    methods: {
      //获取视频
      getVideo(){
        courseMethods.getVideoUrl().then(res=>{
          this.playerOptions.sources =res.data
        })
      },
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

  .video-player {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
</style>

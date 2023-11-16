<template>
  <div class="dashboard-container">
    <!--    <div class="dashboard-text">name:{{ name }}</div>-->
    <!--    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->

    <!--    轮播效果-->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,n) in this.topData" :key="n"
             style="padding-bottom: 10px; padding-right: 10px;">
          <el-card>
            <!-- 卡片上部分 -->
            <div>
              <!-- 这里可以放图片或其他内容 -->
              <img
                :src="require(`@/assets/img/dashboard_class_1.jpg`)"
                alt="Image" style="width: 100%; height: 100%; object-fit: cover;">
            </div>

            <!-- 卡片下部分 -->
            <div style="height: 40px; padding: 10px 0">

              <!-- 上半部分 -->
              <div
                style=" font-size: 16px; font-family: 'Roboto Thin';  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                <!-- 标题 -->
                {{item.course_name}}
                <span type="info" style="font-size: 12px; color: #999">{{item.course_times}}节</span>
                <el-tag v-if="isHaveCourse(item.course_id)" type="warning">已选</el-tag>
              </div>

              <!-- 下半部分 -->
              <div
                style=" font-size: 14px; color: #999; width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; margin-top: 10px">
                <!-- 文章内容 -->
                {{item.course_des}}
              </div>
            </div>
          </el-card>
        </div>
        <!-- 其他 slides -->
      </div>
    </div>


    <!-- 100% 宽度的列表 -->
    <div>
      <el-card
        v-for="index in 10"
        :key="index"
        style="width: 100%; height: 60px; margin-bottom: 10px;"
      >
        <!-- 上半部分，占 40% -->
        <div style="height: 40%; font-size: 16px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          <!-- 标题 -->
          Title {{ index }}
        </div>

        <!-- 下半部分，占 60% -->
        <div
          style="height: 60%; font-size: 14px; color:#999; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          <!-- 文章内容 -->
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut lorem ac tellus iaculis accumsan vel nec
          massa.
        </div>

      </el-card>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import 'swiper/swiper-bundle.css' // 或者 'swiper/swiper.scss'
  import Swiper from 'swiper'
  import course from '../../api/edu/course'

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    data() {
      return {
        topData: [{
          course_id: '202301',
          course_name: '精选JAVA课程',
          course_times: 10,
          course_des: '一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库 指南 了解设计指南,帮助产品设计人员搭建逻辑清晰、结构合理且高效易用的产品。 查看详情 组件 使用组件 Demo 快速体'
        }, {
          course_id: '202302',
          course_name: '深入浅出JAVA30天',
          course_times: 13,
          course_des: 'java培训全部课程,0基础入门+实战项目培训+积累项目经验,即学即用.java培训全部课程 9大热门学科,20所自营分校,完善课程体系,30余万IT学员'
        }, {
          course_id: '202302',
          course_name: '深入浅出JAVA30天',
          course_times: 13,
          course_des: 'java培训全部课程,0基础入门+实战项目培训+积累项目经验,即学即用.java培训全部课程 9大热门学科,20所自营分校,完善课程体系,30余万IT学员'
        }, {
          course_id: '202302',
          course_name: '深入浅出JAVA30天',
          course_times: 13,
          course_des: 'java培训全部课程,0基础入门+实战项目培训+积累项目经验,即学即用.java培训全部课程 9大热门学科,20所自营分校,完善课程体系,30余万IT学员'
        }, {
          course_id: '202302',
          course_name: '深入浅出JAVA30天',
          course_times: 13,
          course_des: 'java培训全部课程,0基础入门+实战项目培训+积累项目经验,即学即用.java培训全部课程 9大热门学科,20所自营分校,完善课程体系,30余万IT学员'
        }, {
          course_id: '202302',
          course_name: '深入浅出JAVA30天',
          course_times: 13,
          course_des: 'java培训全部课程,0基础入门+实战项目培训+积累项目经验,即学即用.java培训全部课程 9大热门学科,20所自营分校,完善课程体系,30余万IT学员'
        }]
      }
    },
    mounted() {
      new Swiper('.swiper-container', {
        slidesPerView: 4, // 一次性展示的轮播项个数
        spaceBetween: 10, // 项之间的间距
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
        // 其他配置项
      })
    },
    created() {
      this.getClassInfo()
    },
    methods: {
      //获取全部的课程
      getClassInfo() {
        course.getALlCourseInfo().then(res => {
          console.log(res)
          this.topData = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      //判断是否已选
      isHaveCourse(courseId){
        if (this.$store.getters.haveCourseIds.includes(courseId)){
          return true;
        }else {
          return false;
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }

    /* 可以添加一些样式，比如设置轮播项的宽度 */
    .swiper-slide {
      width: calc(25% - 10px); /* 一次性展示 4 个，减去间距 */
    }
  }
</style>

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
      <!--      &lt;!&ndash; Add Pagination &ndash;&gt;-->
      <!--      <div class="swiper-pagination"></div>-->
      <!--      &lt;!&ndash; Add Navigation &ndash;&gt;-->
      <!--      <div class="swiper-button-next"></div>-->
      <!--      <div class="swiper-button-prev"></div>-->

    </div>


    <!-- 100% 宽度的列表 -->
    <div>
      <el-card
        v-for="(item,index) in shareData"
        :key="index"
        style="width: 100%; height: 60px; margin-bottom: 10px; cursor: pointer;"
        @click.native="handleCardClick(item)"
      >
        <!-- 上半部分，占 40% -->
        <el-row style="height: 40%; margin-top: -10px;margin-bottom: 5px">
          <el-col :span="20"
                  style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; font-weight: 500;color: #222226;">
            <!-- 标题 -->
            {{ item.title }}
          </el-col>
        </el-row>

        <!-- 下半部分，占 60% -->
        <div
          style="height: 60%; font-size: 12px; color:#999; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          <!-- 文章内容 -->
          {{item.content}}
        </div>

      </el-card>
      <el-pagination
        background
        small
        layout="prev, pager, next"
        :total="articleNum"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        @current-change="currentPageChange"
      >
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import 'swiper/swiper-bundle.css' // 或者 'swiper/swiper.scss'
  import Swiper from 'swiper'
  import 'swiper/swiper.scss'
  import course from '../../api/edu/course'
  import editor from '../../api/edu/editor'

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
        topData: [
          {
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
          }],
        shareData: [
          {
            'create_time': '2023-11-27 14:10',
            'title': '虚拟列表的实现',
            'cate': '前端',
            'content': '在传统的列表渲染中，如果列表数据过多，一次性渲染所有数据将耗费大量的时间和内存。当我们上下滚动时，性能低的浏览器或电脑都会感觉到非常的卡，这对用户的体验时是致命的。\n' +
              '\n' +
              '        于是我们会想到懒加载，当资源到达可视窗口内时，继续向服务器发送请求获取接下来的资源，不过当获取的资源越来越多时，此时浏览器不断重绘与重排，这样的开销也是要考虑的当数量多到一定程度时，页面也会出现卡顿。 \n' +
              '\n' +
              '         此时我们会想到虚拟列表，虚拟列表只渲染当前可见的部分数据，随着滚动条的滚动，只渲染当前可见的列表项，从而大大减少了渲染时间。同时支持无限滚动，用户只需要不停地滚动页面，就可以看到所有的数据，从而提高了用户的体验。\n',
            'author_name': '小鱼干'
          }, {
            'create_time': '2023-11-27 14:10',
            'title': '虚拟列表的实现',
            'cate': '前端',
            'content': '在传统的列表渲染中，如果列表数据过多，一次性渲染所有数据将耗费大量的时间和内存。当我们上下滚动时，性能低的浏览器或电脑都会感觉到非常的卡，这对用户的体验时是致命的。\n' +
              '\n' +
              '        于是我们会想到懒加载，当资源到达可视窗口内时，继续向服务器发送请求获取接下来的资源，不过当获取的资源越来越多时，此时浏览器不断重绘与重排，这样的开销也是要考虑的当数量多到一定程度时，页面也会出现卡顿。 \n' +
              '\n' +
              '         此时我们会想到虚拟列表，虚拟列表只渲染当前可见的部分数据，随着滚动条的滚动，只渲染当前可见的列表项，从而大大减少了渲染时间。同时支持无限滚动，用户只需要不停地滚动页面，就可以看到所有的数据，从而提高了用户的体验。\n',
            'author_name': '小鱼干'
          }
        ],
        articleNum: 0,
        currentPage: 1,
        pageSize: 5
      }
    },
    mounted() {
      new Swiper('.swiper-container', {
        slidesPerView: 4, // 一次性展示的轮播项个数
        spaceBetween: 10, // 项之间的间距
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // 其他配置项
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    },
    created() {
      this.getClassInfo()
      this.getArticles(this.currentPage)
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
      isHaveCourse(courseId) {
        if (this.$store.getters.haveCourseIds.includes(courseId)) {
          return true
        } else {
          return false
        }
      },
      //获取笔记列表
      getArticles(val) {
        editor.showArticles(val).then(res => {
          this.shareData = res.data.article_data
          this.articleNum = res.data.all_num
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      //点击一个笔记
      handleCardClick(val) {
        this.$router.push(
          {
            name: 'articleShareShow',
            params: {
              id: val.id,
              editor_title:val.title,
              create_time: val.create_time,
              author_name: val.author_name
            }
          })
      },
      //修改笔记页码
      currentPageChange() {
        this.getArticles(this.currentPage)
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

    .swiper-container {
      /*height: ;*/
      .swiper-slide {
        width: calc(25% - 10px); /* 一次性展示 4 个，减去间距 */
      }
    }

    /* 可以添加一些样式，比如设置轮播项的宽度 */


  }
</style>

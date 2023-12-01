<template>
  <div>
    <div>
      <el-row>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="searchOwnArticleValue" class="input-with-select">
            <template slot="prepend">文章标题</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="selectCategory" placeholder="请选择类别"style="width: 100%">
            <el-option
              v-for="(item,index) in categories"
              :key="index"
              :label="item"
              :value="item"></el-option>
            <template slot="prepend">类别</template>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button style="width: 100%;background-color: rgb(48, 65, 86); color: rgb(191, 203, 217);" icon="el-icon-search" @click="searchOwnArticleSubmit"></el-button>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 15px;">
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
  import editor from '@/api/edu/editor'

  export default {

    name: 'index',
    computed: {
      // ...mapGetters([
      //   'id'
      // ]),
    },
    created() {
      this.getOwnArticles(this.currentPage)
    },
    data() {
      return {
        categories: ['Python', 'Java', '编程语言', '开发工具',
          '数据结构与算法', '大数据', '前端', '后端', '云原生',
          '移动开发', '人工智能', '网络与通信', '嵌入式', '硬件开发',
          '游戏', 'Harmonyos', '微软技术', '操作系统', '搜索',
          '设计模式', '测试', '云平台', '软件工程', '区块链',
          '数学', '运维', '网络空间安全', '服务器', , '学习和成长',
          '教育培训', '用户体验设计', '音视频', '行业数字化', '其他'
        ],
        searchOwnArticleValue:"",
        selectCategory:"",
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
          }
        ],
        articleNum: 0,
        currentPage: 1,
        pageSize: 5,
      }
    },
    methods: {
      //搜索自己的笔记
      searchOwnArticleSubmit(){
        console.log("搜索")
        editor.searchOwnArticles(this.$store.getters.id,this.searchOwnArticleValue,this.currentPage,this.selectCategory).then(res=>{
          console.log(res)
          this.shareData = res.data.article_data
          this.articleNum = res.data.all_num
        }).catch(onerror=>{
          console.log(onerror)
        })
      },
      //获取笔记列表
      getOwnArticles(val) {
        editor.showOwnArticles(val,this.$store.getters.id).then(res => {
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
              edit:true,
              id: val.id,
              editor_title: val.title,
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

<style scoped>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>

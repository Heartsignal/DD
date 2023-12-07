import request from '@/utils/request'

export default {
  //获取所有的课程信息
  getALlCourseInfo() {
    return request({
      url: '/backend/get_all_courses_info'
    })
  },
  //获取该课程下的目录
  showCourseCatalog(course_id) {
    return request({
      url:'/backend/show_course_catalog',
      method:'post',
      data:{
        course_id:course_id
      }
    })
  },
  //获取课程视频
  getVideoUrl(){
    return request({
      url:'',
      method:'post',
      data:{

      }
    })
  },
  //1 添加课程信息
  addCourseInfo(courseInfo) {
    return request({
      url: '/eduservice/edu-course/addCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  //2 查询所有讲师
  getListTeacher() {
    return request({
      url: '/eduservice/edu-teacher/findAll',
      method: 'get'
    })
  },
  //根据课程id查询课程基本信息
  getCourseInfoId(id) {
    return request({
      url: '/eduservice/edu-course/getCourseInfo/' + id,
      method: 'get'
    })
  },
  //修改课程信息
  updateCourseInfo(courseInfo) {
    return request({
      url: '/eduservice/edu-course/updateCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  //课程确认信息显示
  getPublihCourseInfo(id) {
    return request({
      url: '/eduservice/edu-course/getPublishCourseInfo/' + id,
      method: 'get'
    })
  },
  //课程最终发布
  publihCourse(id) {
    return request({
      url: '/eduservice/edu-course/publishCourse/' + id,
      method: 'post'
    })
  },
  //TODO 课程列表
  //课程最终发布
  getListCourse() {
    return request({
      url: '/eduservice/edu-course',
      method: 'get'
    })
  }

}

<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
             label-position="left">
      <h3 class="title">快 乐 课 堂</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>
      <el-form-item>
        <div class="button-container">
          <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin" class="flex-button">
            登 录
          </el-button>
          <el-button  type="primary" @click.native.prevent="handleRegister" class="flex-button">
            注 册
          </el-button>
        </div>
      </el-form-item>
      <!--      <div class="tips">-->
      <!--        <span style="margin-right:20px;">username: admin</span>-->
      <!--        <span> password: admin</span>-->
      <!--      </div>-->
    </el-form>
  </div>
</template>

<script>
  import { isvalidUsername } from '@/utils/validate'
  import login from '@/api/edu/login'
  import teacher from '@/api/edu/teacher'

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value.length<2) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: 'admin'
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }]
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            // console.log(this.redirect)
            // this.$router.push({path: this.redirect || '/'})
            // console.log("跳转")
            /**
             this.$store.dispatch('Login', this.loginForm).then(() => {
                            console.log(this.redirect)
                            this.loading = false
                            this.$router.push({path: this.redirect || '/'})
                        }).catch(() => {
                            this.loading = false
                        })
             **/

            this.$store.dispatch('Login',this.loginForm).then(()=>{
              this.loading = false
              this.$message({
                message: '登录成功，欢迎id为'+this.$store.getters.id +'的同学开始快乐的学习吧~',
                type: 'success'
              });
              this.$router.push({ path: this.redirect || '/dashboard' })
            }).catch(err => {
              console.log(err)
              this.loading = false
              this.$message.error('错了哦，再核实一下用户名和密码！');
            })

            // login.login(this.loginForm.username, this.loginForm.password).then(res => {
            //   this.loading = false
            //   this.$message({
            //     message: '登录成功，开始快乐的学习吧~',
            //     type: 'success'
            //   });
            //   this.$router.push({ path: this.redirect || '/dashboard' })
            // }).catch(err => {
            //   console.log(err)
            //   this.loading = false
            //   this.$message.error('错了哦，再核实一下用户名和密码！');
            // })

          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleRegister() {
        this.$router.push({ path: this.redirect || '/register' })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;

        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;

    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .button-container {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .flex-button {
        flex: 1;
      }
    }


    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>

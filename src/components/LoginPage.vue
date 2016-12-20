<template>
  <div class="loginpage">
    <el-row type="flex" justify="center">
      <el-col :sm="9" :md="6">
        <h1>登录</h1>
        <el-alert v-show="message.text" :title="message.text" :type="message.type"></el-alert>
        <login-form @error="error" @pending="pending" @success="success"></login-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LoginForm from './LoginForm'

import { Row, Col, Alert } from 'element-ui'

export default {
  name: 'login-page',
  data () {
    return {
      message: {
        text: '',
        type: 'info'
      }
    }
  },
  methods: {
    error (err) {
      this.message = {
        text: err.msg,
        type: 'error'
      }
    },
    pending () {
      this.message = {
        text: '登录中...',
        type: 'info'
      }
    },
    success () {
      this.message = {
        text: '登录成功',
        type: 'success'
      }
      this.$emit('login')
      setTimeout(() => {
        this.$emit('routeTo', '/')
      }, 1000)
    }
  },
  components: {
    LoginForm,
    ElRow: Row,
    ElCol: Col,
    ElAlert: Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

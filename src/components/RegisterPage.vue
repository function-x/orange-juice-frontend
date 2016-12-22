<template>
  <div class="registerpage">
    <el-row type="flex" justify="center">
      <el-col :sm="9" :md="6">
        <h1>注册</h1>
        <el-alert v-show="message.text" :title="message.text" :type="message.type"></el-alert>
        <register-form @error="error" @pending="pending" @success="success"></login-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RegisterForm from './RegisterForm'
import { Row, Col, Alert } from 'element-ui'

import routeto from '../helpers/routeto'

export default {
  name: 'register-page',
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
      let text = ''
      if (typeof (err.errors) === 'string') {
        text = err.errors
      } else {
        for (let key in err.errors) {
          if (err.errors.hasOwnProperty(key)) {
            text += key + ': ' + err.errors[key].message + '\n'
          }
        }
      }
      this.message = {
        text,
        type: 'error'
      }
    },
    pending () {
      this.message = {
        text: '注册中...',
        type: 'info'
      }
    },
    success () {
      this.message = {
        text: '注册成功',
        type: 'success'
      }
      routeto(this, '/')
    }
  },
  components: {
    RegisterForm,
    ElRow: Row,
    ElCol: Col,
    ElAlert: Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

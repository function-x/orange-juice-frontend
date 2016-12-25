<template>
  <div class="loginpage">
    <el-row type="flex" justify="center">
      <el-col :sm="9" :md="6">
        <h1>新建题目</h1>
        <el-alert v-show="message.text" :title="message.text" :type="message.type"></el-alert>
        <problem-form @error="error" @pending="pending" @success="success" operation="create"></problem-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProblemForm from './ProblemForm'
import routeto from '../helpers/routeto'

import { Row, Col, Alert } from 'element-ui'

export default {
  name: 'new-problem-page',
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
        text: '提交中...',
        type: 'info'
      }
    },
    success () {
      this.message = {
        text: '创建成功',
        type: 'success'
      }
      routeto(this, '/problems')
    }
  },
  components: {
    ProblemForm,
    ElRow: Row,
    ElCol: Col,
    ElAlert: Alert
  }
}
</script>

<template>
  <div class="loginpage">
    <el-row type="flex" justify="center">
      <el-col :sm="9" :md="6">
        <h1>提交题目</h1>
        <el-alert v-show="message.text" :title="message.text" :type="message.type"></el-alert>
        <submit-form @error="error" @pending="pending" @success="success" operation="create"></submit-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SubmitForm from './SubmitForm'
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
        text: err.message,
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
        text: '提交成功',
        type: 'success'
      }
      routeto(this, '/submissions')
    }
  },
  components: {
    SubmitForm,
    ElRow: Row,
    ElCol: Col,
    ElAlert: Alert
  }
}
</script>

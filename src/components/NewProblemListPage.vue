<template>
  <div class="new-problem-list-page">
    <el-row type="flex" justify="center">
      <el-col :sm="9" :md="6">
        <h1>新建题单</h1>
        <el-alert v-show="message.text" :title="message.text" :type="message.type"></el-alert>
        <new-problem-list-form @error="error" @pending="pending" @success="success"></login-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NewProblemListForm from './NewProblemListForm'
import { Row, Col, Alert } from 'element-ui'

import routeto from '../helpers/routeto'

export default {
  name: 'new-problem-list-page',
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
        text: '创建中...',
        type: 'info'
      }
    },
    success () {
      this.message = {
        text: '创建成功',
        type: 'success'
      }
      routeto(this, '/lists')
    }
  },
  components: {
    NewProblemListForm,
    ElRow: Row,
    ElCol: Col,
    ElAlert: Alert
  }
}
</script>

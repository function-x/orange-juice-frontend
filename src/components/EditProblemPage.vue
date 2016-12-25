<template>
  <div class="loginpage">
    <el-row type="flex" justify="center">
      <el-col :sm="9" :md="6">
        <h1>修改题目</h1>
        <el-alert v-show="alert.text" :title="alert.text" :type="alert.type"></el-alert>
        <problem-form operation="edit" @error="error" @pending="pending" @success="success" :title="problem.title" :description="problem.description" :id="problem.id"></problem-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProblemForm from './ProblemForm'
import routeto from '../helpers/routeto'
import superagent from 'superagent'
import configuration from '../../configuration'

import { Row, Col, Alert } from 'element-ui'

export default {
  name: 'new-problem-page',
  data () {
    return {
      problem: {
        title: '',
        description: '',
        id: ''
      },
      alert: {
        text: '',
        type: 'info'
      }
    }
  },
  methods: {
    error (err) {
      this.alert = {
        text: err.msg,
        type: 'error'
      }
    },
    pending () {
      this.alert = {
        text: '提交中...',
        type: 'info'
      }
    },
    success () {
      this.alert = {
        text: '修改成功',
        type: 'success'
      }
      routeto(this, '/problems/' + this.problem.id)
    }
  },
  components: {
    ProblemForm,
    ElRow: Row,
    ElCol: Col,
    ElAlert: Alert
  },
  created () {
    this.problem.id = this.$route.params.id
    superagent
      .get(configuration.url + '/problem/' + this.problem.id)
      .withCredentials()
      .end((err, res) => {
        if (err) {
          this.alert.type = 'error'
          this.alert.text = '网络错误'
        } else if (res.body.code !== 0) {
          this.alert.type = 'error'
          this.alert.text = 'API错误' + res.body.code
          // check if logged
          if (res.body.code === 7) {
            this.alert.text = '登录状态失效'
            this.$emit('logout')
            routeto(this, '/login')
          }
        } else {
          this.alert.type = 'success'
          this.alert.text = ''
          this.problem.title = res.body.problem.title
          this.problem.description = res.body.problem.description
        }
      })
  }
}
</script>

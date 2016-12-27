<template>
  <div class="profilepage">
    <el-row type="flex" justify="center">
      <el-col :sm="9" :md="6">
        <el-alert v-show="alert.text" :type="alert.type" :title="alert.text"></el-alert>
        <div class="data" v-show="alert.text === ''">
          <h1>修改判决</h1>
          <p class="field-name">内容</p>
          <p>{{ data.submissionContent }}</p>
          <judge-form @error="error" @pending="pending" @success="success"></submit-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Alert, Row, Col } from 'element-ui'
import JudgeForm from './JudgeForm'
import superagent from 'superagent'
import configuration from '../../configuration'
import routeto from '../helpers/routeto'

export default {
  name: 'submission-judge-page',
  data () {
    return {
      alert: {
        type: 'info',
        text: '获取中...'
      },
      data: {
        submissionContent: ''
      }
    }
  },
  components: {
    JudgeForm,
    ElAlert: Alert,
    ElRow: Row,
    ElCol: Col
  },
  methods: {
    error (err) {
      this.alert = {
        text: err,
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
        text: '提交成功',
        type: 'success'
      }
      routeto(this, '/')
    }
  },
  props: [
    'username'
  ],
  created () {
    if (this.username === '') {
      this.alert.type = 'error'
      this.alert.text = '未登录'
      routeto(this, '/login')
      return
    }
    superagent
      .get(configuration.url + '/submission/' + this.$route.params.submission_id)
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
          this.data.submissionContent = new window.TextDecoder('utf8').decode(new Uint8Array(res.body.submission.body.data))
        }
      })
  }
}
</script>

<style scoped>
.field-name {
  font-weight: bold;
}
</style>

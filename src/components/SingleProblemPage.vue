<template>
  <div class="profilepage">
    <el-row type="flex" justify="center">
      <el-col :sm="9" :md="6">
        <el-alert v-show="alert.text" :type="alert.type" :title="alert.text"></el-alert>
        <div class="data" v-show="alert.text === ''">
          <p class="field-name">题目名</p>
          <p>{{ data.title }}</p>
          <p class="field-name">描述</p>
          <p>{{ data.description }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Alert, Row, Col } from 'element-ui'
import superagent from 'superagent'
import configuration from '../../configuration'
import routeto from '../helpers/routeto'

export default {
  name: 'single-problem-page',
  data () {
    return {
      alert: {
        type: 'info',
        text: '获取中...'
      },
      data: {
        title: '',
        descripton: ''
      }
    }
  },
  components: {
    ElAlert: Alert,
    ElRow: Row,
    ElCol: Col
  },
  props: [
    'title'
  ],
  created () {
    superagent
      .get(configuration.url + '/problem/' + this.$route.params.id)
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
          this.data.title = res.body.problem.title
          this.data.description = res.body.problem.description
        }
      })
  }
}
</script>

<style scoped>
.data {
  text-align: justify;
  font-size: 1.5em;
}
.field-name {
  font-weight: bold;
}
</style>

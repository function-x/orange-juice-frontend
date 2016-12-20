<template>
  <div class="logoutpage">
    <el-row type="flex" justify="center">
      <el-col :sm="9" :md="6">
        <el-alert :type="type" :title="text"></el-alert>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Alert, Row, Col } from 'element-ui'
import superagent from 'superagent'
import configuration from '../../configuration'

export default {
  name: 'logout-page',
  data () {
    return {
      type: 'info',
      text: '退出中'
    }
  },
  components: {
    ElAlert: Alert,
    ElRow: Row,
    ElCol: Col
  },
  created () {
    superagent
      .get(configuration.url + '/user/sign-out')
      .withCredentials()
      .end((err, res) => {
        if (err) {
          this.type = 'error'
          this.text = '网络错误'
        } else {
          this.type = 'success'
          this.text = '退出成功'
          this.$emit('logout')
          setTimeout(() => {
            this.$emit('routeTo', '/')
          }, 1000)
        }
      })
  }
}
</script>

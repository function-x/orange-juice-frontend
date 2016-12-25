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
import routeto from '../helpers/routeto'

export default {
  name: 'delete-problem-page',
  data () {
    return {
      type: 'info',
      text: '删除中'
    }
  },
  components: {
    ElAlert: Alert,
    ElRow: Row,
    ElCol: Col
  },
  created () {
    superagent
      .delete(configuration.url + '/problem/' + this.$route.params.id)
      .withCredentials()
      .end((err, res) => {
        if (err && res.body.code === 0) {
          this.type = 'error'
          this.text = '网络错误233'
        } else {
          this.type = 'success'
          this.text = '删除成功'
          this.$emit('logout')
          routeto(this, '/problems')
        }
      })
  }
}
</script>

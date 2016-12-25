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
  name: 'logout-page',
  data () {
    return {
      type: 'info',
      text: '添加中'
    }
  },
  components: {
    ElAlert: Alert,
    ElRow: Row,
    ElCol: Col
  },
  created () {
    superagent
      .post(configuration.url + '/problem_list/' + this.$route.params.list_id + '/problem')
      .withCredentials()
      .send({
        problemId: this.$route.params.problem_id
      })
      .end((err, res) => {
        if (err) {
          this.type = 'error'
          this.text = '网络错误'
        } else {
          this.type = 'success'
          this.text = '添加成功'
          routeto(this, '/lists')
        }
      })
  }
}
</script>

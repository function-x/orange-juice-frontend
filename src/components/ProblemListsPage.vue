<template>
  <div class="problemspage">
    <el-row type="flex" justify="center">
      <el-col :sm="12" :md="9">
        <h1>题单列表</h1>
        <el-alert v-show="alert.text" :type="alert.type" :title="alert.text"></el-alert>
        <el-table :data="problemlists">
            <el-table-column prop="name" label="题单名"></el-table-column>
            <el-table-column width="90px" :context="_self" inline-template label="操作">
                <div>
                <el-button @click="viewProblemList(row)" type="info">查看</el-button>
                </div>
            </el-table-column>
        </el-table>
        <el-button class="new-problem-list" @click="newProblemList" type="success">添加新题单</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Row, Col, Table, TableColumn, Button, Alert } from 'element-ui'
import superagent from 'superagent'
import configuration from '../../configuration'
import routeto from '../helpers/routeto'

export default {
  name: 'problems-page',
  data () {
    return {
      problemlists: [],
      alert: {
        type: 'info',
        text: '获取中'
      }
    }
  },
  components: {
    ElRow: Row,
    ElCol: Col,
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElButton: Button,
    ElAlert: Alert
  },
  methods: {
    viewProblemList (row) {
      routeto(this, '/lists/' + row.id, 0)
    },
    newProblemList () {
      routeto(this, '/list/new', 0)
    }
  },
  created () {
    superagent
      .get(configuration.url + '/problem_list')
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
          this.problemlists = res.body.problemLists.map((problemlist) => ({name: problemlist.name, id: problemlist._id}))
        }
      })
  }
}
</script>

<style scoped>
.new-problem-list{
  margin-top: 20px;
}
</style>

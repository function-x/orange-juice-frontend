<template>
  <div class="problemspage">
    <el-row type="flex" justify="center">
      <el-col :sm="12" :md="9">
        <h1>我添加的题目</h1>
        <el-alert v-show="alert.text" :type="alert.type" :title="alert.text"></el-alert>
        <el-table :data="problems">
            <el-table-column prop="title" label="题目名"></el-table-column>
            <el-table-column width="250px" :context="_self" inline-template label="操作">
                <div>
                <el-button @click="viewProblem(row)" type="info">查看</el-button>
                <el-button @click="editProblem(row)" type="warning">修改</el-button>
                <el-button @click="deleteProblem(row)" type="danger">删除</el-button>
                </div>
            </el-table-column>
        </el-table>
        <el-button class="new-problem" @click="newProblem" type="success">添加新题目</el-button>
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
      problems: [],
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
    viewProblem (row) {
      routeto(this, '/problems/' + row.id, 0)
    },
    deleteProblem (row) {
      routeto(this, '/problems/' + row.id + '/delete', 0)
    },
    editProblem (row) {
      routeto(this, '/problems/' + row.id + '/edit', 0)
    },
    newProblem () {
      routeto(this, '/problem/new', 0)
    }
  },
  created () {
    superagent
      .get(configuration.url + '/problem')
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
          this.problems = res.body.problems.map((problem) => ({title: problem.title, id: problem._id}))
        }
      })
  }
}
</script>

<style scoped>
.new-problem{
  margin-top: 20px;
}
</style>
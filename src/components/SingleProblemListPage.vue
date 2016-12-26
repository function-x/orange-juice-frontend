<template>
  <div class="single-problem-list-page">
    <el-row type="flex" justify="center">
      <el-col :sm="9" :md="6">
        <el-alert v-show="alert.text" :type="alert.type" :title="alert.text"></el-alert>
        <div class="data" v-show="alert.text === ''">
          <p class="field-name">题单名</p>
          <p>{{ data.name }}</p>
          <el-table :data="data.problems">
            <el-table-column prop="title" label="题目名"></el-table-column>
            <el-table-column width="180px" :context="_self" inline-template label="操作">
                <div>
                <el-button @click="viewProblem(row)" type="info">查看</el-button>
                <el-button @click="submitProblem(row)" type="warning">提交</el-button>
                </div>
            </el-table-column>
          </el-table>
          <el-button class="new-problem" @click="newProblem" type="success">添加新题目</el-button>
          <el-button class="new-problem" @click="viewSubmissions" type="info">查看所有提交</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Alert, Row, Col, Table, TableColumn, Button } from 'element-ui'
import superagent from 'superagent'
import configuration from '../../configuration'
import routeto from '../helpers/routeto'

export default {
  name: 'single-problem-list-page',
  data () {
    return {
      alert: {
        type: 'info',
        text: '获取中...'
      },
      data: {
        name: '',
        problems: []
      }
    }
  },
  components: {
    ElAlert: Alert,
    ElRow: Row,
    ElCol: Col,
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElButton: Button
  },
  methods: {
    newProblem () {
      routeto(this, '/lists/' + this.$route.params.id + '/add', 0)
    },
    submitProblem (row) {
      routeto(this, '/lists/' + this.$route.params.id + '/submit/' + row.id, 0)
    },
    viewProblem (row) {
      routeto(this, '/lists/' + this.$route.params.id + '/view/' + row.id, 0)
    },
    viewSubmissions () {
      routeto(this, '/' + this.$route.params.id + '/submissions', 0)
    }
  },
  created () {
    superagent
      .get(configuration.url + '/problem_list/' + this.$route.params.id)
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
          this.data.name = res.body.problemList.name
          console.log(res.body.problems)
          this.data.problems = res.body.problems.map(problem => ({title: problem.title, id: problem._id}))
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
.new-problem{
  margin-top: 20px;
}
</style>

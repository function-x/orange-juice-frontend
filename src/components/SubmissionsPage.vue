<template>
  <div class="problemspage">
    <el-row type="flex" justify="center">
      <el-col :sm="12" :md="9">
        <h1>提交列表</h1>
        <el-alert v-show="alert.text" :type="alert.type" :title="alert.text"></el-alert>
        <el-table :data="submisssions">
            <el-table-column prop="problemTitle" label="题目名"></el-table-column>
            <el-table-column prop="sentence" label="结果"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Row, Col, Table, TableColumn, Button, Alert } from 'element-ui'
import superagent from 'superagent'
import configuration from '../../configuration'

export default {
  name: 'problems-page',
  data () {
    return {
      submisssions: [],
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
  created () {
    (async () => {
      try {
        let submissions = await superagent
          .get(configuration.url + '/submission?problemListId=' + this.$route.params.list_id)
          .withCredentials()
        let problems = await superagent
          .get(configuration.url + '/problem_list/' + this.$route.params.list_id)
          .withCredentials()
        let listProblems = problems.body.problems.map((problem) => ({id: problem._id, title: problem.title}))
        this.submisssions = submissions.body.submissions.map((submission) => ({problemTitle: listProblems.find((problem) => (problem.id === submission.problemId)).title, sentence: submission.sentence || '等待判题'}))
        this.alert.type = 'success'
        this.alert.text = ''
      } catch (err) {
        this.alert.type = 'error'
        this.alert.text = '网络错误'
      }
    })()
  }
}
</script>

<style scoped>
.new-problem-list{
  margin-top: 20px;
}
</style>

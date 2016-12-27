<template>
  <div class="problemspage">
    <el-row type="flex" justify="center">
      <el-col :sm="12" :md="9">
        <h1>提交列表</h1>
        <el-alert v-show="alert.text" :type="alert.type" :title="alert.text"></el-alert>
        <el-table :data="submissions">
          <el-table-column prop="problemSubmitterName" label="提交用户名"></el-table-column>
          <el-table-column prop="problemJudgerName" label="判决用户名"></el-table-column>
          <el-table-column prop="problemTitle" label="题目名"></el-table-column>
          <el-table-column prop="sentence" label="结果"></el-table-column>
          <el-table-column width="120px" :context="_self" inline-template label="操作">
            <div>
              <el-button v-if="row.judgerId === userid" @click="updateSentence(row)" type="info">修改判决</el-button>
            </div>
          </el-table-column>
        </el-table>
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
      submissions: [],
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
    updateSentence (row) {
      routeto(this, '/judge/' + row.id, 0)
    }
  },
  props: [
    'userid'
  ],
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
        this.submissions = submissions.body.submissions.map((submission) => ({
          problemTitle: listProblems.find((problem) => (problem.id === submission.problemId)).title,
          judgerId: submission.judgerId,
          submitterId: submission.submitterId,
          sentence: submission.sentence || '等待判题',
          problemSubmitterName: '获取中',
          problemJudgerName: '获取中',
          id: submission._id
        }))
        console.log(this.submissions)
        console.log(this.userid)
        for (let i = 0; i < this.submissions.length; i++) {
          (async (submission) => {
            try {
              submission.problemSubmitterName =
              (await superagent.get(configuration.url + '/user/' + submission.submitterId)).body.user.username
            } catch (err) {
              submission.problemJudgerName = '获取错误'
            }
          })(this.submissions[i]);
          (async (submission) => {
            try {
              submission.problemJudgerName =
              (await superagent.get(configuration.url + '/user/' + submission.judgerId)).body.user.username
            } catch (err) {
              submission.problemJudgerName = '获取错误'
            }
          })(this.submissions[i])
        }
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

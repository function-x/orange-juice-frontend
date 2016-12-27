<template>
  <div class="submitform">
    <el-form @submit.prevent="submit" :model="formData" :rules="rules" ref="form">
      <el-form-item prop="content">
        <el-input placeholder="答案" type="textarea" v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" class="submit-button">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'element-ui'
import superagent from 'superagent'
import configuration from '../../configuration'

export default {
  name: 'submit-form',
  data () {
    return {
      formData: {
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请输入提交内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('pending');
          (async () => {
            try {
              let problemList = await superagent
                .get(configuration.url + '/problem_list/' + this.$route.params.list_id)
                .withCredentials()
              let data = {
                problemId: this.$route.params.problem_id,
                problemListId: this.$route.params.list_id,
                judgerId: problemList.body.problemList.ownerId,
                body: this.formData.content
              }
              let submission = await superagent
                .post(configuration.url + '/submission')
                .withCredentials()
                .send(data)
              if (submission.body.code === 0) this.$emit('success')
              else this.$emit('error', 'API错误' + submission.body.code)
            } catch (err) {
              this.$emit('error', '网络错误')
            }
          })()
        }
      })
    }
  },
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElButton: Button
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.submit-button {
  width: 100%
}
</style>

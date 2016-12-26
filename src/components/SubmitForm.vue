<template>
  <div class="registerform">
    <h5 style="color: red;">// FIXME : No judger interface</h5>
    <el-form @submit.prevent="register" :model="formData" :rules="rules" ref="form">
      <el-form-item prop="content">
        <el-input placeholder="答案" type="textarea" v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register" class="register-button">提交</el-button>
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
    register () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = {
            problemId: this.$route.params.problem_id,
            problemListId: this.$route.params.list_id,
            // FIXME : No judger interface
            judgerId: this.$route.params.list_id,
            body: this.formData.content
          }
          this.$emit('pending')
          superagent
          .post(configuration.url + '/submission')
          .withCredentials()
          .send(data)
          .end((err, res) => {
            if (err) {
              this.$emit('error', {code: -1, errors: 'network error'})
            } else {
              if (res.body.code === 0) {
                this.$emit('success')
              } else {
                this.$emit('error', res.body)
              }
            }
          })
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
.register-button {
  width: 100%
}
</style>

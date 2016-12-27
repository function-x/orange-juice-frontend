<template>
  <div class="judgeform">
    <el-form @judge.prevent="judge" :model="formData" :rules="rules" ref="form">
      <el-form-item prop="content">
        <el-input placeholder="判决结果" type="text" v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="judge" class="judge-button">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'element-ui'
import superagent from 'superagent'
import configuration from '../../configuration'

export default {
  name: 'judge-form',
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
    judge () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('pending')
          superagent
          .put(configuration.url + '/submission/' + this.$route.params.submission_id + '/sentence')
          .withCredentials()
          .send({sentence: this.formData.content})
          .end((err, res) => {
            if (err) this.$emit('error', '网络错误')
            else {
              if (res.body.code === 0) this.$emit('success')
              else this.$emit('error', 'API错误' + res.body.code)
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
.judge-button {
  width: 100%
}
</style>

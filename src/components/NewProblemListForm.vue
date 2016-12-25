<template>
  <div class="new-problem-form">
    <el-form :model="formData" :rules="rules" ref="form">
      <el-form-item prop="listname">
        <el-input placeholder="题单名" type="text" v-model="formData.listname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="create" class="new-problem-button">新题单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'element-ui'
import superagent from 'superagent'
import configuration from '../../configuration'

export default {
  name: 'new-problem-form',
  data () {
    return {
      formData: {
        listname: ''
      },
      rules: {
        listname: [
          { required: true, message: '请输入题单名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    create () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = {
            name: this.formData.listname
          }
          this.$emit('pending')
          superagent
          .post(configuration.url + '/problem_list')
          .withCredentials()
          .send(data)
          .end((err, res) => {
            if (err) {
              this.$emit('error', {code: -1, errors: '网络错误'})
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
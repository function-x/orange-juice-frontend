<template>
  <div class="registerform">
    <el-form @submit.prevent="register" :model="formData" :rules="rules" ref="form">
      <el-form-item prop="username">
        <el-input placeholder="用户名" type="text" v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input placeholder="邮箱" type="email" v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register" class="register-button">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'element-ui'
import superagent from 'superagent'
import configuration from '../../configuration'

export default {
  name: 'register-form',
  data () {
    return {
      formData: {
        username: '',
        email: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入Email', trigger: 'blur' },
          { type: 'email', message: 'Email格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 7, message: '请至少设置7位密码', trigger: 'blur' },
          { pattern: /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/, message: '密码必须同时包含字母和数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = {
            username: this.formData.username,
            email: this.formData.email,
            password: this.formData.password
          }
          this.$emit('pending')
          superagent
          .post(configuration.url + '/user')
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

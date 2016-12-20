<template>
  <div class="loginform">
    <el-form @submit.prevent="login" :model="formData" :rules="rules" ref="form">
      <el-form-item prop="username">
        <el-input placeholder="用户名" type="text" v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" class="login-button">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'element-ui'
import superagent from 'superagent'
import configuration from '../../configuration'

export default {
  name: 'login-form',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = {
            username: this.formData.username,
            password: this.formData.password
          }
          this.$emit('pending')
          superagent
          .post(configuration.url + '/user/sign-in')
          .withCredentials()
          .send(data)
          .end((err, res) => {
            if (err) {
              this.$emit('error', {code: -1, msg: 'network error'})
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
.login-button {
  width: 100%
}
</style>

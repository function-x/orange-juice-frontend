<template>
  <div class="loginform">
    <el-form :model="formData" :rules="rules" ref="form">
      <el-form-item prop="title">
        <el-input placeholder="题目标题" type="text" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item prop="description">
        <el-input placeholder="描述" type="textarea" v-model="formData.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" class="login-button">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'element-ui'
import superagent from 'superagent'
import configuration from '../../configuration'

export default {
  name: 'problem-form',
  data () {
    return {
      formData: {
        title: '',
        description: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.operation === 'create') this.create()
          else if (this.operation === 'edit') this.edit()
        }
      })
    },
    create () {
      let data = {
        title: this.formData.title,
        description: this.formData.description
      }
      this.$emit('pending')
      superagent
      .post(configuration.url + '/problem')
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
    },
    edit () {
      let data = {
        title: this.formData.title,
        description: this.formData.description
      }
      this.$emit('pending')
      superagent
      .put(configuration.url + '/problem/' + this.id)
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
  },
  props: [
    'title',
    'description',
    'operation',
    'id'
  ],
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElButton: Button
  },
  watch: {
    title (val) {
      this.formData.title = val
    },
    description (val) {
      this.formData.description = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-button {
  width: 100%
}
</style>

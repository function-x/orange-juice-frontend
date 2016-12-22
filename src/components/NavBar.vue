<template>
  <div class="nav">
    <el-menu mode="horizontal" @select="select" :default-active="activeItem">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item v-if="!username" index="/login">登录</el-menu-item>
      <el-menu-item v-if="!username" index="/register">注册</el-menu-item>
      <el-menu-item v-if="username" index="/profile">{{ username }}</el-menu-item>
      <el-menu-item v-if="username" index="/logout">退出</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { Menu, MenuItem } from 'element-ui'

export default {
  name: 'nav-bar',
  data () {
    return {
    }
  },
  methods: {
    select (index) {
      this.$emit('routeTo', index)
    }
  },
  components: {
    ElMenu: Menu,
    ElMenuItem: MenuItem
  },
  props: [
    'activeItem',
    'username'
  ]
}
</script>

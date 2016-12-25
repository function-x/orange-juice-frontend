<template>
  <div class="nav">
    <el-menu mode="horizontal" @select="select" :default-active="activeItem">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/lists">公共题单</el-menu-item>
      <div class="seperator"></div>
      <template v-if="!username">
        <el-menu-item index="/login">登录</el-menu-item>
        <el-menu-item index="/register">注册</el-menu-item>
      </template>
      <template v-else>
        <el-submenu index="user-menu">
          <template slot="title">{{ username }}</template>
          <el-menu-item index="/profile">个人信息</el-menu-item>
          <el-menu-item index="/logout">退出登录</el-menu-item>
        </el-submenu>
        <el-submenu index="problem-menu">
          <template slot="title">题目</template>
          <el-menu-item index="/problem/new">添加题目</el-menu-item>
          <el-menu-item index="/problems">我的题目</el-menu-item>
        </el-submenu>
        <el-menu-item index="/list/new">添加题单</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { Submenu, Menu, MenuItem } from 'element-ui'

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
    ElMenuItem: MenuItem,
    ElSubmenu: Submenu
  },
  props: [
    'activeItem',
    'username'
  ]
}
</script>

<style scoped>
.seperator {
  width: 3px;
  border-radius: 3px;
  margin: 5px 20px;
  height: 50px;
  background-color: #ddd ;
  float: left;
}
</style>

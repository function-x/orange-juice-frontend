<template>
  <div id="app">
    <nav-bar id="nav-bar" :active-item="currentPath" @routeTo="route" :username="user"></nav-bar>
    <router-view @routeTo="route" @login="updateLoginState" @logout="updateLoginState" :username="user" :userid="userid"></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import router from './router'
import superagent from 'superagent'
import configuration from '../configuration'

export default {
  name: 'app',
  data () {
    return {
      currentPath: router.currentRoute.path,
      user: '',
      userid: ''
    }
  },
  components: {
    NavBar
  },
  methods: {
    route (path) {
      router.push({path})
      this.currentPath = router.currentRoute.path
    },
    updateLoginState () {
      superagent
      .get(configuration.url + '/user/profile')
      .withCredentials()
      .end((err, res) => {
        if (!err && res.body.code === 0) {
          this.user = res.body.user.username
          this.userid = res.body.user._id
        } else {
          this.user = ''
          this.userid = ''
        }
      })
    }
  },
  created () {
    this.updateLoginState()
  }
}
</script>

<style>
#nav-bar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 1;
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
}
</style>

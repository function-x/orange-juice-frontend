import VueRouter from 'vue-router'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import RegisterPage from './components/RegisterPage'
import LogoutPage from './components/LogoutPage'
import ProfilePage from './components/ProfilePage'

export default new VueRouter({
  routes: [
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/register',
      component: RegisterPage
    },
    {
      path: '/logout',
      component: LogoutPage
    },
    {
      path: '/profile',
      component: ProfilePage
    }
  ]
})

import VueRouter from 'vue-router'

import HomePage from './components/HomePage'

import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'

import LogoutPage from './components/LogoutPage'
import ProfilePage from './components/ProfilePage'

import NewProblemPage from './components/NewProblemPage'
import ProblemsPage from './components/ProblemsPage'

import SingleProblemPage from './components/SingleProblemPage'
import DeleteProblemPage from './components/DeleteProblemPage'
import EditProblemPage from './components/EditProblemPage'

import NewProblemListPage from './components/NewProblemListPage'
import ProblemListsPage from './components/ProblemListsPage'
import SingleProblemListPage from './components/SingleProblemListPage'
import AddProblemToListPage from './components/AddProblemToListPage'
import DoAddProblemToListPage from './components/DoAddProblemToListPage'

import ListProblemViewPage from './components/ListProblemViewPage'
import ListProblemSubmitPage from './components/ListProblemSubmitPage'

import SubmissionsPage from './components/SubmissionsPage'
import SubmissionJudgePage from './components/SubmissionJudgePage'

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/login',
      component: LoginPage
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
    },
    {
      path: '/problem/new',
      component: NewProblemPage
    },
    {
      path: '/problems',
      component: ProblemsPage
    },
    {
      path: '/problems/:id',
      component: SingleProblemPage
    },
    {
      path: '/problems/:id/delete',
      component: DeleteProblemPage
    },
    {
      path: '/problems/:id/edit',
      component: EditProblemPage
    },
    {
      path: '/list/new',
      component: NewProblemListPage
    },
    {
      path: '/lists',
      component: ProblemListsPage
    },
    {
      path: '/lists/:id',
      component: SingleProblemListPage
    },
    {
      path: '/lists/:id/add',
      component: AddProblemToListPage
    },
    {
      path: '/lists/:list_id/add/:problem_id',
      component: DoAddProblemToListPage
    },
    {
      path: '/lists/:list_id/view/:problem_id',
      component: ListProblemViewPage
    },
    {
      path: '/lists/:list_id/submit/:problem_id',
      component: ListProblemSubmitPage
    },
    {
      path: '/:list_id/submissions',
      component: SubmissionsPage
    },
    {
      path: '/judge/:submission_id',
      component: SubmissionJudgePage
    }
  ]
})

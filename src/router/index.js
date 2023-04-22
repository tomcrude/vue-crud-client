import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import LogInView from '../views/Authentication/LogInView.vue'
import RegisterView from '../views/Authentication/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import CreateReviewView from '../views/Review/CreateReviewView.vue'
import ErrorView from "../views/ErrorView.vue"
import ReviewDetailsView from '../views/Review/ReviewDetailsView.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/logIn',
    name: 'login',
    component: LogInView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/review/create/:id',
    name: 'create',
    component: CreateReviewView
  },
  {
    path: '/review/:id',
    name: 'review',
    component: ReviewDetailsView
  },
  {
    path: "/:catchAll(.*)",
      name: "NotFound",
      component: ErrorView,
      meta: {
        requiresAuth: false
      }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {

  const user = localStorage.getItem("username")

  if (to.name == "review" && user == null || to.name == "create" && user == null || to.name == "home" && user == null){
    return {name: 'main'}
  }
  else if (to.name == "main" && user != null || to.name == "login" && user != null || to.name == "register" && user != null){
    return {name: 'home'}
  }

})

export default router

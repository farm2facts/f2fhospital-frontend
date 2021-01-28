import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'
import Welcome from '../views/Welcome.vue'
import ProfileForm from '../views/ProfileForm.vue'
import UserProfile from '../views/UserProfile.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/profile_form',
    name: 'ProfileForm',
    component: ProfileForm
  },
  {
    path: 'user_profile',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

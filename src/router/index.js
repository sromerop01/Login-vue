import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import { useUserStore } from '../stores/user'

const requireAuth = async (to, from, next) =>{
  const useUser = useUserStore()
  useUser.loadingSession = true
  const user = await useUser.currentUser()
  if (user) {
    next()
  } else {
    next('/login')
  }
  useUser.loadingSession = false
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
  ]
})

export default router

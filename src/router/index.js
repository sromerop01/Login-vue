import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Edit from '../views/Edit.vue'

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
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit,
      beforeEnter: requireAuth
    },
  ]
})

export default router

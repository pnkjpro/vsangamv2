import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../views/admin/AdminLayout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Homepage.vue')
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', name: 'dashboard', component: () => import('@/views/Dashboard.vue') }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
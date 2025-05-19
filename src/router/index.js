import { createRouter, createWebHistory } from 'vue-router'

// Import your views
import Dashboard from '@/views/Dashboard.vue'
import Profile from '@/views/Profile.vue'
import Settings from '@/views/Settings.vue'
import Monitoring from '@/views/Monitoring.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/monitoring',
    name: 'Monitoring',
    component: Monitoring,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/dashboard', // fallback to dashboard
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore';
import AdminLayout from '../pages/Admin/AdminLayout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Homepage.vue')
  },
  {
      path: '',
      redirect: '/auth/'
    },
    // =============== Authentication Routes ================
    {
      path: '/auth/',
      redirect: '/auth/login',
      children: [
        {
          path: '',
          redirect: '/auth/login'
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/pages/Auth/Login.vue'),
          meta: { guestOnly: true, showChatbot: true }
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/pages/Auth/Register.vue'),
          meta: { guestOnly: true, showChatbot: true }
        },
        {
          path: 'password/forgot',
          name: 'ForgotPassword',
          component: () => import('@/pages/Auth/ForgotPassword.vue'),
          // meta: { guestOnly: true }
        },
        {
          path: 'password/reset',
          name: 'ResetPassword',
          component: () => import('@/pages/Auth/ResetPassword.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'otp/verify',
          name: 'OtpVerify',
          component: () => import('@/pages/Auth/VerifyOtp.vue'),
          meta: { guestOnly: true }
        }
      ]
    },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', name: 'dashboard', component: () => import('@/pages/Dashboard.vue') }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Authentication check
router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // Check if user is already fetched
  if (!authStore.user) {
    try {
      await authStore.fetchUser();
    } catch (error) {
      console.log('User not authenticated');
    }
  }

  if (!from.name && to.name !== 'Home' && to.name !== 'Login' && !to.meta.requiresAdminAuth) {
    return next({ name: 'Home' });
  }
  
  
  const isAuthenticated = !!authStore.user;
  const isAdmin = authStore.user?.is_admin || 0;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/auth/login' });
  } else if (to.meta.requiresAdminAuth && isAuthenticated && !isAdmin){
    next({ name: 'Home'});
  } else if (to.meta.guestOnly && isAuthenticated) {
    next({ path: '/home' });
  } else {
    next();
  }
});

export default router
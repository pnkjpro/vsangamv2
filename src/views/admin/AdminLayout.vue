<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Mobile Menu Overlay -->
    <div 
      v-if="sidebarOpen" 
      @click="closeSidebar" 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center justify-between h-20 px-6 border-b border-slate-200/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <i class="fas fa-bolt text-white text-lg"></i>
          </div>
          <div>
            <h1 class="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              AdminFlow
            </h1>
            <p class="text-xs text-slate-500">Management Suite</p>
          </div>
        </div>
        <button 
          @click="closeSidebar" 
          class="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <i class="fas fa-times text-slate-500"></i>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-2">
        <div class="mb-6">
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
            Main Menu
          </p>
          <div class="space-y-1">
            <router-link
              v-for="item in mainMenuItems"
              :key="item.id"
              :to="item.path"
              @click="closeSidebar"
              :class="[
                'w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group',
                $route.path === item.path 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              ]"
            >
              <i :class="[item.icon, 'mr-3 text-base']"></i>
              {{ item.name }}
              <div v-if="item.badge" class="ml-auto">
                <span class="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                  {{ item.badge }}
                </span>
              </div>
            </router-link>
          </div>
        </div>

        <div>
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
            Tools
          </p>
          <div class="space-y-1">
            <router-link
              v-for="item in toolMenuItems"
              :key="item.id"
              :to="item.path"
              @click="closeSidebar"
              :class="[
                'w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                $route.path === item.path 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              ]"
            >
              <i :class="[item.icon, 'mr-3 text-base']"></i>
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </nav>

      <!-- User Profile -->
      <div class="absolute bottom-4 left-4 right-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200/50">
        <div class="flex items-center space-x-3">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
            alt="Profile" 
            class="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-md"
          >
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-slate-900 truncate">John Doe</p>
            <p class="text-xs text-slate-500 truncate">Administrator</p>
          </div>
          <button class="p-1 text-slate-400 hover:text-slate-600 transition-colors">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="lg:ml-72">
      <!-- Header -->
      <header class="bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 sticky top-0 z-30">
        <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div class="flex items-center space-x-4">
            <button 
              @click="toggleSidebar" 
              class="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <i class="fas fa-bars text-slate-600"></i>
            </button>
            <div>
              <h2 class="text-xl font-semibold text-slate-900 capitalize">{{ $route.name || 'dashboard' }}</h2>
              <p class="text-sm text-slate-500">{{ getCurrentPageDescription() }}</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <!-- Search -->
            <div class="hidden sm:block relative">
              <input 
                type="text" 
                placeholder="Search..." 
                class="w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
            </div>

            <!-- Notifications -->
            <div class="relative">
              <button 
                @click="toggleNotifications" 
                class="relative p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <i class="fas fa-bell text-slate-600"></i>
                <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              <!-- Notifications Dropdown -->
              <div 
                v-if="showNotifications" 
                class="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200 notifications-dropdown"
              >
                <div class="p-4 border-b border-slate-200">
                  <h3 class="font-semibold text-slate-900">Notifications</h3>
                  <p class="text-sm text-slate-500">You have 3 unread messages</p>
                </div>
                <div class="max-h-80 overflow-y-auto">
                  <div 
                    v-for="notification in notifications" 
                    :key="notification.id"
                    class="p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                  >
                    <div class="flex space-x-3">
                      <div :class="[notification.color, 'w-2 h-2 rounded-full mt-2 flex-shrink-0']"></div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-slate-900">{{ notification.title }}</p>
                        <p class="text-sm text-slate-500 mt-1">{{ notification.message }}</p>
                        <p class="text-xs text-slate-400 mt-2">{{ notification.time }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-3 border-t border-slate-200">
                  <button class="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            </div>

            <!-- Profile -->
            <button class="flex items-center space-x-2 p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
                alt="Profile" 
                class="w-8 h-8 rounded-full object-cover"
              >
              <i class="fas fa-chevron-down text-slate-400 text-xs hidden sm:block"></i>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="p-4 sm:p-6 lg:p-8">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// Reactive state
const sidebarOpen = ref(false)
const showNotifications = ref(false)
const route = useRoute()

// Menu items with routes
const mainMenuItems = ref([
  { id: 'dashboard', name: 'Dashboard', icon: 'fas fa-home', path: '/admin/dashboard' },
  { id: 'analytics', name: 'Analytics', icon: 'fas fa-chart-bar', path: '/admin/analytics' },
  { id: 'users', name: 'Users', icon: 'fas fa-users', badge: '12', path: '/admin/users' },
  { id: 'products', name: 'Products', icon: 'fas fa-box', path: '/admin/products' },
  { id: 'orders', name: 'Orders', icon: 'fas fa-shopping-bag', path: '/admin/orders' },
  { id: 'messages', name: 'Messages', icon: 'fas fa-envelope', badge: '3', path: '/admin/messages' }
])

const toolMenuItems = ref([
  { id: 'settings', name: 'Settings', icon: 'fas fa-cog', path: '/admin/settings' },
  { id: 'help', name: 'Help Center', icon: 'fas fa-question-circle', path: '/admin/help' },
  { id: 'reports', name: 'Reports', icon: 'fas fa-file-alt', path: '/admin/reports' }
])

// Mock data for notifications
const notifications = ref([
  {
    id: 1,
    title: 'New Order Received',
    message: 'Order #12345 has been placed by John Doe',
    time: '2 minutes ago',
    color: 'bg-green-500'
  },
  {
    id: 2,
    title: 'Payment Completed',
    message: 'Payment of $299 has been processed successfully',
    time: '1 hour ago',
    color: 'bg-blue-500'
  },
  {
    id: 3,
    title: 'System Maintenance',
    message: 'Scheduled maintenance will begin at 2:00 AM',
    time: '3 hours ago',
    color: 'bg-orange-500'
  }
])

// Methods
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const getCurrentPageDescription = () => {
  const descriptions = {
    dashboard: 'Overview of your business metrics',
    analytics: 'Detailed analytics and insights',
    users: 'Manage your users and customers',
    products: 'Product catalog and inventory',
    orders: 'Order management and tracking',
    messages: 'Customer communication hub',
    settings: 'System configuration and preferences',
    help: 'Support and documentation',
    reports: 'Generate and download reports'
  }
  return descriptions[route.name] || 'Manage your business'
}

// Handle click outside to close dropdowns
const handleClickOutside = (event) => {
  if (showNotifications.value && !event.target.closest('.notifications-dropdown')) {
    showNotifications.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeIn 0.2s ease-out;
}

.slide-in-from-top-2 {
  animation: slideIn 0.3s ease-out;
}
</style>
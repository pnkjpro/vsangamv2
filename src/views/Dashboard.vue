<template>
  <div class="space-y-8">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="(stat, index) in stats" 
        :key="stat.title"
        class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-md transition-all duration-300 group"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-slate-600 mb-1">{{ stat.title }}</p>
            <p class="text-3xl font-bold text-slate-900 mb-2">{{ stat.value }}</p>
            <div class="flex items-center space-x-2">
              <span class="text-sm font-medium text-emerald-600">{{ stat.change }}</span>
              <span class="text-xs text-slate-500">vs last month</span>
            </div>
          </div>
          <div :class="[stat.bgColor, 'p-3 rounded-xl']">
            <i :class="[stat.icon, stat.textColor, 'text-xl']"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Revenue Chart -->
      <div class="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-slate-900">Revenue Overview</h3>
            <p class="text-sm text-slate-500">Monthly revenue trends</p>
          </div>
          <div class="flex items-center space-x-2">
            <button class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">6M</button>
            <button class="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-lg">1Y</button>
          </div>
        </div>
        <div class="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
          <div class="text-center">
            <i class="fas fa-chart-area text-4xl text-blue-400 mb-4"></i>
            <p class="text-slate-500">Chart visualization</p>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
        <h3 class="text-lg font-semibold text-slate-900 mb-6">Top Products</h3>
        <div class="space-y-4">
          <div 
            v-for="(product, index) in topProducts" 
            :key="product.id"
            class="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center">
                <span class="text-sm font-bold text-slate-600">{{ index + 1 }}</span>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-slate-900 truncate">{{ product.name }}</p>
              <p class="text-sm text-slate-500">{{ product.sales }} sales</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-slate-900">${{ product.revenue }}</p>
              <p class="text-xs text-emerald-600">+{{ product.growth }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200/50 overflow-hidden">
      <div class="p-6 border-b border-slate-200">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-slate-900">Recent Activity</h3>
            <p class="text-sm text-slate-500">Latest user interactions</p>
          </div>
          <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="activity in recentActivity" :key="activity.id" class="hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="activity.avatar" :alt="activity.user" class="w-8 h-8 rounded-full object-cover">
                  <div class="ml-4">
                    <div class="text-sm font-medium text-slate-900">{{ activity.user }}</div>
                    <div class="text-sm text-slate-500">{{ activity.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ activity.action }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusColor(activity.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ activity.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ activity.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { 
    title: 'Total Revenue', 
    value: '$54,239', 
    change: '+12.5%', 
    icon: 'fas fa-dollar-sign', 
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600'
  },
  { 
    title: 'Active Users', 
    value: '12,847', 
    change: '+8.2%', 
    icon: 'fas fa-users', 
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600'
  },
  { 
    title: 'Total Orders', 
    value: '3,429', 
    change: '+23.1%', 
    icon: 'fas fa-shopping-bag', 
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600'
  },
  { 
    title: 'Conversion Rate', 
    value: '4.8%', 
    change: '+2.4%', 
    icon: 'fas fa-chart-line', 
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600'
  }
])

const topProducts = ref([
  { id: 1, name: 'Wireless Headphones', sales: 1234, revenue: '45,678', growth: 12 },
  { id: 2, name: 'Smart Watch', sales: 987, revenue: '32,456', growth: 8 },
  { id: 3, name: 'Laptop Stand', sales: 756, revenue: '28,934', growth: 15 },
  { id: 4, name: 'USB-C Hub', sales: 543, revenue: '19,876', growth: 5 },
  { id: 5, name: 'Desk Lamp', sales: 432, revenue: '15,432', growth: 3 }
])

const recentActivity = ref([
  {
    id: 1,
    user: 'Sarah Johnson',
    email: 'sarah@example.com',
    action: 'Created new order',
    status: 'Completed',
    time: '2 min ago',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612cf02?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 2,
    user: 'Michael Chen',
    email: 'michael@example.com',
    action: 'Updated profile',
    status: 'Processing',
    time: '5 min ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 3,
    user: 'Emily Davis',
    email: 'emily@example.com',
    action: 'Downloaded report',
    status: 'Completed',
    time: '10 min ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 4,
    user: 'David Wilson',
    email: 'david@example.com',
    action: 'Cancelled subscription',
    status: 'Failed',
    time: '15 min ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  }
])

const getStatusColor = (status) => {
  const colors = {
    'Completed': 'bg-green-100 text-green-800',
    'Processing': 'bg-yellow-100 text-yellow-800',
    'Failed': 'bg-red-100 text-red-800',
    'Pending': 'bg-blue-100 text-blue-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}
</script>
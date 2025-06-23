<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-mint-50 flex flex-col items-center relative overflow-hidden" style="background: linear-gradient(135deg, #EFF6FF 0%, #FFF7ED 50%, #ECFDF5 100%);">
    <!-- Background pattern -->
    <div class="relative inset-0 opacity-8">
      <div v-for="i in 18" :key="i" class="absolute animate-pulse" :style="{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        transform: `rotate(${Math.random() * 360}deg)`,
        animationDelay: `${Math.random() * 4}s`
      }">
        <div class="text-2xl" :style="{ color: ['#2A4D9B', '#FF914D', '#A7F3D0'][Math.floor(Math.random() * 3)] + '40' }">
          {{ ['📚', '🎓', '💡', '🔬', '📊', '✨', '🌟', '⭐', '💫', '🚀'][Math.floor(Math.random() * 10)] }}
        </div>
      </div>
    </div>

    <!-- Logo Area -->
    <div class="mt-12 mb-8 z-10">
      <div class="flex items-center justify-center">
        <div class="text-6xl font-bold tracking-tight">
          <span style="color: #2A4D9B;">v</span><span style="color: #FF914D;">Sangam</span>
        </div>
      </div>
      <div class="text-center mt-3 text-lg font-medium tracking-wide" style="color: #333333;">
        Sangam of Knowledge and Growth
      </div>
    </div>

    <!-- Reset Password Form -->
    <div class="bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-11/12 max-w-md shadow-2xl border border-white/30" style="box-shadow: 0 25px 50px -12px rgba(42, 77, 155, 0.15);">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2" style="color: #333333;">Reset Password</h1>
        <p class="text-gray-600">Create a new password for your account</p>
      </div>
      
      <form @submit.prevent="handleResetPassword" class="space-y-6">
        <div class="relative">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="New Password" 
            class="w-full border-2 py-4 px-6 rounded-xl text-gray-700 transition duration-200 focus:outline-none"
            style="background-color: #F9F9F9; border-color: #E5E7EB; color: #333333;"
            :style="{ 
              'border-color': form.password ? '#2A4D9B' : '#E5E7EB',
              'box-shadow': form.password ? '0 0 0 3px rgba(42, 77, 155, 0.1)' : 'none'
            }"
            v-model="form.password"
            :disabled="authStore.loading"
            required
          />
          <button 
            type="button" 
            @click="togglePassword" 
            class="absolute right-4 top-1/2 transform -translate-y-1/2"
            style="color: #FF914D;"
          >
            <font-awesome-icon :icon="showPassword ? 'eye' : 'eye-slash'" />
          </button>
        </div>
        
        <div class="relative">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Confirm Password" 
            class="w-full border-2 py-4 px-6 rounded-xl text-gray-700 transition duration-200 focus:outline-none"
            style="background-color: #F9F9F9; border-color: #E5E7EB; color: #333333;"
            :style="{ 
              'border-color': form.confirmPassword ? '#2A4D9B' : '#E5E7EB',
              'box-shadow': form.confirmPassword ? '0 0 0 3px rgba(42, 77, 155, 0.1)' : 'none'
            }"
            v-model="form.confirmPassword"
            :disabled="authStore.loading"
            required
          />
          <button 
            type="button" 
            @click="togglePassword" 
            class="absolute right-4 top-1/2 transform -translate-y-1/2"
            style="color: #FF914D;"
          >
            <font-awesome-icon :icon="showPassword ? 'eye' : 'eye-slash'" />
          </button>
        </div>
        
        <!-- Minimalist Attractive Submit Button -->
        <button 
          type="submit" 
          :class="[
            'w-full text-white py-4 px-6 rounded-xl font-medium text-lg transition-all duration-300 transform relative overflow-hidden group',
            'hover:scale-[1.01] active:scale-[0.99]',
            { 'cursor-not-allowed opacity-80': authStore.loading }
          ]"
          :style="{ 
            background: authStore.loading 
              ? '#94A3B8' 
              : 'linear-gradient(135deg, #2A4D9B 0%, #FF914D 100%)',
            boxShadow: authStore.loading 
              ? '0 4px 12px rgba(148, 163, 184, 0.25)' 
              : '0 4px 15px rgba(42, 77, 155, 0.3)',
            border: 'none'
          }"
          :disabled="authStore.loading"
        >
          <!-- Subtle hover overlay -->
          <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          
          <!-- Content -->
          <div class="relative flex items-center justify-center">
            <div v-if="authStore.loading" class="flex items-center space-x-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="font-medium">Updating...</span>
            </div>
            <div v-else class="flex items-center space-x-2">
              <span class="font-medium">Reset Password</span>
              <svg class="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </div>
          </div>
        </button>
      </form>
    </div>
    
    <!-- Back to Login Option -->
    <div class="mt-8 mb-12 text-center">
      <span style="color: #333333;">Remember your password? </span>
      <button 
        type="button"
        @click="goToLogin" 
        class="font-semibold transition duration-200 hover:underline"
        style="color: #FF914D;"
      >
        Back to Login
      </button>
    </div>

    <!-- Floating Elements -->
    <div class="absolute top-20 left-10 w-24 h-24 rounded-full blur-2xl animate-pulse" style="background-color: rgba(42, 77, 155, 0.1);"></div>
    <div class="absolute bottom-32 right-16 w-20 h-20 rounded-full blur-2xl animate-pulse" style="background-color: rgba(255, 145, 77, 0.15); animation-delay: 1.5s;"></div>
    <div class="absolute top-1/2 left-8 w-16 h-16 rounded-full blur-2xl animate-pulse" style="background-color: rgba(167, 243, 208, 0.2); animation-delay: 2.5s;"></div>
    <div class="absolute top-1/3 right-12 w-14 h-14 rounded-full blur-xl animate-pulse" style="background-color: rgba(173, 232, 244, 0.2); animation-delay: 0.8s;"></div>

    <!-- Educational Icons Floating -->
    <div class="absolute top-16 right-20 opacity-20 animate-bounce" style="animation-delay: 3s; animation-duration: 4s;">
      <div class="text-3xl" style="color: #2A4D9B;">🎓</div>
    </div>
    <div class="absolute bottom-40 left-12 opacity-20 animate-bounce" style="animation-delay: 1s; animation-duration: 5s;">
      <div class="text-2xl" style="color: #FF914D;">📚</div>
    </div>
    <div class="absolute top-2/3 right-8 opacity-20 animate-bounce" style="animation-delay: 2s; animation-duration: 3s;">
      <div class="text-2xl" style="color: #A7F3D0;">💡</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from 'vue-toastification';

// Form data
const form = ref({
  password: '',
  confirmPassword: ''
});

// UI states
const showPassword = ref(false);
const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Handle form submission
const handleResetPassword = async () => {
    // Basic validation
    if (!form.value.password) {
      toast.error('Please enter a new password');
      return;
    }
    
    if (form.value.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    if (!form.value.confirmPassword) {
      toast.error('Please confirm your password');
      return;
    }

    // Call auth store method to reset password
    const result = await authStore.resetPassword({
      password: form.value.password,
      password_confirmation: form.value.confirmPassword
    });

    if(!result.success){
      toast.error(result.message);
      return;
    } else {
      toast.success('Password has been reset successfully!');
      
      // Redirect to login after a delay
      setTimeout(() => {
        router.push({ name: 'Home' });
      }, 2000);
    }
};

// Navigate to login page
const goToLogin = () => {
  router.push({ name: 'Login' });
};
</script>

<style scoped>
/* Clean, minimal animations */
button:hover {
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0px);
}
</style>
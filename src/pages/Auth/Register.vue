<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-mint-50 flex flex-col items-center relative overflow-hidden" style="background: linear-gradient(135deg, #EFF6FF 0%, #FFF7ED 50%, #ECFDF5 100%);">
    <!-- Background pattern -->
    <div class="relative inset-0 opacity-8">
      <div v-for="i in 20" :key="i" class="absolute animate-pulse" :style="{
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
    <div class="mt-12 mb-6 z-10">
      <div class="flex items-center justify-center">
        <div class="text-6xl font-bold tracking-tight">
          <span style="color: #2A4D9B;">v</span><span style="color: #FF914D;">Sangam</span>
        </div>
      </div>
      <div class="text-center mt-3 text-lg font-medium tracking-wide" style="color: #333333;">
        Sangam of Knowledge and Growth
      </div>
    </div>

    <!-- Registration Form -->
    <div class="bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-11/12 max-w-md shadow-2xl border border-white/30 mb-8" style="box-shadow: 0 25px 50px -12px rgba(42, 77, 155, 0.15);">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold mb-2" style="color: #333333;">Join the Community!</h1>
        <p class="text-gray-600">Start your learning journey with us</p>
      </div>
      
      <form @submit.prevent="handleRegistration" class="space-y-4">
        <!-- Name Field -->
        <div class="relative">
          <input 
            type="text" 
            placeholder="Full Name" 
            class="w-full border-2 py-4 px-6 rounded-xl text-gray-700 transition duration-200 focus:outline-none"
            style="background-color: #F9F9F9; border-color: #E5E7EB; color: #333333;"
            :style="{ 
              'border-color': form.name ? '#2A4D9B' : '#E5E7EB',
              'box-shadow': form.name ? '0 0 0 3px rgba(42, 77, 155, 0.1)' : 'none'
            }"
            v-model="form.name"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Contact Number Field -->
        <div class="relative">
          <input 
            type="number" 
            placeholder="Contact Number" 
            class="w-full border-2 py-4 px-6 rounded-xl text-gray-700 transition duration-200 focus:outline-none"
            style="background-color: #F9F9F9; border-color: #E5E7EB; color: #333333;"
            :style="{ 
              'border-color': form.mobile ? '#2A4D9B' : '#E5E7EB',
              'box-shadow': form.mobile ? '0 0 0 3px rgba(42, 77, 155, 0.1)' : 'none'
            }"
            v-model="form.mobile"
          />
          <p v-if="errors.mobile" class="text-red-500 text-sm mt-1">{{ errors.mobile }}</p>
        </div>

        <!-- Email Field -->
        <div class="relative">
          <input 
            type="email" 
            placeholder="Email Address" 
            class="w-full border-2 py-4 px-6 rounded-xl text-gray-700 transition duration-200 focus:outline-none"
            style="background-color: #F9F9F9; border-color: #E5E7EB; color: #333333;"
            :style="{ 
              'border-color': form.email ? '#2A4D9B' : '#E5E7EB',
              'box-shadow': form.email ? '0 0 0 3px rgba(42, 77, 155, 0.1)' : 'none'
            }"
            v-model="form.email"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>
        
        <!-- Password Field -->
        <div class="relative">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Password" 
            class="w-full border-2 py-4 px-6 rounded-xl text-gray-700 transition duration-200 focus:outline-none"
            style="background-color: #F9F9F9; border-color: #E5E7EB; color: #333333;"
            :style="{ 
              'border-color': form.password ? '#2A4D9B' : '#E5E7EB',
              'box-shadow': form.password ? '0 0 0 3px rgba(42, 77, 155, 0.1)' : 'none'
            }"
            v-model="form.password"
          />
          <button 
            type="button" 
            @click="togglePassword" 
            class="absolute right-4 top-1/2 transform -translate-y-1/2 transition duration-200"
            style="color: #FF914D;"
            :style="{ color: showPassword ? '#2A4D9B' : '#FF914D' }"
          >
            <font-awesome-icon :icon="showPassword ? 'eye' : 'eye-slash'" />
          </button>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Confirm Password Field -->
        <div class="relative">
          <input 
            :type="showConfirmPassword ? 'text' : 'password'" 
            placeholder="Confirm Password" 
            class="w-full border-2 py-4 px-6 rounded-xl text-gray-700 transition duration-200 focus:outline-none"
            style="background-color: #F9F9F9; border-color: #E5E7EB; color: #333333;"
            :style="{ 
              'border-color': form.password_confirmation ? '#2A4D9B' : '#E5E7EB',
              'box-shadow': form.password_confirmation ? '0 0 0 3px rgba(42, 77, 155, 0.1)' : 'none'
            }"
            v-model="form.password_confirmation"
          />
          <button 
            type="button" 
            @click="toggleConfirmPassword" 
            class="absolute right-4 top-1/2 transform -translate-y-1/2 transition duration-200"
            style="color: #FF914D;"
            :style="{ color: showConfirmPassword ? '#2A4D9B' : '#FF914D' }"
          >
            <font-awesome-icon :icon="showConfirmPassword ? 'eye' : 'eye-slash'" />
          </button>
          <p v-if="errors.password_confirmation" class="text-red-500 text-sm mt-1">{{ errors.password_confirmation }}</p>
        </div>

        <!-- Referral Code Field -->
        <div class="relative">
          <input 
            type="text" 
            placeholder="Referral Code (Optional)" 
            class="w-full border-2 py-4 px-6 rounded-xl text-gray-700 transition duration-200 focus:outline-none"
            style="background-color: #F9F9F9; border-color: #E5E7EB; color: #333333;"
            :style="{ 
              'border-color': form.refer_code ? '#2A4D9B' : '#E5E7EB',
              'box-shadow': form.refer_code ? '0 0 0 3px rgba(42, 77, 155, 0.1)' : 'none'
            }"
            v-model="form.refer_code"
          />
          <p v-if="errors.refer_code" class="text-red-500 text-sm mt-1">{{ errors.refer_code }}</p>
        </div>
        
        <!-- Minimalist Register Button -->
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
              <span class="font-medium">Creating Account...</span>
            </div>
            <div v-else class="flex items-center space-x-2">
              <span class="font-medium">Create Account</span>
              <svg class="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </div>
          </div>
        </button>
      </form>

      <!-- Divider -->
      <div class="my-6 flex items-center">
        <div class="flex-1 border-t border-gray-200"></div>
        <span class="px-4 text-sm text-gray-500">or register with</span>
        <div class="flex-1 border-t border-gray-200"></div>
      </div>

      <!-- Social Registration Options -->
      <div class="space-y-3">
        <button class="w-full bg-white border-2 py-3 px-6 rounded-xl flex items-center justify-center transition duration-200 group hover:shadow-md" 
                style="border-color: #E5E7EB; color: #333333;">
          <font-awesome-icon :icon="['fab', 'google']" class="mr-3 text-lg text-red-500 group-hover:scale-110 transition duration-200" />
          <span>Continue with Google</span>
        </button>
        
        <button class="w-full bg-white border-2 py-3 px-6 rounded-xl flex items-center justify-center transition duration-200 group hover:shadow-md"
                style="border-color: #E5E7EB; color: #333333;">
          <font-awesome-icon :icon="['fab', 'facebook']" class="mr-3 text-lg text-blue-600 group-hover:scale-110 transition duration-200" />
          <span>Continue with Facebook</span>
        </button>
      </div>
    </div>
    
    <!-- Login Option -->
    <div class="mb-12 text-center">
      <span style="color: #333333;">Already have an account? </span>
      <button 
        @click="navigateTo('/auth/login')" 
        class="font-semibold transition duration-200 hover:underline"
        style="color: #FF914D;"
      >
        Sign In Now
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
    <div class="absolute bottom-48 left-12 opacity-20 animate-bounce" style="animation-delay: 1s; animation-duration: 5s;">
      <div class="text-2xl" style="color: #FF914D;">📚</div>
    </div>
    <div class="absolute top-2/3 right-8 opacity-20 animate-bounce" style="animation-delay: 2s; animation-duration: 3s;">
      <div class="text-2xl" style="color: #A7F3D0;">💡</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import * as yup from "yup";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useToast } from 'vue-toastification';

// Add icons to the library
library.add(faEye, faEyeSlash, faGoogle, faFacebook);

const router = useRouter();
const route = useRoute();
const toast = useToast();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const errors = ref({});

// Validation Schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
    password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

// Validate Form before Submission
const validateForm = async () => {
  try {
    await schema.validate(form.value, { abortEarly: false });
    errors.value = {}; // Clear errors if validation passes
    return true;
  } catch (validationErrors) {
    const formattedErrors = {};
    validationErrors.inner.forEach((err) => {
      formattedErrors[err.path] = err.message;
    });
    errors.value = formattedErrors;
    return false;
  }
};

// Reactive state
const form = ref({
  name: "",
  mobile: null,
  email: "",
  password: "",
  password_confirmation: "",
  refer_code: "",
})

if(route.query.refer_code){
  form.value.refer_code = route.query.refer_code;
}

const handleRegistration = async () => {
  const isValid = await validateForm();
  if (!isValid) return;

  const result = await authStore.register(form);

  if (!result.success) {
    const messages = result.message;

    if (typeof messages === 'object' && messages !== null && !Array.isArray(messages)) {
      Object.values(messages).forEach((msgArray, index) => {
        msgArray.forEach((msg, innerIndex) => {
          setTimeout(() => toast.error(msg), (index + innerIndex) * 300);
        });
      });
    } else if (Array.isArray(messages)) {
      messages.forEach((msg, index) => {
        setTimeout(() => toast.error(msg), index * 300);
      });
    } else {
      toast.error(messages);
    }

    return;
  }

  navigateTo('/auth/otp/verify');
};

const navigateTo = (path) => {
  router.push(path);
}

const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Methods
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
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

/* Remove number input arrows */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
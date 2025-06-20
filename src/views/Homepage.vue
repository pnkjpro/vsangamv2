<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Section -->
    <section class="relative py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="text-center lg:text-left space-y-8">
            <div class="space-y-4">
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Join India's <span class="text-indigo-600">Smartest Way</span> to Practice PYQs & Mock Tests
              </h1>
              <p class="text-xl text-gray-600 max-w-2xl">
                Get test-ready with previous year questions and full mock sets designed by experts
              </p>
            </div>

            <!-- Mobile Input Form -->
            <div class="max-w-md mx-auto lg:mx-0">
              <div class="flex flex-col sm:flex-row gap-3">
                <div class="flex-1">
                  <input
                    v-model="mobileNumber"
                    type="tel"
                    placeholder="Enter mobile number"
                    maxlength="10"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    :class="{
                      'border-red-500 focus:ring-red-500': showError,
                      'border-green-500 focus:ring-green-500': showSuccess
                    }"
                    @input="handleInput"
                  />
                  <div v-if="showError" class="mt-1 text-sm text-red-600">
                    {{ errorMessage }}
                  </div>
                  <div v-if="showSuccess" class="mt-1 text-sm text-green-600">
                    Great! We'll contact you soon.
                  </div>
                </div>
                <button
                  @click="handleJoinFree"
                  class="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 transform hover:scale-105 active:scale-95"
                  :class="{
                    'animate-pulse bg-indigo-500': isSubmitting,
                    'cursor-not-allowed opacity-50': isSubmitting
                  }"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Joining...' : 'Join Free' }}
                </button>
              </div>
            </div>

            <!-- Stats -->
            <div class="flex justify-center lg:justify-start space-x-8 pt-8">
              <div class="text-center">
                <div class="text-2xl font-bold text-indigo-600">50K+</div>
                <div class="text-sm text-gray-600">Students</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-indigo-600">1000+</div>
                <div class="text-sm text-gray-600">Mock Tests</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-indigo-600">95%</div>
                <div class="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          <!-- Right Image -->
          <div class="flex justify-center lg:justify-end">
            <div class="relative">
              <img
                src="/images/banner3.png"
                alt="Students studying with Vsangam"
                class="w-full max-w-lg h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                @error="handleImageError"
              />
              <!-- Fallback SVG if image doesn't load -->
              <div v-if="imageError" class="w-full max-w-lg h-80 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <div class="text-center text-white">
                  <svg class="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <h3 class="text-2xl font-bold">Vsangam</h3>
                  <p class="text-indigo-100">Smart Test Preparation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Courses Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Course
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Select from our comprehensive range of courses designed to help you ace your exams
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="courseStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="n in 6" 
            :key="n" 
            class="bg-gray-200 rounded-xl h-64 animate-pulse"
          >
            <div class="p-6 space-y-4">
              <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div class="h-6 bg-gray-300 rounded w-3/4"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-300 rounded"></div>
                <div class="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
              <div class="h-10 bg-gray-300 rounded w-1/3 mt-6"></div>
            </div>
          </div>
        </div>

        <!-- Courses Grid -->
        <div v-else-if="courseStore.courses.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="course in courseStore.courses"
            :key="course.id"
            class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
          >
            <div class="p-6 space-y-4">
              <div class="flex items-center space-x-3">
                <div class="text-3xl">{{ course.icon }}</div>
                <h3 class="text-xl font-semibold text-gray-900">{{ course.name }}</h3>
              </div>
              
              <p class="text-gray-600 leading-relaxed">
                {{ course.description }}
              </p>
              
              <button class="w-full mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 transform hover:scale-105 active:scale-95">
                Explore Course
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="text-6xl mb-4">📚</div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-2">No courses found</h3>
          <p class="text-gray-600 mb-6">We're working hard to bring you amazing courses. Check back soon!</p>
          <button 
            @click="courseStore.fetchCourses()"
            class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Expert Curated</h3>
            <p class="text-gray-600">All questions and tests are designed by subject matter experts</p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Detailed Analytics</h3>
            <p class="text-gray-600">Track your progress with comprehensive performance analytics</p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
            <p class="text-gray-600">Practice anywhere, anytime with our mobile-optimized platform</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCourseStore } from '../stores/courseStore.js'

// Store
const courseStore = useCourseStore()

// Mobile number form state
const mobileNumber = ref('')
const showError = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')
const isSubmitting = ref(false)

// Image error handling
const imageError = ref(false)

// Mobile number validation
const validateMobileNumber = (number) => {
  const mobileRegex = /^[6-9]\d{9}$/
  return mobileRegex.test(number)
}

const handleInput = () => {
  showError.value = false
  showSuccess.value = false
  
  // Only allow digits
  mobileNumber.value = mobileNumber.value.replace(/\D/g, '')
}

const handleJoinFree = async () => {
  if (!mobileNumber.value) {
    showError.value = true
    errorMessage.value = 'Please enter your mobile number'
    return
  }

  if (!validateMobileNumber(mobileNumber.value)) {
    showError.value = true
    errorMessage.value = 'Please enter a valid 10-digit mobile number'
    return
  }

  isSubmitting.value = true
  showError.value = false

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showSuccess.value = true
    mobileNumber.value = ''
  } catch (error) {
    showError.value = true
    errorMessage.value = 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const handleImageError = () => {
  imageError.value = true
}

// Fetch courses on mount
onMounted(() => {
  courseStore.fetchCourses()
})
</script>
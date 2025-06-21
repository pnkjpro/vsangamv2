<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow-lg rounded-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Create Mock Test</h1>

        <form @submit.prevent="createMockTest" class="space-y-8">
          <!-- Topic Selection -->
          <div>
            <label for="node_id" class="block text-sm font-medium text-gray-700 mb-2">
              Select Topic
            </label>
            <select
              id="node_id"
              v-model="form.node_id"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Choose a topic...</option>
              <option v-for="topic in topics" :key="topic.nid" :value="topic.nid">
                {{ topic.name }}
              </option>
            </select>
          </div>

          <!-- Questions Section -->
          <div>
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-gray-800">Questions</h2>
              <button
                type="button"
                @click="addQuestion"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Question</span>
              </button>
            </div>

            <div v-if="form.contents.length === 0" class="text-center py-12 text-gray-500">
              <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-lg">No questions added yet</p>
              <p class="text-sm">Click "Add Question" to get started</p>
            </div>

            <!-- Question Cards -->
            <div class="space-y-6">
              <div
                v-for="(question, qIndex) in form.contents"
                :key="qIndex"
                class="border border-gray-200 rounded-lg p-6 bg-gray-50"
              >
                <div class="flex justify-between items-start mb-4">
                  <h3 class="text-lg font-medium text-gray-800">Question {{ qIndex + 1 }}</h3>
                  <button
                    type="button"
                    @click="removeQuestion(qIndex)"
                    class="text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <!-- Question Text English -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Question Text (English) *
                    </label>
                    <textarea
                      v-model="question.question_text_en"
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter question in English..."
                      required
                    ></textarea>
                  </div>

                  <!-- Question Text Hindi -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Question Text (Hindi) *
                    </label>
                    <textarea
                      v-model="question.question_text_hi"
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter question in Hindi..."
                      required
                    ></textarea>
                  </div>
                </div>

                <!-- Difficulty -->
                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level *
                  </label>
                  <select
                    v-model="question.difficulty"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select difficulty...</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <!-- Options -->
                <div class="mt-6">
                  <div class="flex justify-between items-center mb-4">
                    <label class="block text-sm font-medium text-gray-700">Options *</label>
                    <button
                      type="button"
                      @click="addOption(qIndex)"
                      class="text-sm bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors duration-200"
                    >
                      Add Option
                    </button>
                  </div>

                  <div class="space-y-3">
                    <div
                      v-for="(option, oIndex) in question.options"
                      :key="oIndex"
                      class="flex items-center space-x-3 p-3 bg-white rounded-md border"
                    >
                      <input
                        type="radio"
                        :name="`correct_${qIndex}`"
                        :value="option.id"
                        v-model="question.correctAnswerId"
                        class="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="text"
                        v-model="option.option"
                        placeholder="Enter option text..."
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        @click="removeOption(qIndex, oIndex)"
                        class="text-red-600 hover:text-red-800 transition-colors duration-200"
                        :disabled="question.options.length <= 2"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 mt-2">Select the radio button next to the correct answer</p>
                </div>

                <!-- Explanation -->
                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Explanation (Optional)
                  </label>
                  <textarea
                    v-model="question.explanation"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Explain the correct answer..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Reset
            </button>
            <button
              type="submit"
              :disabled="loading || form.contents.length === 0"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <span v-if="loading" class="flex items-center space-x-2">
                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating...</span>
              </span>
              <span v-else>Create Mock Test</span>
            </button>
          </div>
        </form>

        <!-- Success/Error Messages -->
        <div v-if="message" class="mt-6">
          <div
            :class="[
              'p-4 rounded-md',
              messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
            ]"
          >
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// State
const loading = ref(false)
const message = ref('')
const messageType = ref('success')

// Sample topics (replace with actual API call)
const topics = ref([
  { nid: 1, name: 'Mathematics' },
  { nid: 2, name: 'Physics' },
  { nid: 3, name: 'Chemistry' },
  { nid: 4, name: 'Biology' },
  { nid: 5, name: 'English' }
])

// Form data
const form = reactive({
  node_id: '',
  contents: []
})

let nextOptionId = 1

// Methods
const addQuestion = () => {
  const newQuestion = {
    question_text_en: '',
    question_text_hi: '',
    options: [
      { id: nextOptionId++, option: '' },
      { id: nextOptionId++, option: '' }
    ],
    correctAnswerId: null,
    explanation: '',
    difficulty: ''
  }
  form.contents.push(newQuestion)
}

const removeQuestion = (index) => {
  form.contents.splice(index, 1)
}

const addOption = (questionIndex) => {
  form.contents[questionIndex].options.push({
    id: nextOptionId++,
    option: ''
  })
}

const removeOption = (questionIndex, optionIndex) => {
  const question = form.contents[questionIndex]
  const removedOption = question.options[optionIndex]
  
  // If removing the correct answer, reset correctAnswerId
  if (question.correctAnswerId === removedOption.id) {
    question.correctAnswerId = null
  }
  
  question.options.splice(optionIndex, 1)
}

const resetForm = () => {
  form.node_id = ''
  form.contents = []
  message.value = ''
  nextOptionId = 1
}

const createMockTest = async () => {
  loading.value = true
  message.value = ''
  
  try {
    // Validate form
    if (!form.node_id) {
      throw new Error('Please select a topic')
    }
    
    if (form.contents.length === 0) {
      throw new Error('Please add at least one question')
    }
    
    // Validate each question
    for (let i = 0; i < form.contents.length; i++) {
      const question = form.contents[i]
      
      if (!question.question_text_en.trim()) {
        throw new Error(`Question ${i + 1}: English text is required`)
      }
      
      if (!question.question_text_hi.trim()) {
        throw new Error(`Question ${i + 1}: Hindi text is required`)
      }
      
      if (!question.difficulty) {
        throw new Error(`Question ${i + 1}: Difficulty level is required`)
      }
      
      if (question.options.length < 2) {
        throw new Error(`Question ${i + 1}: At least 2 options are required`)
      }
      
      if (!question.correctAnswerId) {
        throw new Error(`Question ${i + 1}: Please select the correct answer`)
      }
      
      // Check if all options have text
      for (let j = 0; j < question.options.length; j++) {
        if (!question.options[j].option.trim()) {
          throw new Error(`Question ${i + 1}, Option ${j + 1}: Option text is required`)
        }
      }
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would make the actual API call
    // const response = await fetch('/api/create-mock', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(form)
    // })
    
    message.value = 'Mock test created successfully!'
    messageType.value = 'success'
    
    // Reset form after successful submission
    setTimeout(() => {
      resetForm()
    }, 2000)
    
  } catch (error) {
    message.value = error.message
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>
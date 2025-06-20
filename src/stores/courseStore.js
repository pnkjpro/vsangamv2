import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCourseStore = defineStore('course', () => {
  const courses = ref([])
  const isLoading = ref(false)

  const fetchCourses = async () => {
    isLoading.value = true
    
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      courses.value = [
        {
          id: 1,
          name: 'NEET Mock Tests',
          description: 'Complete NEET preparation with 50+ mock tests and PYQs from last 10 years',
          icon: '🏥'
        },
        {
          id: 2,
          name: 'JEE Main & Advanced',
          description: 'Master JEE with topic-wise tests, full-length mocks, and detailed solutions',
          icon: '⚙️'
        },
        {
          id: 3,
          name: 'UPSC Prelims',
          description: 'Civil Services preliminary exam preparation with current affairs and GS',
          icon: '🏛️'
        },
        {
          id: 4,
          name: 'SSC CGL',
          description: 'Staff Selection Commission Combined Graduate Level exam preparation',
          icon: '📊'
        },
        {
          id: 5,
          name: 'Banking Exams',
          description: 'IBPS, SBI PO/Clerk preparation with quantitative aptitude and reasoning',
          icon: '🏦'
        },
        {
          id: 6,
          name: 'GATE Engineering',
          description: 'Graduate Aptitude Test preparation for all engineering branches',
          icon: '🔧'
        }
      ]
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    courses,
    isLoading,
    fetchCourses
  }
})
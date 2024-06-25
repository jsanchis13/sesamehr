<template>
  <div class="overflow-hidden lg:overflow-visible" @click="closeModal">
    <!-- Main modal -->
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <!-- Modal Content -->
      <div class="bg-white p-4 rounded-lg shadow-lg max-w-sm" @click.stop>
        <form @submit.prevent="registerCandidate">
          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label class="block text-gray-700 font-bold mb-2" for="name"> First Name </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="First Name"
                  v-model="firstName"
                />
              </div>
            </div>
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label class="block text-gray-700 font-bold mb-2" for="lastName"> Last Name </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  v-model="lastName"
                />
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email"> Email </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              v-model="email"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="phone"> Phone Number </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              v-model="phone"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="linkedin">
              Linkedin profile url
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="linkedin"
              type="text"
              placeholder="Profile url"
              v-model="linkedin"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="web"> Web </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="web"
              type="text"
              placeholder="Web"
              v-model="web"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="location"> Location </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              type="text"
              placeholder="Location"
              v-model="location"
            />
          </div>
          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label for="date" class="mb-3 block text-base font-medium text-[#07074D]">
                  Work start date
                </label>
                <input
                  type="date"
                  id="date"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  v-model="date"
                />
              </div>
            </div>
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label for="time" class="mb-3 block text-base font-medium text-[#07074D]">
                  Desired Salary
                </label>
                <input
                  type="number"
                  id="salary"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  v-model="salary"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-center w-full items-center">
            <button
              class="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { candidatesService } from '@external/application/variables/services/candidates'
import { variables } from '@external/application/variables/variables'
import { useSesamehrStore } from '@external/infraestructure/connections/store/sesamehr'

export default defineComponent({
  name: 'ModalNewCandidates',
  props: {},
  data(): any {
    return {
      statusCandidates: [],
      candidates: [],
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      linkedin: '',
      web: '',
      location: '',
      date: '',
      salary: null,
      store: useSesamehrStore()
    }
  },
  mounted() {},
  methods: {
    /**
     * Register a new candidate
     */
    registerCandidate(): void {
      const body = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        linkedinURL: this.linkedin,
        web: this.web,
        location: this.location,
        startWorkDate: this.date,
        desiredSalary: this.salary,
        createdAt: new Date().toISOString().split('T')[0],
        vacancyId: variables.vacancyId,
        status: (
          this.store.getStatus.find((status: { name: string }) => status.name === 'New') as {
            id: string
            name: string
          }
        ).id
      }

      candidatesService.setcandidates(body).then(() => {
        this.store.addCandidate(body, body.status)
        this.closeModal()
      })
    },

    /**
     * Close the modal
     */
    closeModal() {
      this.$emit('closeModal')
    }
  }
})
</script>

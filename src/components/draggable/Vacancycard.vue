<template>
  <li class="py-2" :id="candidate.id">
    <a href="#" class="block p-3 bg-gray-100 border border-gray-400 rounded">
      <div class="flex justify-between">
        <span class="text-m font-medium leading-snug">
          {{ candidate.firstName }} {{ candidate.lastName }}
        </span>
        <img class="icon" :src="dotsIcon" />
      </div>

      <div class="text-sm pt-2">
        <p>Añadido por {{ creatorEmployee }}</p>
      </div>
      <div class="flex pt-2 text-sm text-gray-600">
        <img class="icon" :src="timeIcon" />
        <time class="text-sm text-gray-600" :datetime="currentDate">{{
          formattedCreatedDate
        }}</time>
      </div>
    </a>
  </li>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import timeIcon from '@/assets/icons/draggable/time.svg'
import dotsIcon from '@/assets/icons/draggable/dots.svg'

export default defineComponent({
  name: 'VacancyCard',
  props: {
    candidate: {
      type: Object,
      required: true
    }
  },

  computed: {
    /**
     * Format the created date, if current date matches with the created date, return 'Hoy'
     *
     * @returns {string}
     */
    formattedCreatedDate(): string {
      const currentDate = new Date().toISOString().split('T')[0]
      return currentDate === new Date(this.candidate.createdAt).toISOString().split('T')[0]
        ? 'Hoy'
        : new Date(this.candidate.createdAt).toISOString().split('T')[0]
    },

    /**
     * Get current date
     *
     * @returns {string}
     */
    currentDate(): string {
      return new Date().toISOString().split('T')[0]
    },

    /**
     * Get the creator employee, if null, return 'ATS'
     *
     * @returns {string}
     */
    creatorEmployee(): string {
      return this.candidate.creatorEmployee == null ? 'ATS' : this.candidate.creatorEmployee
    }
  },

  setup() {
    return {
      timeIcon,
      dotsIcon
    }
  }
})
</script>

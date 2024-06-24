<template v-if="statusCandidates.length > 0">
  <main
    v-for="(status, index) in statusCandidates"
    :key="index"
    :status="status"
    class="p-3 inline-flex"
  >
    <div class="inline-block p-3 w-80 flex-shrink-0 border border-grey rounded">
      <hr class="h-1 mx-auto my-4 border-0 rounded" :class="'bg-' + status.name.toLowerCase()" />
      <div class="flex flex-1">
        <img class="icon" :src="iconManager(status.name)" alt="description" />
        <h3 class="text-sm font-medium text-gray-900">
          <span class="pl-2">{{ status.name }}</span>
        </h3>
      </div>
      <draggable
        v-if="candidates[status.id]"
        tag="ul"
        class="w-full h-full max-w-md"
        :id="status.id"
        group="items"
        :list="candidates[status.id] || []"
        :item-key="status.id"
        :animation="200"
        @end="updateCandidateStatus($event)"
      >
        <template v-slot:item="{ element }">
          <vacancy-card :key="element.id" :candidate="element" />
        </template>
      </draggable>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Draggable from 'vuedraggable'
import VacancyCard from '@/components/draggable/Vacancycard.vue'
import { candidatesService } from '@external/application/variables/services/candidates'
import { useSesamehrStore } from '@external/infraestructure/connections/store/sesamehr'

export default defineComponent({
  name: 'VacancyContainer',
  components: {
    Draggable,
    VacancyCard
  },

  data(): any {
    return {
      statusCandidates: [],
      candidates: {},
      status: {},
      store: useSesamehrStore()
    }
  },

  mounted() {
    candidatesService.getcandidateStatus().then((response: any) => {
      this.store.addStatus(response)
      this.statusCandidates = this.store.getStatus

      this.statusCandidates.forEach((status: { id: string }) => {
        candidatesService.getcandidates(status.id).then((response: any) => {
          const statusId = status.id
          this.store.addCandidates(response.data, statusId)
          this.candidates = this.store.getCandidates
        })
      })
    })
  },

  methods: {
    /**
     * Updates the status of a candidate when dragged to a new status container.
     *
     * @param {Object} newStatus
     *
     * @returns void
     */
    updateCandidateStatus(newStatus: { to: { id: string }; item: { id: string } }): void {
      const destinyStatus = newStatus.to.id
      const candidateId = newStatus.item.id
      const body = this.store.updateCandidateStatus(candidateId, destinyStatus)

      candidatesService.updatecandidate(candidateId, body)
    },

    /**
     * Get the icon for the status
     *
     * @param {string} statusName
     *
     * @returns {string}
     */
    iconManager(statusName: string): string {
      statusName = statusName.toLowerCase()
      const icon = '../../assets/icons/draggable/' + statusName + '.svg'
      return new URL(icon, import.meta.url).href
    }
  }
})
</script>
<style scoped>
.bg-new,
.bg-accepted,
.bg-interview,
.bg-selected {
  background-color: #22c55e;
}
.bg-discarded {
  background-color: #f87171;
}
</style>

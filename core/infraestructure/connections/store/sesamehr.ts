import { defineStore } from 'pinia'

export const useSesamehrStore = defineStore('sesamehr', {
  state: () => ({
    candidates: {} as Record<string, object>, // Add index signature
    status: {}
  }),
  getters: {
    /**
     * Get status list
     *
     * @returns {Object}
     */
    getStatus(): object {
      return this.status
    },

    /**
     * Get candidates list by status id
     *
     * @returns {Object}
     */
    getCandidates(): object {
      return this.candidates
    }
  },
  actions: {
    /**
     * Add candidates by status id
     *
     * @param {Object} candidates
     * @param {String} statusId
     *
     * @returns {void}
     */
    addCandidates(candidates: object, statusId: string): void {
      this.candidates[statusId] = candidates
    },

    /**
     * Update candidate status
     *
     * @param {String} candidateId
     * @param {String} destinyStatus
     * @param {String} oldStatus
     *
     * @returns {Object}
     */
    updateCandidateStatus(candidateId: string, destinyStatus: string): Object {
      const candidate = this.candidates[destinyStatus].find(
        (candidate: object) => candidate.id === candidateId
      )

      const status = this.status.find((status: object) => status.id === destinyStatus)
      candidate.statusId = destinyStatus
      candidate.status = status

      return candidate
    },

    /**
     * @param {Object} status
     *
     * @returns {void}
     */
    addStatus(status: object): void {
      this.status = status
    }
  }
})

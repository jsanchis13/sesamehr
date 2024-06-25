import { defineStore } from 'pinia'

export const useSesamehrStore = defineStore('sesamehr', {
  state: () => ({
    candidates: {} as Record<string, any>,
    status: [] as Array<any>
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
     * Add new candidate by status id
     *
     * @param {Object} candidate
     * @param {String} statusId
     *
     * @returns {void}
     */
    addCandidate(candidate: object, statusId: string): void {
      this.candidates[statusId].push(candidate)
    },

    /**
     * Update candidate status
     * @param {String} candidateId
     * @param {String} destinyStatus
     * @returns {Object}
     */
    updateCandidateStatus(candidateId: string, destinyStatus: string): Object {
      const candidate = this.candidates[destinyStatus].find(
        (candidate: { id: string }) => candidate.id === candidateId
      )

      const status = this.status.find((status: any) => status.id === destinyStatus)
      candidate.statusId = destinyStatus
      candidate.status = status

      return candidate
    },

    /**
     * @param {Array<any>} status
     *
     * @returns {void}
     */
    addStatus(status: Array<any>): void {
      this.status = status
    }
  }
})

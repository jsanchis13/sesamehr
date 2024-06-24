import { connections } from '../connections'
import { type Status } from '@external/domain/models/status'
import { type Candidate } from '@external/domain/models/candidate'

export const candidateRepository = {
  /**
   * Get candidate status
   *
   * @returns {Object}
   */
  getcandidateStatus: async (): Promise<object> => {
    try {
      const statusResponse = await connections.get(
        'http://api-test.sesametime.com/recruitment/v1/candidate-status/' +
          connections.tokens.vacancyId,
        connections.tokens.token
      )

      return statusResponse.data.map(
        (status: any): Status => ({
          id: status.id,
          name: status.name,
          companyId: status.companyId,
          order: status.order,
          createdAt: status.createdAt,
          updatedAt: status.updatedAt,
          vacancyId: status.vacancyId
        })
      )
    } catch (error) {
      console.error('Error retrieving candidate status:', error)
      throw error
    }
  },

  /**
   * Get candidates by status id
   *
   * @returns {Promise<object>}
   */
  getcandidates: async (statusId: string): Promise<object> => {
    try {
      const candidates = await connections.get(
        'http://api-test.sesametime.com/recruitment/v1/vacancies/' +
          connections.tokens.vacancyId +
          '/candidates?statusId=' +
          statusId,
        connections.tokens.token
      )

      return candidates
    } catch (error) {
      console.error('Error retrieving candidates:', error)
      throw error
    }
  },

  /**
   * Create new candidate
   *
   * @returns {Promise<object>}
   */
  setcandidates: async (body: object): Promise<object> => {
    try {
      const candidates = await connections.post(
        'http://api-test.sesametime.com/recruitment/v1/candidates',
        body,
        connections.tokens.token
      )

      return candidates
    } catch (error) {
      console.error('Error creating candidate:', error)
      throw error
    }
  },

  /**
   * Update candidate status
   *
   * @returns {Promise<object>}
   */
  updatecandidate: async (candidateId: string, body: object): Promise<object> => {
    try {
      const candidateResponse = await connections.put(
        'http://api-test.sesametime.com/recruitment/v1/candidates/' + candidateId,
        body,
        connections.tokens.token
      )

      return Object.entries(candidateResponse.data).map(
        (candidate: any): Candidate => ({
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          email: candidate.email,
          phone: candidate.phone,
          linkedinURL: candidate.linkedinURL,
          desiredSalary: candidate.desiredSalary,
          startWorkDate: candidate.startWorkDate,
          web: candidate.web,
          location: candidate.location,
          vacancyId: candidate.vacancyId,
          statusId: candidate.statusId
        })
      )
    } catch (error) {
      console.error('Error creating candidate:', error)
      throw error
    }
  }
}

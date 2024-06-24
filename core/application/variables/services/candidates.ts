import { candidateRepository } from '@external/infraestructure/connections/repositories/candidatesRepository'

export const candidatesService = {
  getcandidateStatus: () => {
    return candidateRepository.getcandidateStatus()
  },

  getcandidates: (statusId: string) => {
    return candidateRepository.getcandidates(statusId)
  },

  setcandidates: (body: object) => {
    return candidateRepository.setcandidates(body)
  },

  updatecandidate: (candidateId: string, body: object) => {
    return candidateRepository.updatecandidate(candidateId, body)
  }
}

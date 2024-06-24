import axios from 'axios'

const headers = {
  'Content-Type': 'application/json'
}

const tokens = {
  token: import.meta.env.VITE_REQUEST_TOKEN,
  vacancyId: import.meta.env.VITE_VACANCY_ID
}

/**
 * Global GET request function.
 *
 * @param {string} url
 * @param {string} token
 * @returns {Promise<Object>}
 */
const get = async (url: string, token: string): Promise<Object> => {
  const response = await axios.get(url, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}

/**
 * Global POST request function.
 *
 * @param {string} url
 * @param {Object} body
 * @param {string} token
 * @returns {Promise<Object>}
 */
const post = async (url: string, body: Object, token: string): Promise<Object> => {
  const response = await axios.post(url, body, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}

/**
 * Global PUT request function.
 *
 * @param {string} url
 * @param {Object} body
 * @param {string} token
 * @returns {Promise<Object>}
 */
const put = async (url: string, body: Object, token: string): Promise<Object> => {
  const response = await axios.put(url, body, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}

export const connections = {
  get,
  post,
  put,
  tokens
}

import createClient from 'openapi-fetch'
import type { paths } from '../generated/api-types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const apiClient = createClient<paths>({
  baseUrl: API_BASE_URL,
})

// Add default headers and interceptors
apiClient.use({
  onRequest({ request }) {
    const token = localStorage.getItem('authToken')
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`)
    }
    return request
  },
  onResponse({ response }) {
    if (response.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return response
  },
})

// Export typed API functions
export const auth = {
  login: async (email: string, password: string) => {
    const { data, error } = await apiClient.POST('/api/v1/auth/login', {
      body: { email, password },
    })
    if (data?.token) {
      localStorage.setItem('authToken', data.token)
    }
    return { data, error }
  },

  register: async (email: string, password: string, name?: string) => {
    return await apiClient.POST('/api/v1/auth/register', {
      body: { email, password, name },
    })
  },

  logout: async () => {
    await apiClient.POST('/api/v1/auth/logout', {})
    localStorage.removeItem('authToken')
  },
}

export const users = {
  getAll: async () => {
    return await apiClient.GET('/api/v1/users')
  },

  getById: async (id: number) => {
    return await apiClient.GET('/api/v1/users/{id}', {
      params: { path: { id } },
    })
  },
}

export const health = {
  check: async () => {
    return await apiClient.GET('/health')
  },
  ping: async () => {
    return await apiClient.GET('/ping')
  },
  pingWithBody: async (body: Record<string, any>) => {
    return await apiClient.POST('/ping', { body })
  },
}

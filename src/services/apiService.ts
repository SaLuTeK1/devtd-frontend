import axios from 'axios'

import { baseURL } from '@/config/urls'

export const apiService = axios.create({ 
	baseURL: baseURL || 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
	}
})

apiService.interceptors.request.use(
	(config) => {
		return config
	},
	(error) => {
		console.error('Request error:', error)
		return Promise.reject(error)
	}
)

apiService.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		return Promise.reject(error)
	}
)

import api from '@/service/axios'

export const login = () => api({
	url: '/api/login',
	method: 'post'
})
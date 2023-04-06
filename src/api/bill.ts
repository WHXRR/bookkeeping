import api from '@/service/axios'
import type { delBill, IAddBill, IUpdateBill } from './interface/IBill'

export const billList = () => api({
	url: '/api/bill_list',
	method: 'post'
})

export const addBill = (data : IAddBill) => api({
	url: '/api/add_bill',
	method: 'post',
	data,
	loading: true,
	tips: true
})

export const updateBill = (data : IUpdateBill) => api({
	url: '/api/update_bill',
	method: 'post',
	data,
	loading: true,
	tips: true
})

export const deleteBill = (data : delBill) => api({
	url: '/api/del_bill',
	method: 'post',
	data,
	loading: true,
	tips: true
})

export const favoriteBillList = () => api({
	url: '/api/favorite/bill_list',
	method: 'post'
})
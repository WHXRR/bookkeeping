import api from '@/service/axios'
import type * as IClassification from './interface/IClassification'

// 支出
export const getParentClassificationList = () => api({
	url: '/api/parent_pay_classification_list',
	method: 'post',
	loading: true
})

export const getChildClassificationList = (data : any) => api({
	url: '/api/child_pay_classification_list',
	method: 'post',
	data,
	loading: true
})

export const addParentClassification = (data : IClassification.addParentClassification) => api({
	url: '/api/add_parent_pay_classification',
	method: 'post',
	data,
	loading: true,
	tips: true
})

export const addChildClassification = (data : IClassification.addChildClassification) => api({
	url: '/api/add_child_pay_classification',
	method: 'post',
	data,
	loading: true,
	tips: true
})

export const delParentClassification = (data : IClassification.delClassification) => api({
	url: '/api/del_parent_pay_classification',
	method: 'post',
	data,
	loading: true,
	tips: true
})

export const delChildClassification = (data : IClassification.delClassification) => api({
	url: '/api/del_child_pay_classification',
	method: 'post',
	data,
	loading: true,
	tips: true
})

export const updateParentClassification = (data : IClassification.updateParentClassification) => api({
	url: '/api/update_parent_pay_classification',
	method: 'post',
	data,
	loading: true,
	tips: true
})

export const updateChildClassification = (data : IClassification.updateChildClassification) => api({
	url: '/api/update_child_pay_classification',
	method: 'post',
	data,
	loading: true,
	tips: true
})

// 收入
export const getIncomeParentClassificationList = () => api({
	url: '/api/parent_income_classification_list',
	method: 'post',
	loading: true
})

export const getIncomeChildClassificationList = (data : any) => api({
	url: '/api/child_income_classification_list',
	method: 'post',
	data,
	loading: true
})

export const addIncomeParentClassification = (data : IClassification.addParentClassification) => api({
	url: '/api/add_parent_income_classification',
	method: 'post',
	data,
	loading: true,
	tips: true
})

export const addIncomeChildClassification = (data : IClassification.addChildClassification) => api({
	url: '/api/add_child_income_classification',
	method: 'post',
	data,
	loading: true,
	tips: true
})

export const delIncomeParentClassification = (data : IClassification.delClassification) => api({
	url: '/api/del_parent_income_classification',
	method: 'post',
	data,
	loading: true,
	tips: true
})

export const delIncomeChildClassification = (data : IClassification.delClassification) => api({
	url: '/api/del_child_income_classification',
	method: 'post',
	data,
	loading: true,
	tips: true
})

export const updateIncomeParentClassification = (data : IClassification.updateParentClassification) => api({
	url: '/api/update_parent_income_classification',
	method: 'post',
	data,
	loading: true,
	tips: true
})

export const updateIncomeChildClassification = (data : IClassification.updateChildClassification) => api({
	url: '/api/update_child_income_classification',
	method: 'post',
	data,
	loading: true,
	tips: true
})
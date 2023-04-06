export interface delBill {
	id : number
}
export interface IAddBill {
	name : string
	date: string
	amount: string | number
	bill_type: number
	is_favorite: number
	tips: string
	parent_id: number
	child_id: number
}
export interface IUpdateBill {
	id: number
	name : string
	date: string
	amount: string | number
	bill_type: number
	is_favorite: number
	tips: string
	parent_id: number
	child_id: number
}


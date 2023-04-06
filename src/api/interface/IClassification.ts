export interface addParentClassification {
	name : string
}
export interface addChildClassification {
	name : string
	parent_id: number
}
export interface delClassification {
	id : number
}
export interface updateParentClassification {
	id : number
	name : string
}
export interface updateChildClassification {
	id : number
	name : string
	parent_id: number
}

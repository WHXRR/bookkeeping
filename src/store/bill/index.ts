import { defineStore } from 'pinia';

export const billStore = defineStore('bill', {
	state: () => ({
		selectedBill: {}
	}),
	actions: {
		selectBill(data) {
			this.selectedBill = data
		},
	},
});
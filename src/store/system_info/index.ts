import { defineStore } from 'pinia';

export const systemInfo = defineStore('systemInfo', {
	state: () => ({
		barHeight: 0
	}),
	actions: {
		getSystemBarHeight() {
			this.barHeight = uni.getSystemInfoSync().statusBarHeight
		},
	},
});
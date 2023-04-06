<template>
	<view class="add-bill" :style="{paddingTop: barHeight + 'px'}">
		<BackIcon />
		<uni-segmented-control
			:current="current"
			:values="items"
			style-type="text"
			active-color="#fba8a4"
			@clickItem="onClickItem" />
		<view v-if="current === 0">
			<Pay :current="current" :selectedBill="selectedBill" />
		</view>
		<view v-if="current === 1">
			<Pay :current="current" :selectedBill="selectedBill" />
		</view>
	</view>
</template>

<script lang="ts" setup>
	import BackIcon from '@/components/back.vue'
	import Pay from './components/pay.vue'
	import { systemInfo } from '@/store/system_info';
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	const { barHeight } = systemInfo();
	const current = ref(0)
	const items = ['支出', '收入']
	const onClickItem = (e) => {
		if (current.value !== e.currentIndex) {
			current.value = e.currentIndex
		}
	}

	const selectedBill = ref<number>(0)
	onLoad((options) => {
		if (options.billType) {
			current.value = Number(options.billType) || 0
		}
		selectedBill.value = Number(options.selectedBill) || 0
	})
</script>

<style lang="scss">
</style>
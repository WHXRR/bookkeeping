<template>
	<view class="add-bill" :style="{paddingTop: barHeight + 20 + 'px'}">
		<BackIcon />
		<uni-segmented-control
			:current="current"
			:values="items"
			style-type="text"
			active-color="#fba8a4"
			@clickItem="onClickItem" />
		<view v-if="current === 0">
			<Pay />
		</view>
		<view v-if="current === 1">
			<Pay />
		</view>
	</view>
</template>

<script lang="ts" setup>
	import BackIcon from '@/components/back.vue'
	import Pay from './components/pay.vue'
	import { systemInfo } from '@/store/system_info';
	import { ref } from 'vue';
	const { barHeight } = systemInfo();
	const current = ref(0)
	const items = ['支出', '收入']
	const onClickItem = (e) => {
		if (current.value !== e.currentIndex) {
			current.value = e.currentIndex
		}
	}
</script>

<style lang="scss">
</style>
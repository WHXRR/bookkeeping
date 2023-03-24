<template>
	<view class="add-bill">
		<uni-icons
			type="left"
			size="20"
			class="back-icon"
			:style="{top: barHeight + 10 + 'px'}"
			@click="back">
		</uni-icons>
	</view>
</template>

<script lang="ts" setup>
	import { systemInfo } from '@/store/system_info';
	const { barHeight } = systemInfo();
	const back = () => {
		uni.navigateBack()
	}
</script>

<style scoped lang="scss">
	.back-icon {
		position: fixed;
		left: 10px;
		z-index: 9;
	}
</style>
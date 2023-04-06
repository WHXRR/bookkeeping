<template>
	<view class="fixed-btn" @click="handleClick">
		<slot><uni-icons type="plusempty" size="16" color="#fff"></uni-icons></slot>
	</view>
</template>

<script setup lang="ts">
	const emit = defineEmits(['click', 'handleLongpress'])
	const handleClick = () => {
		emit('click')
	}
	const handleLongpress = () => {
		console.log(111);
		emit('handleLongpress')
	}
</script>

<style lang="scss" scoped>
	.fixed-btn {
		position: fixed;
		right: 10px;
		bottom: 100px;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-weight: bold;
		font-size: 14px;
		border-radius: 50%;
		background-color: $primary-color;
		background-image: $linear-color;
		box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
	}
</style>
<template>
	<view class="person-center">
		<view class="person-info">
			<image class="avatar" src="/static/images/4.jpg" mode="widthFix"></image>
			<view class="p-t-10">测试007</view>
		</view>
		<view class="person-center-container">
			<view class="nav">

			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { systemInfo } from '@/store/system_info';
	const { barHeight } = systemInfo();
</script>

<style lang="scss">
	.person-center {
		min-height: 100vh;
		background-color: #f7f7f7;

		.person-info {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 23vh;
			padding: 50px 20px 40px 20px;
			color: #fff;
			text-align: center;
			background-image: $linear-color;
			border-bottom-left-radius: 20% 20%;
			border-bottom-right-radius: 20% 20%;

			.avatar {
				width: 70px;
				height: 70px;
				border-radius: 50%;
			}
		}

		.person-center-container {
			padding: 0 20px;

			.nav {
				padding: 50px 10px;
				margin-top: -30px;
				border-radius: 6px;
				background-color: #fff;
			}
		}
	}
</style>
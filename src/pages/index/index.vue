<template>
	<view class="content">
		<view class="top">
			<view class="flex a-center">
				<view class="small-size" style="padding-right: 40px;">
					<view>本月收入</view>
					<view class="font-bold p-t-5 flex a-center">
						<text>+&nbsp;</text>
						<CountUp :num="6000" color="#ffffff" width='10' height='16' fontSize='16'></CountUp>
					</view>
				</view>
				<view class="small-size">
					<view>本月支出</view>
					<view class="font-bold p-t-5 flex a-center">
						<text>-&nbsp;</text>
						<CountUp :num="2342.5" color="#ffffff" width='10' height='16' fontSize='16'></CountUp>
					</view>
				</view>
			</view>
			<view class="flex j-end p-t-5">
				<view class="flex flex-column a-center">
					<view class=" font-bold">2023</view>
					<view class="small-size p-t-5">
						5 月
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="flex j-s-b small-size list-date">
				<view>3月17日</view>
				<view class="flex">
					<view style="padding-right: 20px;">
						<text class="shallow-black-color">收 </text>
						<text class="font-bold primary-color">11</text>
					</view>
					<view>
						<text class="shallow-black-color">支 </text>
						<text class="font-bold red-color">11</text>
					</view>
				</view>
			</view>
			<view class="list-main">
				<uni-swipe-action>
					<uni-swipe-action-item
						:right-options="options"
						:left-options="options"
						@click="handleDelete">
						<view class="p-10">
							<view class="flex j-s-b a-center small-size">
								<CircleIcon text="购" />
								<view class="primary-color font-bold">12</view>
							</view>
							<view class="tips">
								这里是记账提示
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</view>
		<view class="add-btn" @click="addBill">
			<uni-icons type="plusempty" size="16" color="#fff"></uni-icons>
		</view>
	</view>
</template>

<script setup lang="ts">
	import CountUp from '@/components/countUp.vue'
	import CircleIcon from '@/components/circle_icon.vue'
	const options = [{
		text: '删除',
		style: {
			fontSize: '12px',
			backgroundColor: '#dd524d'
		}
	}]

	const handleDelete = (e: any) => {
		console.log(e);
	}

	const addBill = () => {
		uni.navigateTo({
			url: '/pages/add_bill/index'
		})
	}
</script>

<style lang="scss">
	.content {
		padding: 10px;

		.top {
			margin-bottom: 20px;
			padding: 10px 20px;
			color: #fff;
			border-radius: 5px;
			background-color: #fba8a4;
			background-image: linear-gradient(315deg, #fba8a4 0%, #dad2f3 74%);
			box-shadow: 5px 5px 4px #d6d6d6,
				-5px -5px 4px #ffffff;
		}

		.list {
			padding-top: 20px;

			.list-main {
				margin-top: 10px;
				border-radius: 6px;
				border: 1px solid #fcfcfc;
				box-shadow: 5px 5px 10px #f2f2f2, -5px -5px 10px #ffffff;

				.tips {
					padding: 5px 0;
					color: #ccc;
					font-size: 12px;
				}
			}
		}

		.add-btn {
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
	}
</style>

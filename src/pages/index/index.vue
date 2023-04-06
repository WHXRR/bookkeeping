<template>
	<view class="content">
		<view class="top">
			<view class="flex a-center">
				<view class="small-size" style="padding-right: 40px;">
					<view>本月收入</view>
					<view class="font-bold p-t-5 flex a-center">
						<text>+&nbsp;</text>
						<CountUp :num="totalIncome" color="#ffffff" width='10' height='16' fontSize='16'></CountUp>
					</view>
				</view>
				<view class="small-size">
					<view>本月支出</view>
					<view class="font-bold p-t-5 flex a-center">
						<text>-&nbsp;</text>
						<CountUp :num="totalPay" color="#ffffff" width='10' height='16' fontSize='16'></CountUp>
					</view>
				</view>
			</view>
			<view class="flex j-end p-t-5">
				<view class="flex flex-column a-center">
					<view class=" font-bold">{{year}}</view>
					<view class="small-size p-t-5" style="font-style: italic;">
						{{month}} 月
					</view>
				</view>
			</view>
		</view>
		<view class="list" v-for="(item, idx) in billList" :key="idx">
			<view class="flex j-s-b small-size list-date" style="font-style: italic;">
				<view class="primary-color">{{item.date}}</view>
				<view class="flex">
					<view style="padding-right: 20px;">
						<text class="shallow-black-color">收 </text>
						<text class="font-bold primary-color">￥{{item.incomeAmount}}</text>
					</view>
					<view>
						<text class="shallow-black-color">支 </text>
						<text class="font-bold red-color">￥{{item.payAmount}}</text>
					</view>
				</view>
			</view>
			<view class="list-main" v-for="ele in item.data" :key="ele.id">
				<uni-swipe-action>
					<uni-swipe-action-item
						:right-options="options"
						:left-options="options"
						@click="handleDelete(ele.id)">
						<view class="p-10" @click="handleEdit(ele)">
							<view class="flex j-s-b a-center small-size">
								<view class="small-size" style="padding-left: 45px;">{{ele.name}}</view>
								<view class="primary-color font-bold red-color" v-if="!ele.bill_type">￥{{ele.amount}}
								</view>
								<view class="primary-color font-bold" v-else>￥{{ele.amount}}</view>
							</view>
							<view class="tips">
								{{ele.tips}}
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
				<view class="list-icon">
					<CircleIcon :text="ele.name[0]" />
				</view>
			</view>
		</view>
		<FixedBtn @click="addBill" @longpress="handleLongpress" />
		<Favorite v-model="showFavorite" />
	</view>
</template>

<script setup lang="ts">
	import CountUp from '@/components/countUp.vue'
	import CircleIcon from '@/components/circle_icon.vue'
	import api from '@/api'
	import FixedBtn from '@/components/fixed_btn.vue'
	import Favorite from './components/favorite.vue'
	import { billStore } from '@/store/bill/index'
	import { ref } from 'vue';

	const useBillStore = billStore()
	uni.$on('refreshList', () => getBillList())

	const totalPay = ref<number>(0)
	const totalIncome = ref<number>(0)
	const year = ref<number>(0)
	const month = ref<number>(0)
	const getDate = () => {
		const date = new Date()
		year.value = date.getFullYear()
		month.value = date.getMonth() + 1
	}
	getDate()

	const billList = ref([])
	const getBillList = () => {
		api.billList().then(res => {
			billList.value = res.data
			billList.value = billList.value.map(item => ({
				...item,
				payAmount: item.data.filter(ele => ele.bill_type === 0).map(ele => ele.amount).reduce((pre, next) => pre + next, 0),
				incomeAmount: item.data.filter(ele => ele.bill_type === 1).map(ele => ele.amount).reduce((pre, next) => pre + next, 0)
			}))
			totalPay.value = billList.value.map(item => item.payAmount).reduce((pre, next) => pre + next, 0)
			totalIncome.value = billList.value.map(item => item.incomeAmount).reduce((pre, next) => pre + next, 0)
		})
	}
	getBillList()

	const options = [{
		text: '删除',
		style: {
			fontSize: '12px',
			backgroundColor: '#dd524d'
		}
	}]

	const handleDelete = (id : number) => {
		api.deleteBill({ id }).then(res => {
			setTimeout(() => {
				getBillList()
			}, 500)
		})
	}

	const addBill = () => {
		uni.navigateTo({
			url: '/pages/add_bill/index'
		})
	}

	const handleEdit = (data) => {
		useBillStore.selectBill(data)
		uni.navigateTo({
			url: `/pages/add_bill/index?billType=${data.bill_type}&selectedBill=1`
		})
	}

	const showFavorite = ref<boolean>(false)
	const handleLongpress = () => {
		showFavorite.value = true
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
				position: relative;
				margin-top: 30px;
				border-radius: 6px;
				border: 1px solid #fcfcfc;
				box-shadow: 5px 5px 10px #f2f2f2, -5px -5px 10px #ffffff;

				.tips {
					padding: 5px 0;
					color: #ccc;
					font-size: 12px;
				}

				.list-icon {
					position: absolute;
					top: -30%;
					left: 10px;
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
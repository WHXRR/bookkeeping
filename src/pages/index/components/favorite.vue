<template>
	<view class="favorite-dialog">
		<uni-popup ref="popup" type="left" background-color="#fff" @change="handleChange">
			<view class="favorite-content">
				<view class="list-main" v-for="item in favoriteList" :key="item.id" @click="selectFavorite(item)">
					<view class="p-10">
						<view class="flex j-s-b a-center small-size">
							<view></view>
							<view style="margin-left: 200px;">
								<view class="primary-color font-bold red-color" v-if="!item.bill_type">
									￥{{item.amount}}
								</view>
								<view class="primary-color font-bold" v-else>￥{{item.amount}}</view>
							</view>
						</view>
						<view class="tips">
							{{item.tips}}
						</view>
					</view>
					<view class="list-icon">
						<CircleIcon :text="item.name[0]" />
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup lang="ts">
	import { watchEffect, ref } from "vue"
	import api from '@/api'
	import CircleIcon from '@/components/circle_icon.vue'
	import { billStore } from '@/store/bill/index'
	
	uni.$on('refreshList', () => favoriteBillList())
	
	const props = defineProps(['modelValue'])
	const emit = defineEmits(['update:modelValue', 'addSuccess'])
	
	const useBillStore = billStore()
	const selectedBill = useBillStore.selectedBill
	
	const popup = ref<any>(null)
	watchEffect(() => {
		if (props.modelValue) {
			popup.value.open()
		}
	})
	const handleChange = (e : object) => {
		if (!e.show) {
			emit('update:modelValue', false)
		}
	}

	const favoriteList = ref([])
	const favoriteBillList = () => {
		api.favoriteBillList().then(res => {
			favoriteList.value = res.data
		})
	}
	favoriteBillList()

	const selectFavorite = data => {
		useBillStore.selectBill(data)
		uni.navigateTo({
			url: `/pages/add_bill/index?billType=${data.bill_type}&selectedBill=2`
		})
	}
</script>

<style lang="scss" scoped>
	.favorite-dialog {
		.favorite-content {
			padding: 0 20px;
		}

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
</style>
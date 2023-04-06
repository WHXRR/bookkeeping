<template>
	<view class="pay">
		<view class="icon-content">
			<view
				v-for="item in iconList"
				:key="item.id"
				class="flex flex-column a-center"
				@click="selectedIcon(item)">
				<CircleIcon
					:jump="isDelete"
					:text="item.name[0]"
					:bgColor="item.id === iconSelected.id ? '' : '#f7f7f7'"
					:color="item.id === iconSelected.id ? '' : '#000000'"
					@handleLongpress="handleLongpress(3, item)"
					@delete="deleteIcon(1,item.id)" />
				<view class="icon-name">
					{{item.name}}
				</view>
			</view>
			<CircleIcon
				addIcon
				bgColor="#f7f7f7"
				color="#000000"
				@click="addIcon(1)" />
		</view>
		<view class="sub-icon-content">
			<!-- 	<uni-transition :mode-class="['fade', 'slide-right']" :show="true"
				v-for="item in subIconList"
				:key="item.id">
				<view
					class="flex flex-column a-center"
					@click="selectedSubIcon(item)">
					<CircleIcon
						:text="item.name[0]"
						:bgColor="item.id === subIconSelected ? '' : '#ffffff'"
						:color="item.id === subIconSelected ? '' : '#000000'"
						@handleLongpress="handleLongpress(2, item.id)" />
					<view class="icon-name">
						{{item.name}}
					</view>
				</view>
			</uni-transition> -->
			<view
				v-for="item in subIconList"
				:key="item.id"
				class="flex flex-column a-center"
				@click="selectedSubIcon(item)">
				<CircleIcon
					:jump="isDelete"
					:text="item.name[0]"
					:bgColor="item.id === subIconSelected.id ? '' : '#ffffff'"
					:color="item.id === subIconSelected.id ? '' : '#000000'"
					@handleLongpress="handleLongpress(4, item)"
					@delete="deleteIcon(2,item.id)" />
				<view class="icon-name">
					{{item.name}}
				</view>
			</view>
			<CircleIcon
				addIcon
				bgColor="#ffffff"
				color="#000000"
				@click="addIcon(2)" />
		</view>
		<view class="pay-container">
			<view class="pay-ipt">
				<view class="flex j-s-b a-center small-size">
					<view class="flex a-center">
						<CircleIcon :text="subIconSelected?.name[0]" />
						<text style="margin-left: 10px;">{{subIconSelected?.name}}</text>
					</view>
					<input
						class="money-ipt small-size"
						placeholder-class="money-ipt-place"
						placeholder="请输入金额"
						type="number"
						v-model="amount">
				</view>
				<input
					class="tips small-size"
					placeholder-class="money-ipt-place"
					placeholder="请输入提示"
					type="text"
					v-model="tips">
			</view>
			<view class="icon-btn-list">
				<uni-datetime-picker class="date" :clear-icon="false" type="date" v-model="date" />
				<uni-fav
					class="fav-btn"
					:checked="favorite"
					bg-color-checked="#dd524d"
					circle
					@click="favorite = !favorite" />
				<view class="submit-btn">
					<uni-icons type="checkmarkempty" size="16" color="#ffffff" @click="submit"></uni-icons>
				</view>
			</view>
		</view>
		<AddIconDialog
			v-model="show"
			:addType="addType"
			:iconSelected="iconSelected"
			:subIconSelected="subIconSelected"
			:current="current"
			@addSuccess="getList" />
		<uni-popup ref="warnPopup" type="message">
			<uni-popup-message type="warn" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
		<FixedBtn @click="handleDelete">
			<uni-icons type="trash" size="18" color="#fff"></uni-icons>
		</FixedBtn>
	</view>
</template>

<script lang="ts" setup>
	import CircleIcon from '@/components/circle_icon.vue'
	import AddIconDialog from './add_icon_dialog.vue'
	import FixedBtn from '@/components/fixed_btn.vue'
	import type { IIconSelected, ISubIconSelected } from './icon_interface'
	import { reactive, ref, watchEffect } from "vue"
	import { billStore } from '@/store/bill/index'
	import api from '@/api'

	const useBillStore = billStore()
	const selectedBill = useBillStore.selectedBill
	const props = defineProps(['current', 'selectedBill'])

	const iconSelected = reactive<IIconSelected>({
		id: 0,
		name: ''
	})
	const selectedIcon = (data : IIconSelected) => {
		iconSelected.id = data.id
		iconSelected.name = data.name
	}
	const subIconSelected = ref<ISubIconSelected>({
		id: 0,
		name: '',
		parent_id: 0
	})
	const selectedSubIcon = (data : ISubIconSelected) => {
		subIconSelected.value = data
	}

	// 获取
	const iconList = ref([])
	const subIconList = ref([])
	const getParentClassificationList = async () => {
		let res = {}
		if (!props.current) {
			res = await api.getParentClassificationList()
		} else {
			res = await api.getIncomeParentClassificationList()
		}
		if (res.status) {
			iconList.value = res.data
			iconSelected.id = res.data[0]?.id || 0
			iconSelected.name = res.data[0]?.name || ''
			if (props.selectedBill) {
				const obj = res.data.find(item => item.id === selectedBill.parent_id)
				if (obj) {
					iconSelected.id = obj.id
					iconSelected.name = obj.name
				}
			}
		}
	}
	getParentClassificationList()
	const getChildClassificationList = async () => {
		let res = {}
		if (!props.current) {
			res = await api.getChildClassificationList({ parent_id: iconSelected.id })
		} else {
			res = await api.getIncomeChildClassificationList({ parent_id: iconSelected.id })
		}
		if (res.status) {
			subIconList.value = res.data
			subIconSelected.value = res.data[0]
			if (props.selectedBill) {
				const obj = res.data.find(item => item.id === selectedBill.child_id)
				if (obj) {
					subIconSelected.value = obj
				}
			}
		}
	}
	watchEffect(() => {
		getChildClassificationList()
	})

	// 添加
	const show = ref<Boolean>(false)
	const addType = ref<number>(1)
	const addIcon = (val : number) => {
		show.value = true
		addType.value = val
	}

	// 删除
	const isDelete = ref<boolean>(false)
	const handleDelete = () => {
		isDelete.value = !isDelete.value
	}
	const deleteIcon = async (type : number, id : number) => {
		addType.value = type
		let res = {}
		if (!props.current) {
			if (type === 1) {
				res = await api.delParentClassification({ id })
			} else {
				res = await api.delChildClassification({ id })
			}
		} else {
			if (type === 1) {
				res = await api.delIncomeParentClassification({ id })
			} else {
				res = await api.delIncomeChildClassification({ id })
			}
		}
		if (res.status) {
			uni.showToast({
				title: res.msg,
				icon: 'success'
			})
			setTimeout(() => {
				getList()
			}, 500)
		}
	}

	// 修改
	const handleLongpress = (type : number, item : ISubIconSelected) => {
		if (type === 3) {
			iconSelected.id = item.id
			iconSelected.name = item.name
		} else if (type === 4) {
			subIconSelected.value = item
		}
		show.value = true
		addType.value = type
	}

	// 增删改查后刷新列表
	const getList = async () => {
		let res = {}
		// 修改父级选项
		if ([1, 3].includes(addType.value)) {
			if (!props.current) {
				res = await api.getParentClassificationList()
			} else {
				res = await api.getIncomeParentClassificationList()
			}
			if (res.status) {
				iconList.value = res.data
				// 删除选中的那个后自动选择第一个
				if (!res.data.find((item : any) => item.id === iconSelected.id)) {
					iconSelected.id = res.data[0]?.id
					iconSelected.name = res.data[0]?.name
				}
			}
		} else if ([2, 4].includes(addType.value)) {
			// 子级
			if (!props.current) {
				res = await api.getChildClassificationList({ parent_id: iconSelected.id })
			} else {
				res = await api.getIncomeChildClassificationList({ parent_id: iconSelected.id })
			}
			if (res.status) {
				subIconList.value = res.data
				if (!res.data.find((item : any) => item.id === subIconSelected.value?.id)) {
					subIconSelected.value = res.data[0]
				}
			}
		}
	}

	const date = ref<String>('')
	watchEffect(() => {
		const dateObj = new Date()
		const year = dateObj.getFullYear()
		const month = dateObj.getMonth() + 1
		const day = dateObj.getDate()
		date.value = `${year}-${month}-${day}`
	})
	const amount = ref<String>('')
	const tips = ref<String>('')
	const favorite = ref<Boolean>(false)
	const warnPopup = ref<any>(null)
	const message = ref<string>('')
	watchEffect(() => {
		if (props.selectedBill) {
			amount.value = selectedBill.amount
			tips.value = selectedBill.tips
			favorite.value = !!selectedBill.is_favorite
		}
	})
	const submit = async () => {
		if (!subIconSelected.value.id) {
			message.value = '先选择分类噢~'
		} else if (!amount.value) {
			message.value = '金额还没填写噢~'
		} else if (!date.value) {
			message.value = '日期还没选择噢~'
		} else {
			message.value = ''
		}
		if (message.value) return warnPopup.value.open()
		let res = {}
		let params = {
			bill_type: props.current,
			name: subIconSelected.value.name,
			amount: amount.value,
			date: date.value,
			is_favorite: +favorite.value,
			tips: tips.value,
			parent_id: iconSelected.id,
			child_id: subIconSelected.value.id
		}
		if (props.selectedBill === 1) {
			params.id = selectedBill.id
			res = await api.updateBill(params)
		} else {
			res = await api.addBill(params)
		}
		if (res.status) {
			setTimeout(() => {
				uni.$emit('refreshList')
				uni.navigateBack()
			}, 500)
		}
	}
</script>

<style lang="scss">
	.pay {
		height: calc(100vh - 36px);

		.icon-item,
		.sub-icon-item {
			width: 40px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			border-radius: 50%;
			background-color: #f7f7f7;
			transition: all .3s;
		}

		.icon-content,
		.sub-icon-content {
			display: grid;
			gap: 10px;
			grid-template-columns: repeat(5, 1fr);
			justify-items: center;
			padding: 20px;

			.icon-name {
				padding-top: 4px;
				font-size: 12px;
			}
		}

		.sub-icon-content {
			box-sizing: border-box;
			background-color: #f7f7f7;
		}

		.sub-icon-content .sub-icon-item {
			background-color: #fff;
		}

		.pay-container {
			padding: 20px;
		}

		.pay-ipt {
			margin-bottom: 10px;
			border-bottom: 1px solid #f7f7f7;
		}

		.tips {
			margin-top: 5px;
			padding: 5px 0;
			color: #ccc;
			font-size: 12px;
		}

		.money-ipt {
			text-align: right;
			font-weight: bold;
			color: $primary-color;
		}

		.money-ipt-place {
			font-weight: 200;
			font-size: 12px;
		}

		.icon-btn-list {
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}

		.fav-btn {
			margin-right: 10px;
		}

		.submit-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 30px;
			height: 30px;
			border-radius: 50%;
			background-image: $linear-color;
		}
	}
</style>
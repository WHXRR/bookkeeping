<template>
	<view class="pay">
		<view class="icon-content">
			<view
				v-for="item in 2"
				:key="item"
				class="flex flex-column a-center"
				@click="selectedIcon(item)">
				<CircleIcon
					text="生"
					:bgColor="item === iconSelected ? '' : '#f7f7f7'"
					:color="item === iconSelected ? '' : '#000000'" />
				<view class="icon-name">
					生活家居
				</view>
			</view>
			<CircleIcon
				addIcon
				bgColor="#f7f7f7"
				color="#000000"
				@click="addIcon(1)" /> 
		</view>
		<view class="sub-icon-content">
			<view
				class="flex flex-column a-center"
				v-for="item in 4"
				:key="item"
				@click="selectedSubIcon(item)">
				<CircleIcon
					text="水"
					:bgColor="item === subIconSelected ? '' : '#ffffff'"
					:color="item === subIconSelected ? '' : '#000000'" />
				<view class="icon-name">
					水费
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
						<CircleIcon text="生" />
						<text style="margin-left: 10px;">水费</text>
					</view>
					<input
						class="money-ipt small-size"
						placeholder-class="money-ipt-place"
						placeholder="请输入金额"
						type="number"
						v-model="money">
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
		<AddIconDialog v-model="show" :addType="addType" @addSuccess="addSuccess" />
		<uni-popup ref="warnPopup" type="message">
			<uni-popup-message type="warn" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script lang="ts" setup>
	import CircleIcon from '@/components/circle_icon.vue'
	import AddIconDialog from './add_icon_dialog.vue'
	import { ref, watchEffect } from "vue"
	const iconSelected = ref < Number > (1)
	const subIconSelected = ref < Number > (1)
	const selectedIcon = (data: Number) => {
		iconSelected.value = data
	}
	const selectedSubIcon = (data: Number) => {
		subIconSelected.value = data
	}

	const show = ref < Boolean > (false)
	const addType = ref < number > (1)
	const addIcon = (val: number) => {
		show.value = true
		addType.value = val
	}
	const addSuccess = data => {
		console.log(data);
	}

	const date = ref < String > ('')
	watchEffect(() => {
		const dateObj = new Date()
		const year = dateObj.getFullYear()
		const month = dateObj.getMonth() + 1
		const day = dateObj.getDate()
		date.value = `${year}-${month}-${day}`
	})
	const money = ref < String > ('')
	const tips = ref < String > ('')
	const favorite = ref < Boolean > (false)
	const warnPopup = ref < any > (null)
	const message = ref < string > ('')
	const submit = () => {
		if (!money.value) {
			message.value = '金额还没填写噢~'
			warnPopup.value.open()
			return
		} else if (!date.value) {
			message.value = '日期还没选择噢~'
			warnPopup.value.open()
			return
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

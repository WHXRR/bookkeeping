<template>
	<view class="add_icon_dialog">
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog
				title=" "
				before-close
				cancelText="取消"
				confirmText="确认"
				@confirm="dialogConfirm"
				@close="close">
				<view class="popup-content">
					<view class="flex a-center j-center">
						<CircleIcon
							:text="text"
							bgColor="#f7f7f7"
							color="#000000"
							style="margin-right: 10px" />
						<CircleIcon
							:text="text" />
					</view>
					<input
						placeholder="Enter text"
						class="icon-ipt"
						type="text"
						v-model="iconText">
				</view>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup lang="ts">
	import CircleIcon from '@/components/circle_icon.vue'
	import api from '@/api'
	import { watchEffect, ref, computed } from "vue"

	const props = defineProps(['modelValue', 'addType', 'iconSelected', 'subIconSelected', 'current'])
	const emit = defineEmits(['update:modelValue', 'addSuccess'])
	const popup = ref<any>(null)
	watchEffect(() => {
		if (props.modelValue) {
			popup.value.open()
		}
	})
	const close = () => {
		popup.value.close()
		emit('update:modelValue', false)
	}

	watchEffect(() => {
		if (props.addType === 3) {
			iconText.value = props.iconSelected.name
		} else if (props.addType === 4) {
			iconText.value = props.subIconSelected.name
		}
	})
	const text = computed(() => iconText.value[0])
	const iconText = ref<string>('')
	const dialogConfirm = async () => {
		if (!iconText.value) return
		let res = {}
		if (!props.current) {
			if (props.addType === 1) {
				res = await api.addParentClassification({ name: iconText.value })
			} else if (props.addType === 2) {
				res = await api.addChildClassification({ name: iconText.value, parent_id: props.iconSelected.id })
			} else if (props.addType === 3) {
				res = await api.updateParentClassification({ id: props.iconSelected.id, name: iconText.value })
			} else if (props.addType === 4) {
				res = await api.updateChildClassification({ id: props.subIconSelected.id, name: iconText.value, parent_id: props.subIconSelected.parent_id })
			}
		} else {
			if (props.addType === 1) {
				res = await api.addIncomeParentClassification({ name: iconText.value })
			} else if (props.addType === 2) {
				res = await api.addIncomeChildClassification({ name: iconText.value, parent_id: props.iconSelected.id })
			} else if (props.addType === 3) {
				res = await api.updateIncomeParentClassification({ id: props.iconSelected.id, name: iconText.value })
			} else if (props.addType === 4) {
				res = await api.updateIncomeChildClassification({ id: props.subIconSelected.id, name: iconText.value, parent_id: props.subIconSelected.parent_id })
			}
		}
		if (res.status) {
			setTimeout(() => {
				emit('addSuccess')
				iconText.value = ''
				close()
			}, 500)
		}
	}
</script>

<style lang="scss" scoped>
	.popup-content {
		padding: 20px;

		.icon-ipt {
			margin-top: 20px;
			padding: 10px;
			font-size: 13px;
			text-align: center;
			border-radius: 50px;
			background-color: #f7f7f7;
		}
	}
</style>
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
	import { watchEffect, ref, computed } from "vue"

	const props = defineProps(['modelValue', 'addType'])
	const emit = defineEmits(['update:modelValue', 'addSuccess'])
	const popup = ref < any > (null)
	watchEffect(() => {
		if (props.modelValue) {
			popup.value.open()
		}
	})
	const close = () => {
		popup.value.close()
		emit('update:modelValue', false)
	}

	const text = computed(() => iconText.value[0])
	const iconText = ref < string > ('')
	const dialogConfirm = () => {
		if (!iconText.value) return
		emit('addSuccess', iconText.value)
		iconText.value = ''
		close()
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

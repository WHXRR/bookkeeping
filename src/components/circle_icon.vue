<template>
	<view class="circle-icon" :style="{backgroundColor: props.bgColor, color: props.color}" @click="handleClick">
		<template v-if="addIcon">
			<uni-icons type="plusempty" size="16" :color="props.color || '#ffffff'"></uni-icons>
		</template>
		<template v-else>
			{{props.text}}
		</template>
	</view>
</template>

<script setup lang="ts">
	const props = defineProps<{
		text?: string,
		bgColor ? : string,
		color ? : string
		addIcon ? : boolean
	}>()
	const emit = defineEmits(['click'])
	const handleClick = () => {
		emit('click')
	}
</script>

<style lang="scss">
	.circle-icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		border-radius: 50%;
		color: #fff;
		background-color: $primary-color;
		transition: all .3s;
	}
</style>

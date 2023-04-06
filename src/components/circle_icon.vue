<template>
	<view
		:class="'circle-icon ' + (jump ? 'jump' : '')"
		:style="{backgroundColor: props.bgColor, color: props.color}"
		@click="handleClick"
		@longpress="handleLongpress">
		<template v-if="addIcon">
			<uni-icons type="plusempty" size="16" :color="props.color || '#ffffff'"></uni-icons>
		</template>
		<template v-else>
			{{props.text}}
		</template>
		<view class="delete-btn" v-if="jump" @click.stop="handleDelete">
			<uni-icons type="closeempty" size="10" color="#fff"></uni-icons>
		</view>
	</view>
</template>

<script setup lang="ts">
	const props = defineProps<{
		text ?: string
		bgColor ?: string
		color ?: string
		addIcon ?: boolean
		jump ?: boolean
	}>()
	const emit = defineEmits(['click', 'handleLongpress', 'delete'])
	const handleClick = () => {
		emit('click')
	}
	const handleLongpress = () => {
		emit('handleLongpress')
	}
	const handleDelete = () => {
		emit('delete')
	}
</script>

<style lang="scss" scoped>
	.circle-icon {
		position: relative;
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

	.delete-btn {
    position: absolute;
    top: -2px;
    right: 0;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #fe5a4f;
	}

	@keyframes jump {
		0% {
			transform: translateY(0px);
		}

		25% {
			transform: translateY(-10px);
		}

		50% {
			transform: translateY(0px);
		}

		75% {
			transform: translateY(-5px);
		}

		100% {
			transform: translateY(0px);
		}
	}

	.jump {
		animation: jump .5s;
	}
</style>
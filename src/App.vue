<script setup lang="ts">
	import { systemInfo } from '@/store/system_info';
	const system = systemInfo();
	system.getSystemBarHeight()
</script>
<style lang="scss">
	@import '@/static/css/global.scss';
	@import '@/static/css/uni_ui_style.scss';
</style>
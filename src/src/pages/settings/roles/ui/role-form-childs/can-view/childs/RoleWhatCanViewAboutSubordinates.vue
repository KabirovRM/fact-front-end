<template>
	<role-what-can-view-group
		v-if="outputDTO && outputDTO.can_view && outputDTO.can_view.see_about_subordinates"
		:group="group"
		v-model="outputDTO.can_view.see_about_subordinates"
	/>
</template>

<script lang="ts" setup>
import { inject, PropType, Ref } from "vue";
import {
	RoleSettingsFormCanViewGroup,
	RoleSettingsOutputDTO,
} from "@/shared/api/v0/settings/roles";
import RoleWhatCanViewGroup from "./group/RoleWhatCanViewGroup.vue";

const props = defineProps({
	group: {
		type: Object as PropType<RoleSettingsFormCanViewGroup>,
		required: true,
	},
});

const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO");
</script>

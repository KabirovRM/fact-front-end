<script setup lang="ts">
import { computed, inject, Ref, ref } from "vue";

import { RoleSettingsFormGroup, RoleSettingsOutputDTO } from "@/shared/api/v0/settings/roles";
import { translate } from "@/shared/lib";
import { makeFieldSelector } from "@/shared/lib/helpers/field/lib/makeFieldSelector";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";

const props = defineProps<{
	group: RoleSettingsFormGroup;
}>();

const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO");

const fieldByCode = makeFieldSelector(
	computed(() => props.group.fields),
	serverError,
);

const customizeDashboardActions = computed(() => {
	const field = fieldByCode("customize_dashboard_actions").value;
	return {
		...field,
		field: {
			...field.field,
			name: translate("customization.fieldTitle"),
		},
	};
});
</script>

<template>
	<base-checkbox
		v-model="outputDTO.can_do.customize_dashboard_actions"
		:is-loading="isLoading"
		:model-field="customizeDashboardActions"
		:server-error="serverError"
		@unmount="() => (outputDTO.can_do.customize_dashboard_actions = false)"
	/>
</template>

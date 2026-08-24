<script setup lang="ts">
import { computed, inject, Ref, ref, watch } from "vue";

import { RoleSettingsFormGroup, RoleSettingsOutputDTO } from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode, translate } from "@/shared/lib";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";
import GroupRadioInput from "@/shared/ui/form/radio/ui/GroupRadioInput.vue";
import BaseColumn from "@/shared/ui/grid/BaseColumn.vue";

const props = defineProps<{
	group: RoleSettingsFormGroup;
}>();

const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO");

const teamViewField = computed(() => {
	const field = findFieldWithErrorsByCode(props.group.fields, serverError.value, "team_view");
	field.field.hint = translate("settings.roles.team.hintView");
	return field;
});
const teamEditField = computed(() => {
	const field = findFieldWithErrorsByCode(props.group.fields, serverError.value, "team_edit");
	field.field.hint = translate("settings.roles.team.hintEdit");
	return field;
});
const teamDeleteField = computed(() => {
	const field = findFieldWithErrorsByCode(props.group.fields, serverError.value, "team_delete");
	field.field.hint = translate("settings.roles.team.hintDelete");
	return field;
});

const teamCreateField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "team_create"),
);

const viewStageTaskField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "view_stage_task"),
);

const manageCommandsField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_commands"),
);

watch(
	() => outputDTO?.value.can_do.team_view,
	(newValue) => {
		if (newValue === "own") {
			outputDTO.value.can_do.team_edit = "own";
			outputDTO.value.can_do.team_delete = "own";
		}
	},
);
</script>

<template>
	<base-column :spacer="3">
		<base-checkbox
			v-model="outputDTO.can_do.team_create"
			:is-loading="isLoading"
			:model-field="teamCreateField"
			:server-error="serverError"
		/>
		<group-radio-input
			v-model="outputDTO.can_do.team_view"
			:is-loading="isLoading"
			:model-field="teamViewField"
			:additional-tooltip="{
				placement: 'right',
				raContent: true,
			}"
		/>
		<group-radio-input
			v-model="outputDTO.can_do.team_edit"
			:is-loading="isLoading"
			:model-field="teamEditField"
			:additional-tooltip="{
				placement: 'right',
				raContent: true,
			}"
			:disabled-values="outputDTO.can_do.team_view !== 'all' ? ['all'] : []"
		/>
		<group-radio-input
			v-model="outputDTO.can_do.team_delete"
			:is-loading="isLoading"
			:model-field="teamDeleteField"
			:additional-tooltip="{
				placement: 'right',
				raContent: true,
			}"
			:disabled-values="outputDTO.can_do.team_view !== 'all' ? ['all'] : []"
		/>

		<span class="rwcd-team-description">
			{{ translate("settings.roles.team.descriptionTeamRole") }}
		</span>
	</base-column>
</template>

<style lang="scss" scoped>
@use "sass:map";
@import "/src/assets/sass/components/variables.module";

.rwcd-team-description {
	font-weight: $font-weight-bold;
	margin-top: map.get($spacers, 3);
}
</style>
<template>
	<base-column :spacer="3">
		<base-checkbox
			v-model="outputDTO.can_do.manage_education"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="manageEducationField"
			:server-error="serverError"
			:hint="translate('education.accessHint')"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.manage_evaluation_tasks"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="manageEvaluationTasksField"
			:server-error="serverError"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.training_verification_participants"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="trainingVerificationParticipantsField"
			:server-error="serverError"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.see_test_results"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="seeTestResultsField"
			:server-error="serverError"
		/>
	</base-column>
</template>
<script setup lang="ts">
import { computed, inject, PropType, Ref, ref } from "vue";

import { RoleSettingsFormGroup, RoleSettingsOutputDTO } from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode, translate } from "@/shared/lib";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";
import BaseColumn from "@/shared/ui/grid/BaseColumn.vue";

const props = defineProps({
	group: {
		type: Object as PropType<RoleSettingsFormGroup>,
		required: true,
	},
});

const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO");

const manageEducationField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_education"),
);

const trainingVerificationParticipantsField = computed(() =>
	findFieldWithErrorsByCode(
		props.group.fields,
		serverError.value,
		"training_verification_participants",
	),
);

const seeTestResultsField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "see_test_results"),
);

const manageEvaluationTasksField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_evaluation_tasks"),
);
</script>

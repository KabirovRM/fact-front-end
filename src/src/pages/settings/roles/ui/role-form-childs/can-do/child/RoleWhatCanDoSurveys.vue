<template>
	<base-checkbox
		v-model="outputDTO.can_do.manage_surveys"
		:in-row="true"
		:is-loading="isLoading"
		:model-field="manageSurveysField"
		:server-error="serverError"
	/>
	<base-column v-if="outputDTO.can_do.manage_surveys" :spacer="3" class="r-w-can-do__child-items">
		<base-checkbox
			v-model="outputDTO.can_do.view_anonymous_survey_statistics"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="viewAnonymousSurveyStatisticsField"
			:server-error="serverError"
		/>
	</base-column>
</template>
<script setup lang="ts">
import { computed, inject, PropType, Ref, ref } from "vue";

import { RoleSettingsFormGroup, RoleSettingsOutputDTO } from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode } from "@/shared/lib";
import { BaseColumn } from "@/shared/ui";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";

const props = defineProps({
	group: {
		type: Object as PropType<RoleSettingsFormGroup>,
		required: true,
	},
});

const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO");

const manageSurveysField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_surveys"),
);

const viewAnonymousSurveyStatisticsField = computed(() =>
	findFieldWithErrorsByCode(
		manageSurveysField.value.field.items || [],
		serverError.value,
		"view_anonymous_survey_statistics",
	),
);
</script>

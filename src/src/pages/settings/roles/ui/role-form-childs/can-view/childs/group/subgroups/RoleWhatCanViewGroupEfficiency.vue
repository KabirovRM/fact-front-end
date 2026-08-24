<template>
	<section v-if="subgroup.code === 'efficiency'">
		<base-checkbox
			v-if="competenciesField.field.code"
			:model-value="modelValue.competencies"
			:model-field="competenciesField"
			:server-error="serverError"
			:in-row="true"
			@update:model-value="onChangeHandler('competencies', $event)"
		/>
		<base-checkbox
			v-if="evaluationField.field.code"
			:model-value="modelValue.evaluation"
			:model-field="evaluationField"
			:server-error="serverError"
			@update:model-value="onChangeHandler('evaluation', $event)"
		/>
		<base-checkbox
			v-if="oneOnOneField.field.code"
			:model-value="modelValue['1_on_1']"
			:model-field="oneOnOneField"
			:server-error="serverError"
			@update:model-value="onChangeHandler('1_on_1', $event)"
		/>
		<base-checkbox
			v-if="objectivesField.field.code"
			:model-value="modelValue.objectives"
			:model-field="objectivesField"
			:server-error="serverError"
			@update:model-value="onChangeHandler('objectives', $event)"
		/>
	</section>
</template>

<script lang="ts" setup>
import { computed, inject, Ref, ref } from "vue";

import {
	RoleSettingsCanViewEfficiency,
	RoleSettingsFormCanViewGroup,
	RoleSettingViewAccess,
} from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode } from "@/shared/lib";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";

const emit = defineEmits<{
	"update:modelValue": [RoleSettingsCanViewEfficiency];
}>();
const props = defineProps<{
	subgroup: RoleSettingsFormCanViewGroup;
	modelValue: RoleSettingsCanViewEfficiency;
}>();

const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
function onChangeHandler(code: string, value: RoleSettingViewAccess) {
	emit("update:modelValue", {
		...props.modelValue,
		[code]: value,
	});
}

const competenciesField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "competencies"),
);
const evaluationField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "evaluation"),
);
const oneOnOneField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "1_on_1"),
);
const objectivesField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "objectives"),
);
</script>

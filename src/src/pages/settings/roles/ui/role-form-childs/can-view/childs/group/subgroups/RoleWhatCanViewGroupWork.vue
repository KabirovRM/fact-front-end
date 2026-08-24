<template>
	<section v-if="workSubgroup.code === 'work'">
		<group-radio-input
			class="mb-6"
			:is-loading="isLoading"
			:model-field="workField"
			:model-value="modelValue.work"
			@update:model-value="onChangeHandler('work', $event)"
		/>
		<group-radio-input
			class="mb-6"
			:is-loading="isLoading"
			:model-field="skillsField"
			:model-value="modelValue.skills"
			@update:model-value="onChangeHandler('skills', $event)"
		/>
		<group-radio-input
			v-if="modelValue.education"
			class="mb-6"
			:is-loading="isLoading"
			:model-field="educationField"
			:model-value="modelValue.education"
			@update:model-value="onChangeHandler('education', $event)"
		/>
		<group-radio-input
			class="mb-6"
			:is-loading="isLoading"
			:model-field="certificatesField"
			:model-value="modelValue.certificates"
			@update:model-value="onChangeHandler('certificates', $event)"
		/>
		<group-radio-input
			class="mb-6"
			:is-loading="isLoading"
			:model-field="positionsField"
			:model-value="modelValue.positions"
			@update:model-value="onChangeHandler('positions', $event)"
		/>
		<base-checkbox
			v-if="modelValue.positions === 'edit' || modelValue.positions === 'show'"
			class="mb-6"
			:disabled="modelValue.positions === 'edit'"
			:model-field="ranksField"
			:model-value="modelValue.ranks"
			@update:model-value="onChangeHandler('ranks', $event)"
			@unmount="onChangeHandler('ranks', false)"
		/>
		<group-radio-input
			class="mb-6"
			:is-loading="isLoading"
			:model-field="employmentField"
			:model-value="modelValue.employment"
			@update:model-value="onChangeHandler('employment', $event)"
		/>
		<group-radio-input
			class="mb-6"
			:is-loading="isLoading"
			:model-field="managersField"
			:model-value="modelValue.managers"
			@update:model-value="onChangeHandler('managers', $event)"
		/>
		<group-radio-input
			class="mb-6"
			:is-loading="isLoading"
			:model-field="partTimersField"
			:model-value="modelValue['part-timers']"
			@update:model-value="onChangeHandler('part-timers', $event)"
		/>
	</section>
</template>

<script lang="ts" setup>
import { computed, inject, PropType, Ref, ref } from "vue";

import UserProfilePartTimers from "@/pages/profile/ui/overview-tabs/components/UserProfilePartTimers.vue";
import {
	RoleSettingsCanViewWork,
	RoleSettingsFormCanViewGroup,
	RoleSettingViewAccess,
} from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode, translate } from "@/shared/lib";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";
import GroupRadioInput from "@/shared/ui/form/radio/ui/GroupRadioInput.vue";
import { useViewerStore } from "@/store/storeViewer";

const emit = defineEmits<{
	(e: "update:modelValue", payload: RoleSettingsCanViewWork): void;
}>();
const props = defineProps({
	workSubgroup: {
		type: Object as PropType<RoleSettingsFormCanViewGroup>,
		required: true,
	},
	modelValue: {
		type: Object as PropType<RoleSettingsCanViewWork>,
		required: true,
	},
});

const viewer = useViewerStore();
const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
function onChangeHandler(code: string, value: RoleSettingViewAccess) {
	const updatedValue = { ...props.modelValue, [code]: value };

	if (code && code === "positions") {
		if (value === "show") {
			ranksField.value.field.name = translate("settings.roles.positionsGradesView");
			updatedValue.ranks = !!props.modelValue.ranks;
		} else if (value === "edit") {
			updatedValue.ranks = true;
			ranksField.value.field.name = translate("settings.roles.positionsGradesEdit");
		}
	}
	emit("update:modelValue", updatedValue);
}

const workField = computed(() =>
	findFieldWithErrorsByCode(props.workSubgroup.fields || [], serverError.value, "work"),
);
const skillsField = computed(() =>
	findFieldWithErrorsByCode(props.workSubgroup.fields || [], serverError.value, "skills"),
);
const educationField = computed(() =>
	findFieldWithErrorsByCode(props.workSubgroup.fields || [], serverError.value, "education"),
);
const certificatesField = computed(() =>
	findFieldWithErrorsByCode(props.workSubgroup.fields || [], serverError.value, "certificates"),
);
const positionsField = computed(() =>
	findFieldWithErrorsByCode(props.workSubgroup.fields || [], serverError.value, "positions"),
);
const ranksField = computed(() =>
	findFieldWithErrorsByCode(props.workSubgroup.fields || [], serverError.value, "ranks"),
);
const employmentField = computed(() =>
	findFieldWithErrorsByCode(props.workSubgroup.fields || [], serverError.value, "employment"),
);
const managersField = computed(() =>
	findFieldWithErrorsByCode(props.workSubgroup.fields || [], serverError.value, "managers"),
);
const partTimersField = computed(() =>
	findFieldWithErrorsByCode(props.workSubgroup.fields || [], serverError.value, "part-timers"),
);
</script>

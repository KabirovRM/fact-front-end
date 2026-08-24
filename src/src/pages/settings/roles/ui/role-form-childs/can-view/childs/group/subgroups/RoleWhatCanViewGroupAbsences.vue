<template>
	<section v-if="subgroup.code === 'absences'">
		<group-radio-input
			class="mb-6"
			:is-loading="isLoading"
			:model-field="absencesField"
			:model-value="modelValue.absences"
			@update:modelValue="onChangeHandler('absences', $event)"
		/>
	</section>
</template>

<script lang="ts" setup>
import {
	RoleSettingsCanViewAbsences,
	RoleSettingsFormCanViewGroup,
	RoleSettingViewAccess,
} from "@/shared/api/v0/settings/roles";
import { computed, inject, PropType, Ref, ref } from "vue";
import GroupRadioInput from "@/shared/ui/form/radio/ui/GroupRadioInput.vue";
import { findFieldWithErrorsByCode } from "@/shared/lib";

const emit = defineEmits<{
	(e: "update:modelValue", payload: RoleSettingsCanViewAbsences): void;
}>();
const props = defineProps({
	subgroup: {
		type: Object as PropType<RoleSettingsFormCanViewGroup>,
		required: true,
	},
	modelValue: {
		type: Object as PropType<RoleSettingsCanViewAbsences>,
		required: true,
	},
});

const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
function onChangeHandler(code: string, value: RoleSettingViewAccess) {
	emit("update:modelValue", {
		...props.modelValue,
		[code]: value,
	});
}

const absencesField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "absences"),
);
</script>

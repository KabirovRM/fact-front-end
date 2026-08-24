<template>
	<section v-if="workSubgroup.code === 'work'">
		<group-radio-input
			class="mb-6"
			:is-loading="isLoading"
			:model-field="compensationField"
			:model-value="modelValue.compensation"
			@update:modelValue="onChangeHandler('compensation', $event)"
		/>
	</section>
</template>

<script lang="ts" setup>
import { computed, inject, PropType, Ref, ref } from "vue";

import {
	RoleSettingsCanViewWork,
	RoleSettingsFormCanViewGroup,
	RoleSettingViewAccess,
} from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode } from "@/shared/lib";
import GroupRadioInput from "@/shared/ui/form/radio/ui/GroupRadioInput.vue";

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

const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
function onChangeHandler(code: string, value: RoleSettingViewAccess) {
	emit("update:modelValue", {
		...props.modelValue,
		[code]: value,
	});
}

const compensationField = computed(() =>
	findFieldWithErrorsByCode(props.workSubgroup.fields || [], serverError.value, "compensation"),
);
</script>

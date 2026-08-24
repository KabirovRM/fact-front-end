<template>
	<section v-if="subgroup.code === 'boarding'">
		<base-checkbox
			:model-value="modelValue.onboarding"
			:model-field="onboardingField"
			@update:modelValue="onChangeHandler('onboarding', $event)"
			:server-error="serverError"
			:in-row="true"
		/>
		<base-checkbox
			:model-value="modelValue.offboarding"
			:model-field="offboardingField"
			@update:modelValue="onChangeHandler('offboarding', $event)"
			:server-error="serverError"
			:in-row="true"
		/>
	</section>
</template>

<script lang="ts" setup>
import {
	RoleSettingsCanViewBoarding,
	RoleSettingsFormCanViewGroup,
	RoleSettingViewAccess,
} from "@/shared/api/v0/settings/roles";
import { computed, inject, PropType, Ref, ref } from "vue";
import { findFieldWithErrorsByCode } from "@/shared/lib";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";

const emit = defineEmits<{
	(e: "update:modelValue", payload: RoleSettingsCanViewBoarding): void;
}>();
const props = defineProps({
	subgroup: {
		type: Object as PropType<RoleSettingsFormCanViewGroup>,
		required: true,
	},
	modelValue: {
		type: Object as PropType<RoleSettingsCanViewBoarding>,
		required: true,
	},
});

const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
function onChangeHandler(code: string, value: RoleSettingViewAccess) {
	emit("update:modelValue", {
		...props.modelValue,
		[code]: value,
	});
}

const onboardingField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "onboarding"),
);
const offboardingField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "offboarding"),
);
</script>

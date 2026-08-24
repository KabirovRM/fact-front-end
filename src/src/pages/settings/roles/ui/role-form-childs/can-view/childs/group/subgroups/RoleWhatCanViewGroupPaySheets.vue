<template>
	<section v-if="workSubgroup.code === 'work'">
		<group-radio-input
			class="field"
			:is-loading="isLoading"
			:model-field="paySheetsField"
			:model-value="modelValue.pay_sheets"
			@update:modelValue="onChangeHandler('pay_sheets', $event)"
		/>
	</section>
</template>

<script lang="ts" setup>
import { computed, inject, Ref, ref } from "vue";

import {
	RoleSettingsCanViewWork,
	RoleSettingsFormCanViewGroup,
	RoleSettingViewAccess,
} from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode } from "@/shared/lib";
import GroupRadioInput from "@/shared/ui/form/radio/ui/GroupRadioInput.vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<{
	workSubgroup: RoleSettingsFormCanViewGroup;
	modelValue: RoleSettingsCanViewWork;
}>();

const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
function onChangeHandler(code: string, value: RoleSettingViewAccess) {
	emit("update:modelValue", {
		...props.modelValue,
		[code]: value,
	});
}

const paySheetsField = computed(() =>
	findFieldWithErrorsByCode(props.workSubgroup.fields || [], serverError.value, "pay_sheets"),
);
</script>

<style lang="scss" scoped>
@use "sass:map";
@import "/src/assets/sass/components/variables.module";
.field {
	margin-bottom: map.get($spacers, 6);
}
</style>
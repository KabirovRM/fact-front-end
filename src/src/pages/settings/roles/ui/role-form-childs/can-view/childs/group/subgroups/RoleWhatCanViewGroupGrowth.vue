<template>
	<section v-if="subgroup.code === 'growth'">
		<group-radio-input
			:model-field="pdpField"
			:is-loading="isLoading"
			:model-value="modelValue.pdp"
			class="mb-6"
			@update:modelValue="onChangeHandler(pdpField.code, $event)"
		/>
	</section>
</template>

<script lang="ts" setup>
import { computed, inject, PropType, Ref, ref } from "vue";

import {
	RoleSettingsCanViewGrowth,
	RoleSettingsFormCanViewGroup,
	RoleSettingViewAccess,
} from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode } from "@/shared/lib";
import GroupRadioInput from "@/shared/ui/form/radio/ui/GroupRadioInput.vue";
import { useViewerStore } from "@/store/storeViewer";

const emit = defineEmits<{
	(e: "update:modelValue", payload: RoleSettingsCanViewGrowth): void;
}>();
const props = defineProps({
	subgroup: {
		type: Object as PropType<RoleSettingsFormCanViewGroup>,
		required: true,
	},
	modelValue: {
		type: Object as PropType<RoleSettingsCanViewGrowth>,
		required: true,
	},
});

const viewer = useViewerStore();
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
function onChangeHandler(code: string, value: RoleSettingViewAccess) {
	emit("update:modelValue", {
		...props.modelValue,
		[code]: value,
	});
}

const pdpField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "pdp"),
);
</script>

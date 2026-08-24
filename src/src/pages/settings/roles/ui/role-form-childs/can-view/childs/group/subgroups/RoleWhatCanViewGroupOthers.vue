<template>
	<section v-if="subgroup.code === 'others'">
		<base-checkbox
			:model-value="!!modelValue.tasks"
			:model-field="tasksField"
			:server-error="serverError"
			:in-row="true"
			class="mb-6"
			@update:modelValue="onChangeHandler(tasksField.code, $event)"
		/>
		<group-radio-input
			v-if="propertyField.code"
			:model-field="propertyField"
			:is-loading="isLoading"
			:model-value="modelValue.property"
			class="mb-6"
			@update:modelValue="onChangeHandler(propertyField.code, $event)"
		/>
		<group-radio-input
			:model-field="documentsField"
			:is-loading="isLoading"
			:model-value="modelValue.documents"
			class="mb-6"
			@update:modelValue="onChangeHandler(documentsField.code, $event)"
		/>
		<group-radio-input
			v-if="learningField.code"
			:model-field="learningField"
			:is-loading="isLoading"
			:model-value="modelValue.learning"
			class="mb-6"
			@update:modelValue="onChangeHandler(learningField.code, $event)"
		/>
		<template v-if="viewer.isDev">
			<group-radio-input
				:model-field="childrenField"
				:is-loading="isLoading"
				:model-value="modelValue.children"
				class="mb-6"
				@update:modelValue="onChangeHandler(childrenField.code, $event)"
			/>
			<group-radio-input
				:model-field="emergencyContactsField"
				:is-loading="isLoading"
				:model-value="modelValue.emergency_contacts"
				class="mb-6"
				@update:modelValue="onChangeHandler(emergencyContactsField.code, $event)"
			/>
			<group-radio-input
				:model-field="notesField"
				:is-loading="isLoading"
				:model-value="modelValue.notes"
				class="mb-6"
				@update:modelValue="onChangeHandler(notesField.code, $event)"
			/>
		</template>
	</section>
</template>

<script lang="ts" setup>
import { computed, inject, PropType, Ref, ref } from "vue";

import {
	RoleSettingsCanViewOthers,
	RoleSettingsFormCanViewGroup,
	RoleSettingViewAccess,
} from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode } from "@/shared/lib";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";
import GroupRadioInput from "@/shared/ui/form/radio/ui/GroupRadioInput.vue";
import { useViewerStore } from "@/store/storeViewer";

const emit = defineEmits<{
	(e: "update:modelValue", payload: RoleSettingsCanViewOthers): void;
}>();
const props = defineProps({
	subgroup: {
		type: Object as PropType<RoleSettingsFormCanViewGroup>,
		required: true,
	},
	modelValue: {
		type: Object as PropType<RoleSettingsCanViewOthers>,
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

const tasksField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "tasks"),
);
const documentsField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "documents"),
);
const propertyField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "property"),
);
const childrenField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "children"),
);
const emergencyContactsField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "emergency_contacts"),
);
const notesField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "notes"),
);
const learningField = computed(() =>
	findFieldWithErrorsByCode(props.subgroup.fields || [], serverError.value, "learning"),
);
</script>

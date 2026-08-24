<script setup lang="ts">
import { cloneDeep } from "lodash";
import { inject, Ref, ref } from "vue";

import {
	RoleSettingsCanViewEdms,
	RoleSettingsFormCanViewGroup,
} from "@/shared/api/v0/settings/roles";
import { useForm } from "@/shared/lib/composible/useForm";
import { useVModelDeep } from "@/shared/lib/composible/useVModelDeep";
import BaseForm from "@/shared/ui/form/generic/BaseForm.vue";
import GroupRadioInput from "@/shared/ui/form/radio/ui/GroupRadioInput.vue";

const props = defineProps<{
	subgroup: RoleSettingsFormCanViewGroup;
}>();

const modelValue = defineModel<RoleSettingsCanViewEdms>();

const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const isLoading = inject<Ref<boolean>>("isLoading", ref(true));

const { form } = useForm(props.subgroup.fields, serverError);
</script>

<template>
	<base-form v-model:form="form">
		<template #snils="{ field }">
			<group-radio-input
				v-model="modelValue.snils"
				:model-field="field"
				:is-loading="isLoading"
			/>
		</template>
		<template #edms_certificates="{ field }">
			<group-radio-input
				v-model="modelValue.edms_certificates"
				:model-field="field"
				:is-loading="isLoading"
			/>
		</template>
		<template #passport_data="{ field }">
			<group-radio-input
				v-model="modelValue.passport_data"
				:model-field="field"
				:is-loading="isLoading"
			/>
		</template>
		<template #enabled_edms="{ field }">
			<group-radio-input
				v-model="modelValue.enabled_edms"
				:model-field="field"
				:is-loading="isLoading"
			/>
		</template>
	</base-form>
</template>

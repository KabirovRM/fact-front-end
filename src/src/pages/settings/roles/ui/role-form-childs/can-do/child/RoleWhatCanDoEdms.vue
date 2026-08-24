<script setup lang="ts">
import { cloneDeep } from "lodash";
import { computed, inject, Ref, ref } from "vue";

import { RoleSettingsFormGroup, RoleSettingsOutputDTO } from "@/shared/api/v0/settings/roles";
import { useForm } from "@/shared/lib/composible/useForm";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";
import BaseColumn from "@/shared/ui/grid/BaseColumn.vue";

const props = defineProps<{
	group: RoleSettingsFormGroup;
}>();

const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO")!;

const { form } = useForm(cloneDeep(props.group.fields), serverError);
const { form: childForm } = useForm(
	computed({
		get: () => form.value?.edms_access.field.items ?? [],
		set: (value) => (form.value.edms_access.field.items = value),
	}),
	serverError,
);
</script>

<template>
	<base-column :spacer="3">
		<base-checkbox
			v-model="outputDTO.can_do.edms_access"
			:model-field="form.edms_access"
			:is-loading="isLoading"
		/>
		<base-column
			v-if="outputDTO.can_do.edms_access"
			:spacer="3"
			class="r-w-can-do__child-items"
		>
			<base-checkbox
				v-model="outputDTO.can_do.edms_manage_documents"
				:model-field="childForm.edms_manage_documents"
				:is-loading="isLoading"
				@unmount="outputDTO.can_do.edms_manage_documents = false"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.edms_manage_normative_acts"
				:model-field="childForm.edms_manage_normative_acts"
				:is-loading="isLoading"
				@unmount="outputDTO.can_do.edms_manage_normative_acts = false"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.edms_manage_applications"
				:model-field="childForm.edms_manage_applications"
				:is-loading="isLoading"
				@unmount="outputDTO.can_do.edms_manage_applications = false"
			/>
			<base-checkbox
				v-if="childForm?.edms_manage_certificates"
				v-model="outputDTO.can_do.edms_manage_certificates"
				:model-field="childForm.edms_manage_certificates"
				:is-loading="isLoading"
				@unmount="outputDTO.can_do.edms_manage_certificates = false"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.edms_manage_allow"
				:model-field="childForm.edms_manage_allow"
				:is-loading="isLoading"
				@unmount="outputDTO.can_do.edms_manage_allow = false"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.edms_manage_attorneys"
				:model-field="childForm.edms_manage_attorneys"
				:is-loading="isLoading"
				@unmount="outputDTO.can_do.edms_manage_attorneys = false"
			/>
		</base-column>
	</base-column>
</template>

<template>
	<base-checkbox
		v-model="outputDTO.can_do.employees"
		:in-row="true"
		:is-loading="isLoading"
		:model-field="employeesField"
		:server-error="serverError"
	/>

	<base-column v-if="outputDTO.can_do.employees" :spacer="3" class="r-w-can-do__child-items">
		<base-checkbox
			v-model="outputDTO.can_do.view_employees_ranks"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="viewEmployeesRanksField"
			:server-error="serverError"
			@unmount="outputDTO.can_do.view_employees_ranks = false"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.view_dismissal"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="viewDismissalField"
			:server-error="serverError"
			@unmount="outputDTO.can_do.view_dismissal = false"
		/>

		<group-radio-input
			v-if="outputDTO.can_do.view_dismissal"
			v-model="outputDTO.can_do.manage_personal_data"
			:is-loading="isLoading"
			:model-field="managePersonalDataField"
		/>

		<base-checkbox
			v-model="outputDTO.can_do.add_employees"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="addEmployeesField"
			:server-error="serverError"
			@unmount="outputDTO.can_do.add_employees = false"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.send_invitations_in_system"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="sendInvitationsInSystemField"
			:server-error="serverError"
			@unmount="outputDTO.can_do.send_invitations_in_system = false"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.reset_passwords"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="resetPasswordsField"
			:server-error="serverError"
			@unmount="outputDTO.can_do.reset_passwords = false"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.access_in_system"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="accessInSystemField"
			:server-error="serverError"
			@unmount="outputDTO.can_do.access_in_system = false"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.dismiss_employees"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="dismissEmployeesField"
			:server-error="serverError"
			@unmount="outputDTO.can_do.dismiss_employees = false"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.manage_onboarding"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="manageOnboardingField"
			:server-error="serverError"
			@unmount="outputDTO.can_do.manage_onboarding = false"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.change_employee_photos"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="changeEmployeePhotosField"
			:server-error="serverError"
			@unmount="outputDTO.can_do.change_employee_photos = false"
		/>
	</base-column>
</template>

<script lang="ts" setup>
import { computed, inject, Ref, ref } from "vue";

import { RoleSettingsFormGroup, RoleSettingsOutputDTO } from "@/shared/api/v0/settings/roles";
import { makeFieldSelector } from "@/shared/lib/helpers/field/lib/makeFieldSelector";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";
import GroupRadioInput from "@/shared/ui/form/radio/ui/GroupRadioInput.vue";
import BaseColumn from "@/shared/ui/grid/BaseColumn.vue";

const props = defineProps<{
	group: RoleSettingsFormGroup;
}>();

const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO");

const fieldByCode = makeFieldSelector(
	computed(() => props.group.fields),
	serverError,
);

const employeesField = fieldByCode("employees");
const employeesChild = makeFieldSelector(
	computed(() => employeesField.value.field.items),
	serverError,
);
const addEmployeesField = employeesChild("add_employees");
const sendInvitationsInSystemField = employeesChild("send_invitations_in_system");
const resetPasswordsField = employeesChild("reset_passwords");
const accessInSystemField = employeesChild("access_in_system");
const dismissEmployeesField = employeesChild("dismiss_employees");
const manageOnboardingField = employeesChild("manage_onboarding");
const changeEmployeePhotosField = employeesChild("change_employee_photos");
const viewEmployeesRanksField = employeesChild("view_employees_ranks");

const viewDismissalField = fieldByCode("view_dismissal");
const managePersonalDataField = fieldByCode("manage_personal_data");
</script>

<template>
	<base-column :spacer="4">
		<base-checkbox
			v-if="viewer.isDev && changeHolidayPolicyField.code"
			v-model="outputDTO.can_do.change_holidays_policy"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="changeHolidayPolicyField"
			:server-error="serverError"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.show_employees_all_companies"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="showEmployeesAllCompaniesField"
			:server-error="serverError"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.show_absence_detail"
			:is-loading="isLoading"
			:model-field="showAbsenceDetailField"
			:server-error="serverError"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.add_substitute"
			:is-loading="isLoading"
			:model-field="addSubstituteField"
			:server-error="serverError"
		/>
		<base-column :spacer="6">
			<group-radio-input
				v-if="manageAssetsField.code"
				v-model="outputDTO.can_do.manage_assets"
				:is-loading="isLoading"
				:model-field="manageAssetsField"
			/>
		</base-column>
	</base-column>
</template>

<script lang="ts" setup>
import { computed, inject, PropType, Ref, ref } from "vue";

import { RoleSettingsFormGroup, RoleSettingsOutputDTO } from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode } from "@/shared/lib";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";
import GroupRadioInput from "@/shared/ui/form/radio/ui/GroupRadioInput.vue";
import BaseColumn from "@/shared/ui/grid/BaseColumn.vue";
import { useViewerStore } from "@/store/storeViewer";

const viewer = useViewerStore();

const props = defineProps({
	group: {
		type: Object as PropType<RoleSettingsFormGroup>,
		required: true,
	},
});

const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO");

const changeHolidayPolicyField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "change_holidays_policy"),
);
const manageAssetsField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_assets"),
);
const showEmployeesAllCompaniesField = computed(() =>
	findFieldWithErrorsByCode(
		props.group.fields,
		serverError.value,
		"show_employees_all_companies",
	),
);
const showAbsenceDetailField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "show_absence_detail"),
);

const addSubstituteField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "add_substitute"),
);
</script>
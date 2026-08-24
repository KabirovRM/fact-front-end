<script setup lang="ts">
import { computed, inject, PropType, Ref, ref } from "vue";

import { RoleSettingsFormGroup, RoleSettingsOutputDTO } from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode, translate } from "@/shared/lib";
import BaseDisplace from "@/shared/ui/displace/BaseDisplace.vue";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";
import BaseFieldLabel from "@/shared/ui/form/field/ui/BaseFieldLabel.vue";
import BaseColumn from "@/shared/ui/grid/BaseColumn.vue";
import BaseSheet from "@/shared/ui/sheet/BaseSheet.vue";

const props = defineProps({
	group: {
		type: Object as PropType<RoleSettingsFormGroup>,
		required: true,
	},
});

const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO");

const managePDPField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_pdp"),
);
const managePDPAllField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_pdp_all"),
);
const managePDPSelfField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_pdp_self"),
);
const managePDPSubordinatesField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_pdp_subordinate"),
);
const checkPDPField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "check_pdp"),
);
const checkPDPAllField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "check_pdp_all"),
);
const checkPDPSelfField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "check_pdp_self"),
);
const checkPDPSubordinatesField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "check_pdp_subordinate"),
);
const seeCompetenciesAllField = computed(() =>
	findFieldWithErrorsByCode(
		props.group.fields,
		serverError.value,
		"see_profile_competencies_all",
	),
);
const seeCompetenciesSubordinateField = computed(() =>
	findFieldWithErrorsByCode(
		props.group.fields,
		serverError.value,
		"see_profile_competencies_subordinate",
	),
);

const addProfileCompetencies = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "add_profile_competencies"),
);

const showAddProfileCompetencies = computed(
	() =>
		outputDTO.value.can_do.see_profile_competencies_all ||
		outputDTO.value.can_do.see_profile_competencies_subordinate,
);

const updateModelValue = (value, selectedCode) => {
	if (!value) {
		outputDTO.value.can_do.add_profile_competencies = false;
	} else {
		["see_profile_competencies_subordinate", "see_profile_competencies_all"]
			.filter((code) => code !== selectedCode)
			.forEach((code) => {
				outputDTO.value.can_do[code] = false;
			});
	}
};
</script>

<template>
	<base-column :spacer="3">
		<base-checkbox
			v-if="managePDPField.code"
			v-model="outputDTO.can_do.manage_pdp"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="managePDPField"
			:server-error="serverError"
		/>
		<base-column v-if="outputDTO.can_do.manage_pdp" :spacer="3" class="r-w-can-do__child-items">
			<base-checkbox
				v-model="outputDTO.can_do.manage_pdp_self"
				:is-loading="isLoading"
				:model-field="managePDPSelfField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.manage_pdp_self = false"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.manage_pdp_subordinate"
				:is-loading="isLoading"
				:model-field="managePDPSubordinatesField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.manage_pdp_subordinate = false"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.manage_pdp_all"
				:is-loading="isLoading"
				:model-field="managePDPAllField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.manage_pdp_all = false"
			/>
		</base-column>

		<base-checkbox
			v-if="checkPDPField.code"
			v-model="outputDTO.can_do.check_pdp"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="checkPDPField"
			:server-error="serverError"
		/>
		<base-column :spacer="3" class="r-w-can-do__child-items">
			<base-checkbox
				v-if="outputDTO.can_do.check_pdp"
				v-model="outputDTO.can_do.check_pdp_self"
				:is-loading="isLoading"
				:model-field="checkPDPSelfField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.check_pdp_self = false"
			/>
			<base-checkbox
				v-if="outputDTO.can_do.check_pdp"
				v-model="outputDTO.can_do.check_pdp_subordinate"
				:is-loading="isLoading"
				:model-field="checkPDPSubordinatesField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.check_pdp_subordinate = false"
			/>
			<base-checkbox
				v-if="outputDTO.can_do.check_pdp"
				v-model="outputDTO.can_do.check_pdp_all"
				:is-loading="isLoading"
				:model-field="checkPDPAllField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.check_pdp_all = false"
			/>
		</base-column>

		<base-sheet color="transporent" bordered dashed padding="1rem">
			<base-field-label :name="translate('competency.accessRightTitle')" />
			<base-checkbox
				v-model="outputDTO.can_do.see_profile_competencies_all"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="seeCompetenciesAllField"
				:server-error="serverError"
				@update:model-value="(v) => updateModelValue(v, 'see_profile_competencies_all')"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.see_profile_competencies_subordinate"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="seeCompetenciesSubordinateField"
				:server-error="serverError"
				@update:model-value="
					(v) => updateModelValue(v, 'see_profile_competencies_subordinate')
				"
			/>
		</base-sheet>
		<base-displace>
			<base-checkbox
				v-if="showAddProfileCompetencies"
				v-model="outputDTO.can_do.add_profile_competencies"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="addProfileCompetencies"
				:server-error="serverError"
			/>
		</base-displace>
	</base-column>
</template>

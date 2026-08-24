<script setup lang="ts">
import { computed } from "vue";

import { RoleSettingsOutputCanDo } from "@/shared/api/v0/settings/roles/models";
import { findFieldWithErrorsByCode } from "@/shared/lib/helpers/field/lib/field";
import { Field } from "@/shared/lib/helpers/field/model/model";
import BaseDisplace from "@/shared/ui/displace/BaseDisplace.vue";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";
import GroupRadioInput from "@/shared/ui/form/radio/ui/GroupRadioInput.vue";
import BaseColumn from "@/shared/ui/grid/BaseColumn.vue";
import BaseTranslate from "@/shared/ui/i18n/BaseTranslate.vue";

const props = defineProps<{
	fields: Field[];
	serverError: ServerError | null;
}>();

defineModel<RoleSettingsOutputCanDo>("canDo", { required: true });

const accessQuestionnairesField = computed(() =>
	findFieldWithErrorsByCode(props.fields, props.serverError, "access_candidate_questionnaire"),
);
const addQuestionnairesField = computed(() =>
	findFieldWithErrorsByCode(props.fields, props.serverError, "add_candidate_questionnaire"),
);
const viewQuestionnairesField = computed(() =>
	findFieldWithErrorsByCode(props.fields, props.serverError, "view_candidate_questionnaire"),
);
const manageAllQuestionnairesField = computed(() =>
	findFieldWithErrorsByCode(
		props.fields,
		props.serverError,
		"manage_all_candidate_questionnaire",
	),
);
</script>

<template>
	<p class="fw-bold fs-6">
		<base-translate path="settings.accessRights.candidates.questionnaires.title" />
	</p>

	<base-column :spacer="3" class="cq-col">
		<base-checkbox
			v-model="canDo.access_candidate_questionnaire"
			:model-field="accessQuestionnairesField"
		/>
		<base-displace>
			<base-column v-show="canDo.access_candidate_questionnaire" :spacer="3">
				<base-checkbox
					v-model="canDo.add_candidate_questionnaire"
					:model-field="addQuestionnairesField"
				/>
				<group-radio-input
					v-model="canDo.view_candidate_questionnaire"
					:model-field="viewQuestionnairesField"
				/>
				<base-displace>
					<base-checkbox
						v-show="canDo.view_candidate_questionnaire === 'all'"
						v-model="canDo.manage_all_candidate_questionnaire"
						:model-field="manageAllQuestionnairesField"
					/>
				</base-displace>
			</base-column>
		</base-displace>
	</base-column>
</template>

<style scoped lang="scss">
.cq-col {
	padding-left: 1.5rem;
}
</style>

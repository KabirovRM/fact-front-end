<script lang="ts" setup>
import { computed, inject, Ref, ref, watch } from "vue";

import RoleCanDoCandidateQuestionnaires from "@/pages/settings/roles/ui/role-form-childs/can-do/child/RoleCanDoCandidateQuestionnaires.vue";
import RoleCanDoPreboarding from "@/pages/settings/roles/ui/role-form-childs/can-do/child/RoleCanDoPreboarding.vue";
import {
	RoleSettingsFormGroup,
	RoleSettingsOutputDTO,
} from "@/shared/api/v0/settings/roles/models";
import { useForm } from "@/shared/lib/composible/useForm";
import { findFieldWithErrorsByCode } from "@/shared/lib/helpers/field/lib/field";
import { Field } from "@/shared/lib/helpers/field/model/model";
import { appRoutes } from "@/shared/lib/helpers/navigation/routes";
import { translate } from "@/shared/lib/theming/i18n/translate";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";
import GroupRadioInput from "@/shared/ui/form/radio/ui/GroupRadioInput.vue";
import BaseColumn from "@/shared/ui/grid/BaseColumn.vue";
import BaseTranslate from "@/shared/ui/i18n/BaseTranslate.vue";

const props = defineProps<{ group: RoleSettingsFormGroup }>();
const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO")!;

const accessRecruitingField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "access_recruiting"),
);

const recruitingFields = computed(
	() => (accessRecruitingField.value?.field.items as Field[]) || [],
);

const { form, formValues } = useForm(recruitingFields, serverError);

function getDisabledValues(value) {
	switch (value) {
		case "self":
			return ["self-department", "all"];
		case "self-department":
			return ["all"];
		default:
			return [];
	}
}

const values = ["self", "self-department", "all"];
function makeGroupValueWatcher(watchValue, fields: Field[]) {
	watch(watchValue, (newValue, oldValue) => {
		const newValueIndex = values.indexOf(newValue as string);
		const oldValueIndex = values.indexOf(oldValue as string);
		if (newValueIndex < oldValueIndex)
			fields.forEach((field) => {
				const fieldValueIndex = values.indexOf(field.value);
				if (newValueIndex < fieldValueIndex) field.value = newValue;
			});
	});
}

if (form.value.candidate_show) {
	makeGroupValueWatcher(
		() => form.value.candidate_show.field.value,
		[form.value.candidate_edit.field, form.value.candidate_delete.field],
	);
}

if (form.value.recruitment_plan_show) {
	makeGroupValueWatcher(
		() => form.value.recruitment_plan_show.field.value,
		[form.value.recruitment_plan_edit.field, form.value.recruitment_plan_delete.field],
	);
}
if (form.value.vacancies_show) {
	makeGroupValueWatcher(
		() => form.value.vacancies_show.field.value,
		[form.value.vacancies_edit.field, form.value.vacancies_delete.field],
	);
}

const disabledValuesRecruitmentPlan = computed(() =>
	getDisabledValues(formValues.value.recruitment_plan_show),
);
const disabledValuesVacancies = computed(() => getDisabledValues(formValues.value.vacancies_show));
const disabledValuesCandidate = computed(() => getDisabledValues(formValues.value.candidate_show));

Object.keys(formValues.value).forEach((key) => {
	watch(
		() => formValues.value[key],
		(v, oldV) => {
			if (v !== oldV) outputDTO.value.can_do[key] = v;
		},
	);
});

const manageTestTemplatesField = computed(() =>
	findFieldWithErrorsByCode(recruitingFields.value, serverError.value, "manage_test_templates"),
);
const exportDataField = computed(() =>
	findFieldWithErrorsByCode(recruitingFields.value, serverError.value, "export_data"),
);
const manageJobOffersField = computed(() =>
	findFieldWithErrorsByCode(recruitingFields.value, serverError.value, "manage_job_offers"),
);
const deleteCandidatesField = computed(() =>
	findFieldWithErrorsByCode(recruitingFields.value, serverError.value, "delete_candidates"),
);
const viewSalaryByCandidateField = computed(() =>
	findFieldWithErrorsByCode(
		recruitingFields.value,
		serverError.value,
		"view_salary_by_candidate",
	),
);
const createVacancyField = computed(() =>
	findFieldWithErrorsByCode(recruitingFields.value, serverError.value, "create_vacancy"),
);
const viewSalaryByVacancy = computed(() =>
	findFieldWithErrorsByCode(recruitingFields.value, serverError.value, "view_salary_by_vacancy"),
);
</script>

<template>
	<base-checkbox
		v-model="outputDTO.can_do.access_recruiting"
		:in-row="true"
		:is-loading="isLoading"
		:model-field="accessRecruitingField"
		:server-error="serverError"
		class="mb-6"
	/>
	<div v-if="outputDTO.can_do.access_recruiting" class="ms-6">
		<base-column :spacer="5">
			<p class="fw-bold fs-6">{{ translate("recruitmentPlan.title") }}</p>
			<base-column :spacer="3" class="ml-6">
				<div class="fw-bold fs-6">
					{{ translate("actions.customizePlease") }}
					<router-link
						class="text-primary hover:opacity-70"
						:to="appRoutes.SETTINGS_VACANCY_REQUEST.path"
						target="_blank"
					>
						{{ translate("vacancy.requestForm.customizeTitle") }}.
					</router-link>
				</div>
				<base-checkbox
					v-if="form.recruitment_plan_add"
					v-model="form.recruitment_plan_add.field.value"
					:model-field="form.recruitment_plan_add"
				/>
				<group-radio-input
					v-if="form.recruitment_plan_show"
					v-model="form.recruitment_plan_show.field.value"
					:model-field="form.recruitment_plan_show"
				/>
				<group-radio-input
					v-if="form.recruitment_plan_edit"
					v-model="form.recruitment_plan_edit.field.value"
					:model-field="form.recruitment_plan_edit"
					:disabled-values="disabledValuesRecruitmentPlan"
				/>
				<group-radio-input
					v-if="form.recruitment_plan_delete"
					v-model="form.recruitment_plan_delete.field.value"
					:model-field="form.recruitment_plan_delete"
					:disabled-values="disabledValuesRecruitmentPlan"
				/>
			</base-column>

			<p class="fw-bold fs-6">{{ translate("vacancy.titles") }}</p>
			<base-column :spacer="3" class="ml-6">
				<base-checkbox
					v-model="outputDTO.can_do.create_vacancy"
					:is-loading="isLoading"
					:model-field="createVacancyField"
					:server-error="serverError"
					@unmount="outputDTO.can_do.create_vacancy = false"
				/>
				<group-radio-input
					v-if="form.vacancies_show"
					v-model="form.vacancies_show.field.value"
					:model-field="form.vacancies_show"
				/>
				<group-radio-input
					v-if="form.vacancies_edit"
					v-model="form.vacancies_edit.field.value"
					:model-field="form.vacancies_edit"
					:disabled-values="disabledValuesVacancies"
				/>
				<group-radio-input
					v-if="form.vacancies_delete"
					v-model="form.vacancies_delete.field.value"
					:model-field="form.vacancies_delete"
					:disabled-values="disabledValuesVacancies"
				/>
			</base-column>

			<p class="fw-bold fs-6">{{ translate("candidate.titles") }}</p>
			<base-column :spacer="3" class="ml-6">
				<base-checkbox
					v-if="form.candidate_add"
					v-model="form.candidate_add.field.value"
					:model-field="form.candidate_add"
				/>
				<group-radio-input
					v-if="form.candidate_show"
					v-model="form.candidate_show.field.value"
					:model-field="form.candidate_show"
				/>
				<group-radio-input
					v-if="form.candidate_edit"
					v-model="form.candidate_edit.field.value"
					:model-field="form.candidate_edit"
					:disabled-values="disabledValuesCandidate"
				/>
				<group-radio-input
					v-if="form.candidate_delete"
					v-model="form.candidate_delete.field.value"
					:model-field="form.candidate_delete"
					:disabled-values="disabledValuesCandidate"
				/>
			</base-column>

			<p class="fw-bold fs-6">
				<base-translate path="salary.title" />
			</p>
			<base-column :spacer="3" class="ml-6">
				<base-checkbox
					v-model="outputDTO.can_do.view_salary_by_vacancy"
					:is-loading="isLoading"
					:model-field="viewSalaryByVacancy"
					:server-error="serverError"
					@unmount="outputDTO.can_do.view_salary_by_vacancy = false"
				/>
				<base-checkbox
					v-model="outputDTO.can_do.view_salary_by_candidate"
					:is-loading="isLoading"
					:model-field="viewSalaryByCandidateField"
					:server-error="serverError"
					@unmount="outputDTO.can_do.view_salary_by_candidate = false"
				/>
			</base-column>

			<p class="fw-bold fs-6">
				<base-translate path="export.title" />
			</p>
			<base-column :spacer="3" class="ml-6">
				<base-checkbox
					v-model="outputDTO.can_do.export_data"
					:is-loading="isLoading"
					:model-field="exportDataField"
					:server-error="serverError"
					@unmount="outputDTO.can_do.export_data = false"
				/>
			</base-column>

			<p class="fw-bold fs-6">
				<base-translate path="offer.title" />
			</p>
			<base-column :spacer="3" class="ml-6">
				<group-radio-input
					v-if="form.offer_manage"
					v-model="form.offer_manage.field.value"
					:model-field="form.offer_manage"
				/>
			</base-column>
			<role-can-do-preboarding
				v-model:can-do="outputDTO.can_do"
				:fields="recruitingFields"
				:server-error="serverError"
			/>
			<role-can-do-candidate-questionnaires
				v-model:can-do="outputDTO.can_do"
				:fields="recruitingFields"
				:server-error="serverError"
			/>
		</base-column>
	</div>
</template>

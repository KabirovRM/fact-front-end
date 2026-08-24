<template>
	<base-column :spacer="3">
		<base-checkbox
			v-if="manageKpiField.code"
			v-model="outputDTO.can_do.manage_kpi"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="manageKpiField"
			:server-error="serverError"
		/>
		<base-column v-if="outputDTO.can_do.manage_kpi" :spacer="3" class="r-w-can-do__child-items">
			<base-checkbox
				v-model="outputDTO.can_do.manage_kpi_self"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="manageKpiSelfField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.manage_kpi_self = false"
			/>

			<base-checkbox
				v-model="outputDTO.can_do.manage_kpi_subordinate"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="manageKpiSubordinateField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.manage_kpi_subordinate = false"
			/>

			<base-checkbox
				v-model="outputDTO.can_do.manage_kpi_all"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="manageKpiAllField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.manage_kpi_all = false"
			/>
		</base-column>

		<base-checkbox
			v-if="form.see_kpi"
			v-model="form.see_kpi.field.value"
			:model-field="form.see_kpi"
			:in-row="true"
			:is-loading="isLoading"
			:server-error="serverError"
		/>
		<base-column v-if="form.see_kpi?.field.value" :spacer="3" class="r-w-can-do__child-items">
			<base-checkbox
				v-model="seeKpiNestedForm.see_kpi_self.field.value"
				:model-field="seeKpiNestedForm.see_kpi_self"
				:in-row="true"
				:is-loading="isLoading"
				:server-error="serverError"
				@unmount="seeKpiNestedForm.see_kpi_self.field.value = false"
			/>
			<base-checkbox
				v-model="seeKpiNestedForm.see_kpi_subordinate.field.value"
				:model-field="seeKpiNestedForm.see_kpi_subordinate"
				:in-row="true"
				:is-loading="isLoading"
				:server-error="serverError"
				@unmount="seeKpiNestedForm.see_kpi_subordinate.field.value = false"
			/>
			<base-checkbox
				v-model="seeKpiNestedForm.see_kpi_all.field.value"
				:model-field="seeKpiNestedForm.see_kpi_all"
				:in-row="true"
				:is-loading="isLoading"
				:server-error="serverError"
				@unmount="seeKpiNestedForm.see_kpi_all.field.value = false"
			/>
		</base-column>

		<base-checkbox
			v-if="form.see_kpi_bonus"
			v-model="form.see_kpi_bonus.field.value"
			:model-field="form.see_kpi_bonus"
			:in-row="true"
			:is-loading="isLoading"
			:server-error="serverError"
		/>
		<base-column
			v-if="form.see_kpi_bonus?.field.value"
			:spacer="3"
			class="r-w-can-do__child-items"
		>
			<base-checkbox
				v-model="seeKpiBonusNestedForm.see_kpi_bonus_self.field.value"
				:model-field="seeKpiBonusNestedForm.see_kpi_bonus_self"
				:in-row="true"
				:is-loading="isLoading"
				:server-error="serverError"
				@unmount="seeKpiBonusNestedForm.see_kpi_bonus_self.field.value = false"
			/>
			<base-checkbox
				v-model="seeKpiBonusNestedForm.see_kpi_bonus_subordinate.field.value"
				:model-field="seeKpiBonusNestedForm.see_kpi_bonus_subordinate"
				:in-row="true"
				:is-loading="isLoading"
				:server-error="serverError"
				@unmount="seeKpiBonusNestedForm.see_kpi_bonus_subordinate.field.value = false"
			/>
			<base-checkbox
				v-model="seeKpiBonusNestedForm.see_kpi_bonus_all.field.value"
				:model-field="seeKpiBonusNestedForm.see_kpi_bonus_all"
				:in-row="true"
				:is-loading="isLoading"
				:server-error="serverError"
				@unmount="seeKpiBonusNestedForm.see_kpi_bonus_all.field.value = false"
			/>
		</base-column>

		<base-checkbox
			v-if="form.manage_kpi_bonus"
			v-model="form.manage_kpi_bonus.field.value"
			:model-field="form.manage_kpi_bonus"
			:in-row="true"
			:is-loading="isLoading"
			:server-error="serverError"
		/>
		<base-column
			v-if="form.manage_kpi_bonus?.field.value"
			:spacer="3"
			class="r-w-can-do__child-items"
		>
			<base-checkbox
				v-model="manageKpiBonusNestedForm.manage_kpi_bonus_self.field.value"
				:model-field="manageKpiBonusNestedForm.manage_kpi_bonus_self"
				:in-row="true"
				:is-loading="isLoading"
				:server-error="serverError"
				@unmount="manageKpiBonusNestedForm.manage_kpi_bonus_self.field.value = false"
			/>
			<base-checkbox
				v-model="manageKpiBonusNestedForm.manage_kpi_bonus_subordinate.field.value"
				:model-field="manageKpiBonusNestedForm.manage_kpi_bonus_subordinate"
				:in-row="true"
				:is-loading="isLoading"
				:server-error="serverError"
				@unmount="manageKpiBonusNestedForm.manage_kpi_bonus_subordinate.field.value = false"
			/>
			<base-checkbox
				v-model="manageKpiBonusNestedForm.manage_kpi_bonus_all.field.value"
				:model-field="manageKpiBonusNestedForm.manage_kpi_bonus_all"
				:in-row="true"
				:is-loading="isLoading"
				:server-error="serverError"
				@unmount="manageKpiBonusNestedForm.manage_kpi_bonus_all.field.value = false"
			/>
		</base-column>

		<base-checkbox
			v-if="manageTargetField.code"
			v-model="outputDTO.can_do.manage_target"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="manageTargetField"
			:server-error="serverError"
		/>

		<base-column
			v-if="outputDTO.can_do.manage_target"
			:spacer="3"
			class="r-w-can-do__child-items"
		>
			<base-checkbox
				v-model="outputDTO.can_do.manage_target_self"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="manageTargetSelfField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.manage_target_self = false"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.manage_target_subordinate"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="manageTargetSubordinateField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.manage_target_subordinate = false"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.manage_target_all"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="manageTargetAllField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.manage_target_all = false"
			/>
		</base-column>

		<base-checkbox
			v-if="managePerformanceField.code"
			v-model="outputDTO.can_do.manage_performance_evaluation"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="managePerformanceField"
			:server-error="serverError"
		/>

		<div v-if="outputDTO.can_do.manage_performance_evaluation" class="r-w-can-do__child-items">
			<base-checkbox
				v-model="outputDTO.can_do.view_all_evaluation_results"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="viewAllEvaluationResultsField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.view_all_evaluation_results = false"
			/>
		</div>

		<base-checkbox
			v-if="manage1on1Field.code"
			v-model="outputDTO.can_do.manage_1_on_1"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="manage1on1Field"
			:server-error="serverError"
		/>

		<base-column
			v-if="outputDTO.can_do.manage_1_on_1"
			:spacer="3"
			class="r-w-can-do__child-items"
		>
			<base-checkbox
				v-model="outputDTO.can_do.manage_1_on_1_self"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="manage1on1SelfField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.manage_1_on_1_self = false"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.manage_1_on_1_subordinate"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="manage1on1SubordinateField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.manage_1_on_1_subordinate = false"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.manage_1_on_1_all"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="manage1on1AllField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.manage_1_on_1_all = false"
			/>
		</base-column>

		<base-checkbox
			v-if="riskZoneField.code"
			v-model="outputDTO.can_do.risk_zone"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="riskZoneField"
			:server-error="serverError"
		/>

		<base-column v-if="outputDTO.can_do.risk_zone" :spacer="3" class="r-w-can-do__child-items">
			<base-checkbox
				v-model="outputDTO.can_do.see_risk_zone_self"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="manageRiskZoneSelfField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.see_risk_zone_self = false"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.see_risk_zone_subordinate"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="manageRiskZoneSubordinateField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.see_risk_zone_subordinate = false"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.see_risk_zone_all"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="manageRiskZoneAllField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.see_risk_zone_all = false"
			/>
		</base-column>

		<base-checkbox
			v-if="manageCompetenciesField.code"
			v-model="outputDTO.can_do.manage_competencies"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="manageCompetenciesField"
			:server-error="serverError"
		/>

		<base-checkbox
			v-if="performanceReviewField.code"
			v-model="outputDTO.can_do.see_performance_review"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="performanceReviewField"
			:server-error="serverError"
		/>

		<base-column
			v-if="outputDTO.can_do.see_performance_review"
			:spacer="3"
			class="r-w-can-do__child-items"
		>
			<base-checkbox
				v-model="outputDTO.can_do.see_performance_review_subordinate"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="managePerformanceReviewSubordinateField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.see_performance_review_subordinate = false"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.see_performance_review_all"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="managePerformanceReviewAllField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.see_performance_review_all = false"
			/>
		</base-column>

		<base-checkbox
			v-if="managePerformanceReviewField.code"
			v-model="outputDTO.can_do.manage_performance_review"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="managePerformanceReviewField"
			:server-error="serverError"
		/>
	</base-column>
</template>

<script lang="ts" setup>
import { computed, inject, nextTick, PropType, Ref, ref, watch } from "vue";

import { RoleSettingsFormGroup, RoleSettingsOutputDTO } from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode } from "@/shared/lib";
import { useForm } from "@/shared/lib/composible/useForm";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";
import BaseColumn from "@/shared/ui/grid/BaseColumn.vue";
import { useViewerStore } from "@/store/storeViewer";

const props = defineProps({
	group: {
		type: Object as PropType<RoleSettingsFormGroup>,
		required: true,
	},
});

const viewer = useViewerStore();
const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO")!;

function doFormWatch(formValues: Ref<Record<string, any>>) {
	Object.entries(formValues.value).forEach(([key, value]) => {
		watch(
			() => formValues.value[key],
			(v, oldV) => {
				if (v !== oldV) outputDTO.value.can_do[key] = v;
			},
		);
	});
}

const { form, formValues } = useForm(props.group.fields, serverError);
const { form: seeKpiNestedForm, formValues: seeKpiNestedFormValues } = useForm(
	computed(() => form.value.see_kpi?.field.items),
	serverError,
);
const { form: seeKpiBonusNestedForm, formValues: seeKpiBonusNestedFormValues } = useForm(
	computed(() => form.value.see_kpi_bonus?.field.items),
	serverError,
);
const { form: manageKpiBonusNestedForm, formValues: manageKpiBonusNestedFormValues } = useForm(
	computed(() => form.value.manage_kpi_bonus?.field.items),
	serverError,
);

doFormWatch(formValues);
doFormWatch(seeKpiNestedFormValues);
doFormWatch(seeKpiBonusNestedFormValues);
doFormWatch(manageKpiBonusNestedFormValues);

const manageKpiField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_kpi"),
);
const manageKpiSelfField = computed(() =>
	findFieldWithErrorsByCode(
		manageKpiField.value.field.items || [],
		serverError.value,
		"manage_kpi_self",
	),
);
const manageKpiSubordinateField = computed(() =>
	findFieldWithErrorsByCode(
		manageKpiField.value.field.items || [],
		serverError.value,
		"manage_kpi_subordinate",
	),
);
const manageKpiAllField = computed(() =>
	findFieldWithErrorsByCode(
		manageKpiField.value.field.items || [],
		serverError.value,
		"manage_kpi_all",
	),
);

const seeKpiField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "see_kpi"),
);
const seeKpiAllField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "see_kpi"),
);

const manageTargetField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_target"),
);
const manageTargetSelfField = computed(() =>
	findFieldWithErrorsByCode(
		manageTargetField.value.field.items || [],
		serverError.value,
		"manage_target_self",
	),
);
const manageTargetSubordinateField = computed(() =>
	findFieldWithErrorsByCode(
		manageTargetField.value.field.items || [],
		serverError.value,
		"manage_target_subordinate",
	),
);
const manageTargetAllField = computed(() =>
	findFieldWithErrorsByCode(
		manageTargetField.value.field.items || [],
		serverError.value,
		"manage_target_all",
	),
);

const manage1on1Field = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_1_on_1"),
);

const manage1on1SelfField = computed(() =>
	findFieldWithErrorsByCode(
		manage1on1Field.value.field.items || [],
		serverError.value,
		"manage_1_on_1_self",
	),
);
const manage1on1SubordinateField = computed(() =>
	findFieldWithErrorsByCode(
		manage1on1Field.value.field.items || [],
		serverError.value,
		"manage_1_on_1_subordinate",
	),
);
const manage1on1AllField = computed(() =>
	findFieldWithErrorsByCode(
		manage1on1Field.value.field.items || [],
		serverError.value,
		"manage_1_on_1_all",
	),
);
const managePerformanceField = computed(() =>
	findFieldWithErrorsByCode(
		props.group.fields,
		serverError.value,
		"manage_performance_evaluation",
	),
);
const viewAllEvaluationResultsField = computed(() =>
	findFieldWithErrorsByCode(
		managePerformanceField.value.field.items || [],
		serverError.value,
		"view_all_evaluation_results",
	),
);
const riskZoneField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "risk_zone"),
);

const manageRiskZoneAllField = computed(() =>
	findFieldWithErrorsByCode(
		riskZoneField.value.field.items || [],
		serverError.value,
		"see_risk_zone_all",
	),
);
const manageRiskZoneSelfField = computed(() =>
	findFieldWithErrorsByCode(
		riskZoneField.value.field.items || [],
		serverError.value,
		"see_risk_zone_self",
	),
);
const manageRiskZoneSubordinateField = computed(() =>
	findFieldWithErrorsByCode(
		riskZoneField.value.field.items || [],
		serverError.value,
		"see_risk_zone_subordinate",
	),
);
const manageCompetenciesField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_competencies"),
);

const performanceReviewField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "see_performance_review"),
);
const managePerformanceReviewSubordinateField = computed(() =>
	findFieldWithErrorsByCode(
		performanceReviewField.value.field.items || [],
		serverError.value,
		"see_performance_review_subordinate",
	),
);
const managePerformanceReviewAllField = computed(() =>
	findFieldWithErrorsByCode(
		performanceReviewField.value.field.items || [],
		serverError.value,
		"see_performance_review_all",
	),
);
const managePerformanceReviewField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_performance_review"),
);
</script>

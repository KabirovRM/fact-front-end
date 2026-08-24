<template>
	<base-select
		v-model="value"
		:server-error="serverError"
		:model-field="companyReportsField"
		:is-loading="isLoading"
		:no-match-text="translate('common.noMatchText')"
		is-multiple
		collapse-tags-tooltip
		filterable
	>
		<template #options>
			<el-option-group
				v-for="(group, index) in companyReportsField.field.possibleValues"
				:key="index"
				:label="group.name"
			>
				<el-option
					v-for="report in group.reports"
					:key="report.id"
					:label="report.name"
					:value="report.id"
				/>
			</el-option-group>
		</template>
	</base-select>
</template>

<script lang="ts" setup>
import { toReactive } from "@vueuse/core";
import { inject, PropType, Ref, ref, toRef } from "vue";
import { computed } from "vue";

import { RoleSettingsFormGroup, RoleSettingsOutputDTO } from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode, translate } from "@/shared/lib";
import BaseSelect from "@/shared/ui/form/select/ui/index.vue";

const props = defineProps({
	group: {
		type: Object as PropType<RoleSettingsFormGroup>,
		required: true,
	},
});

const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO")!;
const value = toRef(toReactive(outputDTO).can_do, "company_reports");
if (!value.value) value.value = [];

const companyReportsField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "company_reports"),
);
</script>

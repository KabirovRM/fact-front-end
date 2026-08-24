<template>
	<base-column :spacer="3">
		<base-checkbox
			v-if="manageStoreField.field.name"
			v-model="outputDTO.can_do.manage_store"
			:is-loading="isLoading"
			:server-error="serverError"
			:model-field="manageStoreField"
		/>
		<base-checkbox
			v-if="manageDailyQuestionsField.field.name"
			v-model="outputDTO.can_do.manage_daily_questions"
			:is-loading="isLoading"
			:server-error="serverError"
			:model-field="manageDailyQuestionsField"
			:hint="translate('dailyQuestion.accessHint')"
		/>
		<base-checkbox
			v-if="manageCleverest.field.name"
			v-model="outputDTO.can_do.manage_cleverest"
			:is-loading="isLoading"
			:server-error="serverError"
			:model-field="manageCleverest"
			:hint="translate('dailyQuestion.accessHint')"
		/>
		<base-checkbox
			v-if="manageAchievementsField.field.name"
			v-model="outputDTO.can_do.manage_achievements"
			:is-loading="isLoading"
			:server-error="serverError"
			:model-field="manageAchievementsField"
		/>
	</base-column>
</template>

<script setup lang="ts">
import { computed, inject, PropType, Ref, ref } from "vue";

import { RoleSettingsFormGroup, RoleSettingsOutputDTO } from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode, translate } from "@/shared/lib";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";
import BaseColumn from "@/shared/ui/grid/BaseColumn.vue";

const props = defineProps({
	group: {
		type: Object as PropType<RoleSettingsFormGroup>,
		required: true,
	},
});

const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO");
const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));

const manageDailyQuestionsField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_daily_questions"),
);

const manageStoreField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_store"),
);

const manageCleverest = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_cleverest"),
);

const manageAchievementsField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "manage_achievements"),
);
</script>

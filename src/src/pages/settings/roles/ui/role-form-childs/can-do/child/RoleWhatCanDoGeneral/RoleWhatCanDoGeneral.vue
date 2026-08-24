<template>
	<base-column :spacer="3">
		<group-radio-input
			v-model="outputDTO.can_do.pulse_posts_mode"
			:is-loading="isLoading"
			:model-field="pulsePostsModeField"
		/>

		<template v-if="outputDTO.can_do.pulse_posts_mode === 'publish'">
			<base-checkbox
				v-model="outputDTO.can_do.manage_pulse_posts"
				:is-loading="isLoading"
				:model-field="managePulsePostsField"
				:server-error="serverError"
				@unmount="() => (outputDTO.can_do.manage_pulse_posts = false)"
			/>

			<base-checkbox
				v-model="outputDTO.can_do.moderate_pulse_posts"
				:is-loading="isLoading"
				:model-field="moderatePulsePostsField"
				:server-error="serverError"
				@unmount="() => (outputDTO.can_do.moderate_pulse_posts = false)"
			/>
		</template>

		<base-checkbox
			v-if="postAdField.field.code"
			v-model="outputDTO.can_do.post_ad"
			:is-loading="isLoading"
			:model-field="postAdField"
			:server-error="serverError"
		/>

		<base-column v-if="outputDTO.can_do.post_ad" :spacer="3" class="r-w-can-do__child-items">
			<base-checkbox
				v-model="outputDTO.can_do.manage_ad"
				:in-row="true"
				:is-loading="isLoading"
				:model-field="manageAdField"
				:server-error="serverError"
				@unmount="outputDTO.can_do.manage_ad = false"
			/>
		</base-column>

		<base-checkbox
			v-model="outputDTO.can_do.manage_quick_questions"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="manageQuickQuestionsField"
			:server-error="serverError"
		/>

		<role-what-can-do-general-employees :group="group" />

		<base-checkbox
			v-model="outputDTO.can_do.department_structure"
			:model-field="departmentStructure"
		/>
		<base-column
			v-if="outputDTO.can_do.department_structure"
			:spacer="3"
			class="r-w-can-do__child-items"
		>
			<base-checkbox
				v-model="outputDTO.can_do.view_main_department"
				:model-field="viewMainDepartment"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.view_all_department_structure"
				:model-field="viewAllDepartmentStructure"
			/>
		</base-column>

		<base-column :spacer="6">
			<role-what-can-do-general-knowledge
				v-if="manageKnowledgeBaseField.code"
				v-model="outputDTO.can_do.manage_knowledge_base"
				:model-field="manageKnowledgeBaseField"
			/>

			<group-radio-input
				v-model="outputDTO.can_do.manage_about_company"
				:is-loading="isLoading"
				:model-field="manageAboutCompanyBaseField"
			/>
		</base-column>

		<base-checkbox
			v-if="viewer.isDev && manageOffersField.code"
			v-model="outputDTO.can_do.manage_offers"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="manageOffersField"
			:server-error="serverError"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.manage_links_company"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="manageLinksCompanyField"
			:server-error="serverError"
		/>
		<base-checkbox
			v-model="outputDTO.can_do.manage_idea"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="manageIdeaField"
			:server-error="serverError"
		/>
		<base-checkbox
			v-if="manageMainMenuField.code"
			v-model="outputDTO.can_do.manage_main_menu"
			:in-row="true"
			:is-loading="isLoading"
			:model-field="manageMainMenuField"
			:server-error="serverError"
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
import { useViewerStore } from "@/store/storeViewer";

import RoleWhatCanDoGeneralEmployees from "./RoleWhatCanDoGeneralEmployees.vue";
import RoleWhatCanDoGeneralKnowledge from "./RoleWhatCanDoGeneralKnowledge.vue";

const props = defineProps<{
	group: RoleSettingsFormGroup;
}>();

const viewer = useViewerStore();
const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO");

const fieldByCode = makeFieldSelector(
	computed(() => props.group.fields),
	serverError,
);

const pulsePostsModeField = fieldByCode("pulse_posts_mode");
const managePulsePostsField = fieldByCode("manage_pulse_posts");
const moderatePulsePostsField = fieldByCode("moderate_pulse_posts");

const postAdField = fieldByCode("post_ad");
const postAdChild = makeFieldSelector(
	computed(() => postAdField.value.field.items),
	serverError,
);
const manageAdField = postAdChild("manage_ad");

const manageLinksCompanyField = fieldByCode("manage_links_company");
const manageKnowledgeBaseField = fieldByCode("manage_knowledge_base");
const manageAboutCompanyBaseField = fieldByCode("manage_about_company");
const manageOffersField = fieldByCode("manage_offers");
const manageQuickQuestionsField = fieldByCode("manage_quick_questions");
const manageIdeaField = fieldByCode("manage_idea");
const manageMainMenuField = fieldByCode("manage_main_menu");

const departmentStructure = fieldByCode("department_structure");
const departmentChild = makeFieldSelector(
	computed(() => departmentStructure.value.field.items),
	serverError,
);
const viewMainDepartment = departmentChild("view_main_department");
const viewAllDepartmentStructure = departmentChild("view_all_department_structure");
</script>

<style scoped></style>

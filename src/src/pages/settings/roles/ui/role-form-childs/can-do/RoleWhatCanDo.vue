<template>
	<el-tabs v-loading="isLoading" tab-position="left">
		<el-tab-pane v-if="generalGroup" :label="generalGroup.name">
			<role-what-can-do-general :group="generalGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="peopleHrGroup" :label="peopleHrGroup.name">
			<role-what-can-do-people-hr :group="peopleHrGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="teamGroup" :label="teamGroup.name">
			<role-what-can-do-team :group="teamGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="calendarGroup" :label="calendarGroup.name">
			<role-what-can-do-calendar :group="calendarGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="peopleRecruitGroup" :label="peopleRecruitGroup.name">
			<role-what-can-do-people-recruit :group="peopleRecruitGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="peoplePerformGroup" :label="peoplePerformGroup.name">
			<role-what-can-do-people-perform :group="peoplePerformGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="reportsGroup" :label="reportsGroup.name">
			<role-what-can-do-reports :group="reportsGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="surveysGroup" :label="surveysGroup.name">
			<role-what-can-do-surveys :group="surveysGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="educationGroup" :label="educationGroup.name">
			<role-what-can-do-education :group="educationGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="growthGroup" :label="growthGroup.name">
			<role-what-can-do-growth :group="growthGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="gamificationGroup" :label="gamificationGroup.name">
			<role-what-can-do-gamification :group="gamificationGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="edmsGroup" :label="edmsGroup.name">
			<role-what-can-do-edms :group="edmsGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="settingsGroup" :label="settingsGroup.name">
			<role-what-can-do-settings :group="settingsGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="customizeGroup" :label="translate('customization.title')">
			<role-what-can-do-customize :group="customizeGroup" />
		</el-tab-pane>
	</el-tabs>
</template>

<script lang="ts" setup>
import { computed, inject, PropType } from "vue";

import { translate } from "@/shared/lib";

import RoleWhatCanDoCalendar from "@/pages/settings/roles/ui/role-form-childs/can-do/child/RoleWhatCanDoCalendar.vue";
import RoleWhatCanDoEducation from "@/pages/settings/roles/ui/role-form-childs/can-do/child/RoleWhatCanDoEducation.vue";
import RoleWhatCanDoGamification from "@/pages/settings/roles/ui/role-form-childs/can-do/child/RoleWhatCanDoGamification.vue";
import RoleWhatCanDoGrowth from "@/pages/settings/roles/ui/role-form-childs/can-do/child/RoleWhatCanDoGrowth.vue";
import RoleWhatCanDoTeam from "@/pages/settings/roles/ui/role-form-childs/can-do/child/RoleWhatCanDoTeam.vue";
import { RoleSettingsFormCanDoBlock, RoleSettingsFormGroup } from "@/shared/api/v0/settings/roles";
import { useViewerStore } from "@/store/storeViewer";

import RoleWhatCanDoEdms from "./child/RoleWhatCanDoEdms.vue";
import RoleWhatCanDoGeneral from "./child/RoleWhatCanDoGeneral/RoleWhatCanDoGeneral.vue";
import RoleWhatCanDoPeopleHr from "./child/RoleWhatCanDoPeopleHr.vue";
import RoleWhatCanDoPeoplePerform from "./child/RoleWhatCanDoPeoplePerform.vue";
import RoleWhatCanDoPeopleRecruit from "./child/RoleWhatCanDoPeopleRecruit.vue";
import RoleWhatCanDoReports from "./child/RoleWhatCanDoReports.vue";
import RoleWhatCanDoSettings from "./child/RoleWhatCanDoSettings.vue";
import RoleWhatCanDoSurveys from "./child/RoleWhatCanDoSurveys.vue";
import RoleWhatCanDoCustomize from "./child/RoleWhatCanDoCustomize.vue";

const props = defineProps({
	block: {
		type: Object as PropType<RoleSettingsFormCanDoBlock>,
		required: true,
	},
});

const isLoading = inject<boolean>("isLoading", true);

const generalGroup = computed<RoleSettingsFormGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "general"),
);
const peopleHrGroup = computed<RoleSettingsFormGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "people_hr"),
);
const peopleRecruitGroup = computed<RoleSettingsFormGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "people_recruit"),
);
const peoplePerformGroup = computed<RoleSettingsFormGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "people_perform"),
);
const reportsGroup = computed<RoleSettingsFormGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "reports"),
);
const surveysGroup = computed<RoleSettingsFormGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "surveys"),
);
const settingsGroup = computed<RoleSettingsFormGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "settings"),
);
const calendarGroup = computed<RoleSettingsFormGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "calendar"),
);

const educationGroup = computed<RoleSettingsFormGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "education"),
);

const growthGroup = computed<RoleSettingsFormGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "growth"),
);

const gamificationGroup = computed<RoleSettingsFormGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "gamification"),
);

const edmsGroup = computed<RoleSettingsFormGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "edms"),
);

const teamGroup = computed<RoleSettingsFormGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "team"),
);

const customizeGroup = computed<RoleSettingsFormGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "customize"),
);
</script>

<style scoped lang="scss">
@use "sass:map";
@import "/src/assets/sass/components/variables.module";

:deep(.el-tabs__item) {
	padding-left: 0;
}

:deep(.r-w-can-do__child-items) {
	margin-left: map.get($spacers, 8);
}
</style>

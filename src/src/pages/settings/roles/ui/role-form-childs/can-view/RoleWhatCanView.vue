<template>
	<el-tabs v-loading="isLoading" tab-position="left">
		<el-tab-pane v-if="aboutSelfGroup" :label="aboutSelfGroup.name">
			<role-what-can-view-about-self :group="aboutSelfGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="aboutSubordinatesGroup" :label="aboutSubordinatesGroup.name">
			<role-what-can-view-about-subordinates :group="aboutSubordinatesGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="asManagerGroup" :label="asManagerGroup.name">
			<role-what-can-view-as-team-manager :group="asManagerGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="asMemberGroup" :label="asMemberGroup.name">
			<role-what-can-view-as-team-member :group="asMemberGroup" />
		</el-tab-pane>
		<el-tab-pane v-if="aboutOthersGroup" :label="aboutOthersGroup.name">
			<role-what-can-view-about-others :group="aboutOthersGroup" />
		</el-tab-pane>
	</el-tabs>
</template>

<script lang="ts" setup>
import { computed, inject, PropType, provide, ref } from "vue";

import {
	RoleSettingsFormCanViewBlock,
	RoleSettingsFormCanViewGroup,
} from "@/shared/api/v0/settings/roles";

import RoleWhatCanViewAboutOthers from "./childs/RoleWhatCanViewAboutOthers.vue";
import RoleWhatCanViewAboutSelf from "./childs/RoleWhatCanViewAboutSelf.vue";
import RoleWhatCanViewAboutSubordinates from "./childs/RoleWhatCanViewAboutSubordinates.vue";
import RoleWhatCanViewAsTeamManager from "./childs/RoleWhatCanViewAsTeamManager.vue";
import RoleWhatCanViewAsTeamMember from "./childs/RoleWhatCanViewAsTeamMember.vue";

const props = defineProps({
	block: {
		type: Object as PropType<RoleSettingsFormCanViewBlock>,
		required: true,
	},
});

const isLoading = inject<boolean>("isLoading", true);

const activeSubgroupTab = ref<string>("personal");
provide("roleViewActiveSubgroupTab", activeSubgroupTab);

const aboutSelfGroup = computed<RoleSettingsFormCanViewGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "see_about_yourself"),
);
const aboutSubordinatesGroup = computed<RoleSettingsFormCanViewGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "see_about_subordinates"),
);
const asManagerGroup = computed<RoleSettingsFormCanViewGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "see_as_manager"),
);
const asMemberGroup = computed<RoleSettingsFormCanViewGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "see_as_team_member"),
);
const aboutOthersGroup = computed<RoleSettingsFormCanViewGroup | undefined>(() =>
	props.block.groups.find((el) => el.code === "see_about_others"),
);
</script>
<style scoped lang="scss">
:deep(.el-tabs__item) {
	padding-left: 0;
}
</style>

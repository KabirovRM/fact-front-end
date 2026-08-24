<template>
	<el-tabs v-model="activeSubgroupTab" v-loading="isLoading">
		<el-tab-pane v-if="personalSubgroup" name="personal" :label="personalSubgroup.name">
			<role-what-can-view-group-personal
				v-model="output.personal"
				:personal-subgroup="personalSubgroup"
			/>
		</el-tab-pane>
		<el-tab-pane v-if="workSubgroup" name="work" :label="workSubgroup.name">
			<role-what-can-view-group-work v-model="output.work" :work-subgroup="workSubgroup" />
		</el-tab-pane>
		<el-tab-pane v-if="absencesSubgroup" name="absences" :label="absencesSubgroup.name">
			<role-what-can-view-group-absences
				v-model="output.absences"
				:subgroup="absencesSubgroup"
			/>
		</el-tab-pane>
		<el-tab-pane v-if="boardingSubgroup" name="boarding" :label="boardingSubgroup.name">
			<role-what-can-view-group-boarding
				v-model="output.boarding"
				:subgroup="boardingSubgroup"
			/>
		</el-tab-pane>
		<el-tab-pane v-if="efficiencySubgroup" name="efficiency" :label="efficiencySubgroup.name">
			<role-what-can-view-group-efficiency
				v-model="output.efficiency"
				:subgroup="efficiencySubgroup"
			/>
		</el-tab-pane>
		<el-tab-pane v-if="workSubgroup" name="payroll" :label="translate('user.payroll.title')">
			<role-what-can-view-group-payroll v-model="output.work" :work-subgroup="workSubgroup" />
			<role-what-can-view-group-pay-sheets
				v-model="output.work"
				:work-subgroup="workSubgroup"
			/>
		</el-tab-pane>

		<el-tab-pane v-if="growthSubgroup" name="growth" :label="translate('growth.title')">
			<role-what-can-view-group-growth v-model="output.growth" :subgroup="growthSubgroup" />
		</el-tab-pane>

		<el-tab-pane v-if="edmsSubgroup" name="edms" :label="edmsSubgroup.name">
			<role-what-can-view-group-edms v-model="output.edms" :subgroup="edmsSubgroup" />
		</el-tab-pane>

		<el-tab-pane v-if="othersSubgroup" name="others" :label="othersSubgroup.name">
			<role-what-can-view-group-others v-model="output.others" :subgroup="othersSubgroup" />
		</el-tab-pane>
	</el-tabs>
</template>

<script lang="ts" setup>
import { computed, inject, PropType, Ref, ref } from "vue";

import RoleWhatCanViewGroupPaySheets from "@/pages/settings/roles/ui/role-form-childs/can-view/childs/group/subgroups/RoleWhatCanViewGroupPaySheets.vue";
import {
	RoleSettingsCanViewOutputDTO,
	RoleSettingsFormCanViewGroup,
} from "@/shared/api/v0/settings/roles";
import { translate } from "@/shared/lib";

import RoleWhatCanViewGroupAbsences from "./subgroups/RoleWhatCanViewGroupAbsences.vue";
import RoleWhatCanViewGroupBoarding from "./subgroups/RoleWhatCanViewGroupBoarding.vue";
import RoleWhatCanViewGroupEdms from "./subgroups/RoleWhatCanViewGroupEdms.vue";
import RoleWhatCanViewGroupEfficiency from "./subgroups/RoleWhatCanViewGroupEfficiency.vue";
import RoleWhatCanViewGroupGrowth from "./subgroups/RoleWhatCanViewGroupGrowth.vue";
import RoleWhatCanViewGroupOthers from "./subgroups/RoleWhatCanViewGroupOthers.vue";
import RoleWhatCanViewGroupPayroll from "./subgroups/RoleWhatCanViewGroupPayroll.vue";
import RoleWhatCanViewGroupPersonal from "./subgroups/RoleWhatCanViewGroupPersonal.vue";
import RoleWhatCanViewGroupWork from "./subgroups/RoleWhatCanViewGroupWork.vue";

const props = defineProps({
	group: {
		type: Object as PropType<RoleSettingsFormCanViewGroup>,
		required: true,
	},
	modelValue: {
		type: Object as PropType<RoleSettingsCanViewOutputDTO>,
		required: true,
	},
});

const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const activeSubgroupTab = inject<Ref<string>>("roleViewActiveSubgroupTab", ref("personal"));

const emit = defineEmits<{
	(e: "update:modelValue", payload: RoleSettingsCanViewOutputDTO): void;
}>();

const output = computed({
	get: () => props.modelValue,
	set: (newVal) => emit("update:modelValue", newVal),
});
const personalSubgroup = computed(() =>
	props.group.subgroups ? props.group.subgroups.find((el) => el.code === "personal") : null,
);
const workSubgroup = computed(() =>
	props.group.subgroups ? props.group.subgroups.find((el) => el.code === "work") : null,
);
const absencesSubgroup = computed(() =>
	props.group.subgroups ? props.group.subgroups.find((el) => el.code === "absences") : null,
);
const boardingSubgroup = computed(() =>
	props.group.subgroups ? props.group.subgroups.find((el) => el.code === "boarding") : null,
);
const efficiencySubgroup = computed(() =>
	props.group.subgroups ? props.group.subgroups.find((el) => el.code === "efficiency") : null,
);
const othersSubgroup = computed(() =>
	props.group.subgroups ? props.group.subgroups.find((el) => el.code === "others") : null,
);
const growthSubgroup = computed(() =>
	props.group.subgroups ? props.group.subgroups.find((el) => el.code === "growth") : null,
);
const edmsSubgroup = computed(() =>
	props.group.subgroups ? props.group.subgroups.find((el) => el.code === "edms") : null,
);
</script>

<style scoped></style>

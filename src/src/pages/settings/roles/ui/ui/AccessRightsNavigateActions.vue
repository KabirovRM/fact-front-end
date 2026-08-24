<script setup lang="ts">
import { ElMessage } from "element-plus";
import { DeepReadonly, inject } from "vue";
import { useRouter } from "vue-router";

import { SYMBOL_ACCESS_RIGHTS_PAGE } from "@/pages/settings/roles/ui/symbols";
import { baseApi } from "@/shared/api";
import { RoleSetting } from "@/shared/api/v0/settings/roles";
import { appRoutes, openDialogDelete, translate, useFetch } from "@/shared/lib";

import BaseButton from "@/shared/ui/buttons/BaseButton.vue";

const props = defineProps<{
	item: DeepReadonly<RoleSetting>;
}>();

const router = useRouter();
const emit = defineEmits(["roleDeleted"]);

const { selectedRoleId, setGroups } = inject(SYMBOL_ACCESS_RIGHTS_PAGE)!;

const { fetch: copyRole } = useFetch(
	() => baseApi.settings.roles.copyRole(props.item.id),
	"data.id",
	{
		onSuccess: ({ state }) => {
			router.push(appRoutes.SETTINGS_EDIT_ROLE.getPath(state));
		},
	},
);

const { fetch: rollbackRole } = useFetch(
	() => baseApi.settings.roles.rollbackRole(props.item.id),
	"data",
	{
		onSuccess: () =>
			ElMessage({
				type: "success",
				message: translate("common.success"),
			}),
	},
);

function pushToEditPage() {
	router.push(appRoutes.SETTINGS_EDIT_ROLE.getPath(props.item.id));
}

async function deleteRole(id) {
	const result = await baseApi.settings.roles.deleteRole(id);
	if (id === selectedRoleId.value) selectedRoleId.value = "all";
	emit("roleDeleted");
	if (result) setGroups(result.data.data.groups);
}

const getNameAction = (code) => {
	switch (code) {
		case "copy":
			return translate("actions.toCopy");
		case "edit":
			return translate("actions.toEdit");
		case "delete":
			return translate("actions.toDelete");
		default:
			return translate("actions.toRestoreDefault");
	}
};

const handleAction = async (code) => {
	switch (code) {
		case "copy":
			await copyRole();
			break;
		case "edit":
			pushToEditPage();
			break;
		case "delete":
			await openDialogDelete(() => deleteRole(props.item.id)).catch(() => false);
			break;
		case "rollback":
			await rollbackRole();
			break;
	}
};
</script>

<template>
	<base-button icon small prepend-icon="gen052" color="white" teleport-popup>
		<template #dropdown>
			<el-dropdown-item
				v-for="action in item.actions"
				:key="action"
				@click="handleAction(action)"
			>
				<span :class="{ 'a-r-n-actions--text-danger': action === 'delete' }">
					{{ getNameAction(action) }}
				</span>
			</el-dropdown-item>
		</template>
	</base-button>
</template>

<style scoped lang="scss">
@use "sass:map";
@import "@/assets/sass/components/variables.module";

.a-r-n-actions {
	&--text-danger {
		color: $danger;
	}
}
</style>

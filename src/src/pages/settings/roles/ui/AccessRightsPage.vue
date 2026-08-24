<script lang="ts" setup>
import { debounce } from "lodash";
import { provide, readonly, ref, watch } from "vue";

import { openDialog } from "@/core/plugins/dialog";
import ChangeUsersRole from "@/pages/settings/roles/ui/modals/ChangeUsersRole.vue";
import { SYMBOL_ACCESS_RIGHTS_PAGE } from "@/pages/settings/roles/ui/symbols";
import AccessRightsNavigate from "@/pages/settings/roles/ui/ui/AccessRightsNavigate.vue";
import { baseApi } from "@/shared/api";
import { RoleSettingsGroups, UserByRole } from "@/shared/api/v0/settings/roles";
import {
	appRoutes,
	getDefaultPagination,
	getServerError,
	Pagination,
	translate,
} from "@/shared/lib";
import { makeQueryRef } from "@/shared/lib/composible/useQuery";
import { setCurrentPageTitle } from "@/shared/lib/helpers/breadcrumbs";
import { BasePagination } from "@/shared/ui";
import BaseButton from "@/shared/ui/buttons/BaseButton.vue";
import BaseCard from "@/shared/ui/card/BaseCard.vue";
import BaseColumns from "@/shared/ui/grid/BaseColumns.vue";
import BaseIcon from "@/shared/ui/icon/BaseIcon.vue";

const i18path = "settings.accessRights.";
const isInitLoading = ref(true);
const isLoading = ref(false);
const serverError = ref<ServerError | null>(null);
const propNameLabel = translate("common.name");
const propRoleLabel = translate(i18path + "role");

const users = ref<UserByRole[]>([]);
const groups = ref<RoleSettingsGroups[]>([]);
const pagination = ref<Pagination>(getDefaultPagination());
const searchQuery = ref("");
const selectedRoleId = makeQueryRef<"all" | number>("role", {
	initValue: "all",
	fromQuery: (v) => {
		if (v === "all") return "all";
		return v && Number(v);
	},
});
watch(selectedRoleId, () => fetch(1));

setCurrentPageTitle(translate(i18path + "title"));

async function handleOpenForm(id: number) {
	await openDialog(ChangeUsersRole, {
		dialog: { title: translate(i18path + "changeRole") },
		props: { id },
	});
	await fetch(pagination.value.currentPage);
}

const debouncedFetch = debounce(fetch, 500);
async function fetch(page = 1) {
	try {
		isLoading.value = true;
		const rolesPromise = baseApi.settings.roles.getRoles;
		const usersPromise = baseApi.settings.roles.getUsersByRole;
		const idRole = selectedRoleId.value === "all" ? null : (selectedRoleId.value as number);
		const [rolesRes, usersRes] = await Promise.allSettled([
			rolesPromise(),
			usersPromise(page, searchQuery.value, idRole),
		]);
		if (rolesRes.status === "fulfilled") {
			setGroups(rolesRes.value?.data?.data?.groups || []);
		}
		if (usersRes.status === "fulfilled") {
			users.value = usersRes.value?.data?.data?.users || [];
			pagination.value = usersRes.value?.data?.data?.pagination || getDefaultPagination();
		}
	} catch (error) {
		serverError.value = getServerError(error);
	} finally {
		isLoading.value = false;
		isInitLoading.value = false;
	}
}

const setGroups = (newValue: RoleSettingsGroups[]) => {
	groups.value = newValue;
};
const setUsers = () => {
	fetch(1);
};

provide(SYMBOL_ACCESS_RIGHTS_PAGE, {
	groups: readonly(groups),
	fetch,
	selectedRoleId,
	setGroups,
});

fetch(1);
</script>

<template>
	<el-skeleton v-if="isInitLoading" animated loading />
	<template v-else>
		<base-columns sticky="left" ratio="2/3" mobile-column>
			<access-rights-navigate @role-deleted="setUsers" />
			<base-card :title="translate('user.multiple')">
				<el-table v-loading="isLoading" :data="users" class="mb-4">
					<el-table-column prop="name" :label="propNameLabel">
						<template #default="scope">
							<router-link :to="appRoutes.PROFILE.getPath(scope.row.id)">
								{{ scope.row.name }}
							</router-link>
						</template>
					</el-table-column>
					<el-table-column prop="role" :label="propRoleLabel" />
					<el-table-column align="right">
						<template #header>
							<el-input
								v-model="searchQuery"
								clearable
								spellcheck="false"
								size="large"
								:placeholder="translate('common.search')"
								@input="() => debouncedFetch(1)"
							/>
						</template>
						<template #default="scope">
							<base-button
								color="light"
								icon
								prepend-icon="pencil-6"
								:icon-size="16"
								@click="() => handleOpenForm(scope.row.id)"
							/>
						</template>
					</el-table-column>
				</el-table>
				<base-pagination :pagination="pagination" :method="fetch" />
			</base-card>
		</base-columns>
	</template>
</template>

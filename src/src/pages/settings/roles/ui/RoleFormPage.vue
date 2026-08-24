<script lang="ts" setup>
import { computed, provide, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getDefaultRoleSettingOutput } from "@/pages/settings/roles/model/model";
import { RoleSettingsForm, RoleSettingsOutputDTO } from "@/shared/api/v0/settings/roles/models";
import {
	createNewRole,
	getRoleById,
	getRoleForm,
	updateNewRole,
} from "@/shared/api/v0/settings/roles/roles";
import { setCurrentPageTitle } from "@/shared/lib/helpers/breadcrumbs";
import { getServerError } from "@/shared/lib/helpers/error/error";
import { findFieldWithErrorsByCode } from "@/shared/lib/helpers/field/lib/field";
import { appRoutes } from "@/shared/lib/helpers/navigation/routes";
import { translate } from "@/shared/lib/theming/i18n/translate";
import BaseCard from "@/shared/ui/card/BaseCard.vue";
import BaseInput from "@/shared/ui/form/input/ui/BaseInput.vue";

import RoleWhatCanDo from "./role-form-childs/can-do/RoleWhatCanDo.vue";
import RoleWhatCanView from "./role-form-childs/can-view/RoleWhatCanView.vue";

const route = useRoute();
const router = useRouter();
const isInitLoading = ref(true);
const isLoading = ref(false);
const serverError = ref<ServerError | null>(null);
const roleForm = ref<RoleSettingsForm | null>(null);
const outputDTO = ref<RoleSettingsOutputDTO | null>(null);

const isSubmitButtonDisabled = computed(() => !outputDTO.value?.main.name);
const nameField = computed(() =>
	findFieldWithErrorsByCode(roleForm.value?.main || [], serverError.value, "name"),
);
const descriptionField = computed(() =>
	findFieldWithErrorsByCode(roleForm.value?.main || [], serverError.value, "description"),
);

setCurrentPageTitle(
	route.params.id
		? translate("settings.accessRights.edit")
		: translate("settings.accessRights.create"),
);

provide("isLoading", isLoading);
provide("serverError", serverError);
provide("outputDTO", outputDTO);

async function onSubmitHandler() {
	try {
		isLoading.value = true;
		if (outputDTO.value) {
			if (route.params.id) {
				await updateNewRole(outputDTO.value, +route.params.id);
			} else {
				await createNewRole(outputDTO.value);
			}
			await router.push({ name: appRoutes.SETTINGS_ACCESS_RIGHTS.name });
		}
	} catch (error) {
		serverError.value = getServerError(error);
	} finally {
		isLoading.value = false;
	}
}

async function fetch() {
	try {
		isLoading.value = true;
		if (route.params.id) {
			const response: RoleSettingsForm = (await getRoleById(String(route.params.id))).data
				.data;
			roleForm.value = response;
			outputDTO.value = getDefaultRoleSettingOutput(response);
		} else {
			const response: RoleSettingsForm = (await getRoleForm()).data.data;
			roleForm.value = response;
			outputDTO.value = getDefaultRoleSettingOutput(response);
		}
	} catch (error) {
		serverError.value = getServerError(error);
	} finally {
		isInitLoading.value = false;
		isLoading.value = false;
	}
}

fetch();
</script>
<template>
	<form class="role-form-page" @submit.prevent="onSubmitHandler">
		<el-skeleton animated :loading="isInitLoading">
			<div
				class="flex flex-col lg:grid lg:grid-cols-[minmax(300px,_330px)_minmax(600px,_1fr)] gap-6"
			>
				<el-card class="h-fit lg:sticky top-[80px]">
					<base-input
						v-model="outputDTO.main.name"
						class="mb-6"
						:is-loading="isLoading"
						:server-error="serverError"
						:model-field="nameField"
					/>
					<base-input
						v-model="outputDTO.main.description"
						:is-loading="isLoading"
						:server-error="serverError"
						:model-field="descriptionField"
						class="mb-6"
					/>
					<el-button
						:disabled="isLoading || isSubmitButtonDisabled"
						:loading="isLoading"
						type="primary"
						native-type="submit"
					>
						{{ translate("actions.toSave") }}
					</el-button>
				</el-card>
				<div>
					<base-card v-if="roleForm.blocks && roleForm.blocks.can_do" class="mb-6">
						<role-what-can-do :block="roleForm.blocks.can_do" />
					</base-card>
					<base-card
						v-if="roleForm.blocks && roleForm.blocks.can_view"
						class="mb-6"
						:title="translate('employee.profile')"
					>
						<role-what-can-view :block="roleForm.blocks.can_view" />
					</base-card>
				</div>
			</div>
		</el-skeleton>
	</form>
</template>

<style scoped></style>

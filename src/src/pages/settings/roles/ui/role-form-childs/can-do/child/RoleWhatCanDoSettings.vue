<template>
	<base-select
		v-model="outputDTO.can_do.settings"
		:server-error="settingsServerError || serverError"
		:model-field="settingsField"
		:is-loading="isFetchLoading || isLoading"
		:no-match-text="translate('common.noMatchText')"
		is-multiple
		collapse-tags-tooltip
		filterable
	>
		<template #options>
			<el-option-group
				v-for="(group, index) in settingsField.field.possibleValues"
				:key="index"
				:label="group.name"
			>
				<el-option
					v-for="link in group.links"
					:key="link.id"
					:label="link.name"
					:value="link.id"
				/>
			</el-option-group>
		</template>
	</base-select>
</template>

<script lang="ts" setup>
import { computed, inject, PropType, Ref, ref } from "vue";

import { baseApi } from "@/shared/api";
import { IndexSettingGroup } from "@/shared/api/v0/settings/index-page";
import { RoleSettingsFormGroup, RoleSettingsOutputDTO } from "@/shared/api/v0/settings/roles";
import { findFieldWithErrorsByCode, getServerError, translate } from "@/shared/lib";
import BaseSelect from "@/shared/ui/form/select/ui/index.vue";

const props = defineProps({
	group: {
		type: Object as PropType<RoleSettingsFormGroup>,
		required: true,
	},
});

const isFetchLoading = ref(true);
const settingGroups = ref<IndexSettingGroup[]>([]);
const settingsServerError = ref<ServerError | null>(null);
const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO");

const settingsField = computed(() =>
	findFieldWithErrorsByCode(props.group.fields, serverError.value, "settings"),
);

async function fetchSettings() {
	try {
		isFetchLoading.value = true;
		settingGroups.value = (await baseApi.settings.index.getIndex()).data.data.settings;
	} catch (error) {
		settingsServerError.value = getServerError(error);
	} finally {
		isFetchLoading.value = false;
	}
}

fetchSettings();
</script>


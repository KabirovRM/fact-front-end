<script setup lang="ts">
import { computed, inject, Ref, ref } from "vue";

import { RoleSettingsOutputCanDo } from "@/shared/api/v0/settings/roles/models";
import { findFieldWithErrorsByCode } from "@/shared/lib/helpers/field/lib/field";
import { Field } from "@/shared/lib/helpers/field/model/model";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";
import BaseColumn from "@/shared/ui/grid/BaseColumn.vue";
import BaseTranslate from "@/shared/ui/i18n/BaseTranslate.vue";

const props = defineProps<{
	fields: Field[];
	serverError: ServerError | null;
}>();

defineModel<RoleSettingsOutputCanDo>("canDo", { required: true });

const isLoading = inject<Ref<boolean>>("isLoading", () => ref(true), true);

const managePreboarding = computed(() =>
	findFieldWithErrorsByCode(props.fields, props.serverError, "manage_preboarding"),
);
const viewPreboarding = computed(() =>
	findFieldWithErrorsByCode(props.fields, props.serverError, "view_preboarding"),
);
</script>

<template>
	<p class="fw-bold fs-6">
		<base-translate path="preboarding.title" />
	</p>
	<base-column :spacer="3" class="ml-6">
		<base-checkbox
			v-model="canDo.manage_preboarding"
			:is-loading="isLoading"
			:model-field="managePreboarding"
			:server-error="serverError"
			@unmount="canDo.manage_preboarding = false"
		/>
		<base-checkbox
			v-model="canDo.view_preboarding"
			:is-loading="isLoading"
			:model-field="viewPreboarding"
			:server-error="serverError"
			@unmount="canDo.view_preboarding = false"
		/>
	</base-column>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { computed, inject, Ref, ref } from "vue";

import { RoleSettingsFormGroup, RoleSettingsOutputDTO } from "@/shared/api/v0/settings/roles";
import { translate } from "@/shared/lib";
import { makeFieldSelector } from "@/shared/lib/helpers/field/lib/makeFieldSelector";
import BaseCheckbox from "@/shared/ui/form/checkbox/ui/BaseCheckbox.vue";
import GroupRadioInput from "@/shared/ui/form/radio/ui/GroupRadioInput.vue";
import BaseColumn from "@/shared/ui/grid/BaseColumn.vue";

const props = defineProps<{
	group: RoleSettingsFormGroup;
}>();

const isLoading = inject<Ref<boolean>>("isLoading", ref(true));
const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const outputDTO = inject<Ref<RoleSettingsOutputDTO>>("outputDTO")!;

const fieldByCode = makeFieldSelector(
	computed(() => props.group.fields),
	serverError,
);

const calendar = fieldByCode("calendar");

const calendarChild = makeFieldSelector(
	computed(() => calendar.value.field.items),
	serverError,
);
const addEvents = calendarChild("add_events");
const exportCalendarCompany = calendarChild("export_calendar_company");

const view_calendar_company = fieldByCode("view_calendar_company");
const view_schedule_absence_requests = fieldByCode("view_schedule_absence_requests");
const view_absence_requests = fieldByCode("view_absence_requests");
const view_congratulations_widget = fieldByCode("view_congratulations_widget");
const view_who_is_absent_widget = fieldByCode("view_who_is_absent_widget");
</script>

<template>
	<base-column :spacer="4">
		<base-checkbox
			v-model="outputDTO.can_do.calendar"
			:is-loading="isLoading"
			:model-field="calendar"
			:server-error="serverError"
		/>

		<div v-if="outputDTO.can_do.calendar" class="calendar-children">
			<base-checkbox
				v-model="outputDTO.can_do.add_events"
				:is-loading="isLoading"
				:model-field="addEvents"
				:server-error="serverError"
			/>
			<base-checkbox
				v-model="outputDTO.can_do.export_calendar_company"
				:is-loading="isLoading"
				:model-field="exportCalendarCompany"
				:server-error="serverError"
			/>
		</div>

		<hr />
		<h3>{{ translate("settings.roles.calendar") }}</h3>

		<group-radio-input
			v-model="outputDTO.can_do.view_calendar_company"
			:is-loading="isLoading"
			:model-field="view_calendar_company"
		/>

		<group-radio-input
			v-model="outputDTO.can_do.view_schedule_absence_requests"
			:is-loading="isLoading"
			:model-field="view_schedule_absence_requests"
		/>

		<group-radio-input
			v-model="outputDTO.can_do.view_absence_requests"
			:is-loading="isLoading"
			:model-field="view_absence_requests"
		/>

		<hr />
		<h3>{{ translate("settings.roles.widgets") }}</h3>
		<group-radio-input
			v-model="outputDTO.can_do.view_congratulations_widget"
			:is-loading="isLoading"
			:model-field="view_congratulations_widget"
		/>
		<group-radio-input
			v-model="outputDTO.can_do.view_who_is_absent_widget"
			:is-loading="isLoading"
			:model-field="view_who_is_absent_widget"
		/>
	</base-column>
</template>

<style scoped lang="scss">
@use "sass:map";
@import "/src/assets/sass/components/variables.module";

.calendar-children {
	margin-left: map.get($spacers, 8);
}
</style>

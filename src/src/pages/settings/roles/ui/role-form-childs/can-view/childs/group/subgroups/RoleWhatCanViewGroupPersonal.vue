<template>
	<div v-if="personalSubgroup.subgroups">
		<base-column>
			<article v-for="(personalFieldGroup, key) in personalSubgroup.subgroups" :key="key">
				<base-sheet
					v-if="
						personalFieldGroup.fields &&
						modelValue[personalFieldGroup.code || personalFieldGroup.groupId]
					"
					bordered
				>
					<base-spoiler innit-state>
						<template #header="{ toggle, state }">
							<div class="rwc-header" @click="toggle">
								<base-chevron :model-value="state" :size="14" />
								<h3>{{ personalFieldGroup.name }}</h3>
							</div>
						</template>
						<template #content>
							<hr class="rwc-separator" />
							<group-radio-input
								v-for="fieldWithError in fillFieldsWithErrors(
									personalFieldGroup.fields,
									serverError,
								)"
								:key="fieldWithError.code"
								:model-value="
									modelValue[
										personalFieldGroup.code || personalFieldGroup.groupId
									][fieldWithError.code]
								"
								class="mb-6"
								:is-loading="isLoading"
								:model-field="fieldWithError"
								@update:model-value="
									updateModelValue(
										personalFieldGroup.code || personalFieldGroup.groupId,
										fieldWithError.code,
										$event,
									)
								"
							/>
						</template>
					</base-spoiler>
				</base-sheet>
			</article>
		</base-column>
	</div>
</template>

<script lang="ts" setup>
import { inject, PropType, Ref, ref } from "vue";

import {
	RoleSettingsCanViewPersonal,
	RoleSettingsFormCanViewGroup,
	RoleSettingViewAccess,
} from "@/shared/api/v0/settings/roles";
import { fillFieldsWithErrors } from "@/shared/lib";
import { BaseColumn } from "@/shared/ui";
import BaseChevron from "@/shared/ui/chevron/BaseChevron.vue";
import GroupRadioInput from "@/shared/ui/form/radio/ui/GroupRadioInput.vue";
import BaseSheet from "@/shared/ui/sheet/BaseSheet.vue";
import BaseSpoiler from "@/shared/ui/spoiler/BaseSpoiler.vue";

const emit = defineEmits<{
	(e: "update:modelValue", payload: RoleSettingsCanViewPersonal): void;
}>();
const props = defineProps({
	personalSubgroup: {
		type: Object as PropType<RoleSettingsFormCanViewGroup>,
	},
	modelValue: {
		type: Object as PropType<RoleSettingsCanViewPersonal>,
		required: true,
	},
});

const serverError = inject<Ref<ServerError | null>>("serverError", ref(null));
const isLoading = inject<Ref<boolean>>("isLoading", ref(true));

function updateModelValue(groupCode: string, code: string, value: RoleSettingViewAccess) {
	emit("update:modelValue", {
		...props.modelValue,
		[groupCode]: {
			...props.modelValue[groupCode],
			[code]: value,
		},
	});
}
</script>

<style scoped lang="scss">
.rwc-header {
	display: flex;
	align-items: center;
	gap: 12px;
	cursor: pointer;
	padding: 8px 0;

	h3 {
		font-size: 16px;
	}
}

.rwc-separator {
	background-color: unset;
	border: unset;
	border-bottom: 1px solid var(--mt-color-gray-400);
	margin-bottom: 12px;
	margin-top: 10px;
}
</style>

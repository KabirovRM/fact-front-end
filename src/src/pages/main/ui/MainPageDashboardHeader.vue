<script lang="ts" setup>
import { computed } from "vue";

import { TDashboardPopupInfoItem } from "@/pages/main/ui/dashboard-items/internal-hiring/shared";
import MainPageDashboardPopoverInfo from "@/pages/main/ui/dashboard-items/popovers/MainPageDashboardPopoverInfo.vue";
import DashboardTemplateSelect from "@/pages/main/ui/dashboard-template/DashboardTemplateSelect.vue";
import { translate } from "@/shared/lib";
import { BaseButton } from "@/shared/ui";
import BaseTitle from "@/shared/ui/title/BaseTitle.vue";
import { useViewerStore } from "@/store/storeViewer";

const props = defineProps<{
	greeting: string;
	isDashEditing: boolean;
	isDashboardTemplateEditing: boolean;
	popupInfo: TDashboardPopupInfoItem;
	isSelectedDashboardConfigDefault: boolean;
}>();

const viewer = useViewerStore();

const emit = defineEmits([
	"cancelChanges",
	"rollbackDefault",
	"saveDashboard",
	"saveDashboardModal",
	"editTemplateModal",
	"deleteTemplateModal",
	"editTemplate",
	"saveTemplateConfig",
]);

const dashboardTemplates = defineModel<unknown>("templates");

const dashboardHeaderStickyTop = computed(() =>
	viewer.isDemo && viewer.isAdmin ? "130px" : "75px",
);
</script>

<template>
	<base-title
		class="d-header"
		:class="{ 'd-header--sticky': isDashEditing || isDashboardTemplateEditing }"
	>
		<template #title>
			{{ greeting }}
		</template>
		<div class="flex gap-3 edit-dashes">
			<Transition name="fade" mode="out-in">
				<div v-if="isDashEditing || isDashboardTemplateEditing">
					<div v-if="isDashEditing" class="flex gap-3">
						<base-button color="danger" @click="() => emit('cancelChanges')">
							{{ translate("actions.toCancel") }}
						</base-button>
						<base-button @click="() => emit('rollbackDefault')">
							{{ translate("common.defaultSettings") }}
						</base-button>
						<base-button
							color="success"
							prepend-icon="save-fill"
							preload
							@click="() => emit('saveDashboard')"
						>
							{{ translate("actions.toSaveDashboard") }}
						</base-button>
					</div>
					<div v-if="isDashboardTemplateEditing" class="d-header__actions">
						<dashboard-template-select
							v-if="dashboardTemplates"
							v-model="dashboardTemplates"
							is-editable
							@edit="(id) => emit('editTemplateModal', id)"
							@delete="(id) => emit('deleteTemplateModal', id)"
						/>

						<div class="d-header__customize-dashboard-actions">
							<base-button color="danger" @click="() => emit('editTemplate', false)">
								{{ translate("actions.toClose") }}
							</base-button>
							<base-button @click="() => emit('editTemplateModal')">
								{{ translate("template.toCreate") }}
							</base-button>
							<base-button
								v-if="!isSelectedDashboardConfigDefault"
								color="success"
								prepend-icon="save-fill"
								preload
								@click="() => emit('saveTemplateConfig')"
							>
								{{ translate("template.toSaveConfig") }}
							</base-button>
						</div>
					</div>
				</div>
				<div v-else class="d-header__actions">
					<dashboard-template-select
						v-if="dashboardTemplates && viewer.isAdmin"
						v-model="dashboardTemplates"
					/>

					<div class="d-header__customize-dashboard-actions">
						<el-popover
							placement="left"
							teleported
							:visible="!!popupInfo"
							width="380"
							popper-style="z-index: 2010;"
						>
							<template #reference>
								<base-button
									v-if="
										//!dashboardTemplates ||(dashboardTemplates?.value == 0 && 
										viewer.isAdmin
									"
									id="customize_dashboard"
									prepend-icon="more-grid-big"
									outline
									:bg="'white'"
									:text-color="'gray700'"
									:text-active-color="'primary'"
									preload
									@click="() => emit('saveDashboard')"
								>
									{{ translate("actions.customizeDashboard") }}
								</base-button>
							</template>
							<main-page-dashboard-popover-info
								v-if="Boolean(popupInfo)"
								v-bind="popupInfo"
								@close="() => emit('saveDashboardModal')"
							/>
						</el-popover>
						<base-button
							v-if="viewer.isAdmin"
							class="d-header__settings"
							prepend-icon="setting"
							icon
							text-active-color="primary"
							text-color="gray700"
							:icon-size="16"
							bg="white"
							@click="() => emit('editTemplate', true)"
						/>
					</div>
				</div>
			</Transition>
		</div>
	</base-title>
</template>

<style lang="scss" scoped>
@use "sass:map";
@import "@/assets/sass/components/variables.module";
@import "@/assets/sass/layout/variables";
.d-header {
	margin: 0 -20px;
	padding: 10px 10px;
	align-items: center;

	&--sticky {
		position: sticky;
		top: v-bind(dashboardHeaderStickyTop);
		z-index: 21;
		background: rgba(246, 243, 243, 0.45);
		box-shadow: 0 2px 10px 2px rgba(34, 60, 80, 0.2);
		border-radius: 10px;
	}

	&__actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		@include isMobile {
			display: none;
			flex-direction: column;
		}
	}

	&__customize-dashboard-actions {
		display: flex;
		gap: map.get($spacers, 2);
		justify-content: flex-end;
	}

	&__settings {
		order: 1;
		flex-shrink: 0;
	}

	@media (max-width: 992px) {
		width: calc(100% + 30px);
		margin: -20px 0 0 -20px;
	}
}
</style>

<script setup lang="ts">
import { inject } from "vue";
import { useRouter } from "vue-router";

import { SYMBOL_ACCESS_RIGHTS_PAGE } from "@/pages/settings/roles/ui/symbols";
import { appRoutes } from "@/shared/lib";
import { BaseColumn } from "@/shared/ui";
import BaseButton from "@/shared/ui/buttons/BaseButton.vue";
import BaseCard from "@/shared/ui/card/BaseCard.vue";
import BaseTranslate from "@/shared/ui/i18n/BaseTranslate.vue";
import BaseIcon from "@/shared/ui/icon/BaseIcon.vue";
import BaseNavButton from "@/shared/ui/navigation/BaseNavButton.vue";
import BaseNavList from "@/shared/ui/navigation/BaseNavList.vue";

import AccessRightsNavigateActions from "./AccessRightsNavigateActions.vue";

const router = useRouter();

const { groups, selectedRoleId } = inject(SYMBOL_ACCESS_RIGHTS_PAGE)!;
const emit = defineEmits(["roleDeleted"]);

async function pushToCreatePage() {
	await router.push(appRoutes.SETTINGS_CREATE_ROLE.path);
}
</script>

<template>
	<base-card>
		<template #header>
			<base-button prepend-icon="plus" light full-width @click="pushToCreatePage">
				<base-translate path="role.add" />
			</base-button>
		</template>
		<base-column :spacer="4">
			<base-nav-list v-model="selectedRoleId">
				<base-nav-button name="all" font-weight-normal>
					<base-translate path="user.all" />
				</base-nav-button>
				<div class="a-r-navigate__separator separator" />
				<div v-for="(group, index) in groups" :key="index">
					<div v-if="group.items.length" class="a-r-navigate__title">
						{{ group.name }}
					</div>
					<div v-for="(role) in group.items" :key="role.id" class="a-r-navigate__item">
						<base-nav-button
							:name="role.id"
							class="a-r-navigate__btn-nav"
							font-weight-normal
							:title="role.name"
						>
							<div class="a-r-navigate__btn-content">
								<base-icon
									v-if="group.code === 'system'"
									name="lock"
									current-color
									:size="20"
								/>
								<span class="a-r-navigate__name">{{ role.name }}</span>
							</div>
						</base-nav-button>
						<access-rights-navigate-actions
							v-if="role.actions?.length"
							:item="role"
							@role-deleted="() => emit('roleDeleted')"
						/>
					</div>
					<div
						v-if="!index && group.items.length"
						class="a-r-navigate__separator separator"
					/>
				</div>
			</base-nav-list>
		</base-column>
	</base-card>
</template>

<style scoped lang="scss">
@use "sass:map";
@import "@/assets/sass/components/variables.module";

.a-r-navigate {
	&__title {
		color: $gray-400;
		margin-bottom: map.get($spacers, 1);
	}

	&__item {
		display: grid;
		grid-template-columns: 1fr 38px;
		gap: map.get($spacers, 2);
		align-items: center;
	}

	&__btn-nav {
		white-space: normal;
		gap: map.get($spacers, 3);
		align-items: center;
		overflow: hidden;
	}
	&__btn-content {
		display: inline-flex;
		align-items: center;
		gap: map.get($spacers, 2);
	}

	&__name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		min-width: 30px;
	}

	&__separator {
		margin: map.get($spacers, 4) 0;
	}
}
</style>

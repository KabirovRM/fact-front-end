import { DeepReadonly, InjectionKey, Ref } from "vue";

import { RoleSettingsGroups } from "@/shared/api/v0/settings/roles";

export const SYMBOL_ACCESS_RIGHTS_PAGE = Symbol("AccessRightsPage") as InjectionKey<{
	groups: DeepReadonly<Ref<RoleSettingsGroups[]>>;
	selectedRoleId: Ref<number | undefined | "all">;
	fetch: (page: number) => Promise<void>;
	setGroups: Function;
}>;

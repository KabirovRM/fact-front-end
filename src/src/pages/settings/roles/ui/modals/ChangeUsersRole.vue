<template>
	<el-skeleton v-if="instance.isLoading.value" loading animated />
	<base-form
		v-else
		v-model:form="form"
		:additional-props="additionalProps"
		@submit="submit.fetch"
	/>
</template>

<script setup lang="ts">
import { baseApi } from "@/shared/api";
import { useFetch } from "@/shared/lib";
import { useFetchForm } from "@/shared/lib/composible/useFetchForm";
import { BaseForm } from "@/shared/ui";

const props = defineProps<{
	id: number;
}>();
const emit = defineEmits(["close", "submit"]);

const additionalProps = {
	role: {
		filterable: true,
	},
};

const instance = useFetch(() => baseApi.settings.roles.getUsersRole(props.id), "data.fields", {
	immediate: true,
});

const { form, submit } = useFetchForm(instance, {
	submit: (payload) =>
		baseApi.settings.roles.updateUsersRole(props.id, { role: payload?.role ?? [] }),
	onSubmit() {
		emit("submit");
	},
});
</script>
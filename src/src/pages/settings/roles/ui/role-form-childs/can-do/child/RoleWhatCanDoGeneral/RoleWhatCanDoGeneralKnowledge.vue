<script lang="ts" setup>
import { ref, watch } from "vue";

import { createField, FieldWithErrors } from "@/shared/lib";
import { BaseCheckbox } from "@/shared/ui";

const props = defineProps<{
	modelField: FieldWithErrors;
}>();

const modelValue = defineModel<"none" | "show" | "edit">({
	default: "none",
});

const value = ref(modelValue.value !== "none");
const valueShow = ref(modelValue.value === "show");
const valueEdit = ref(modelValue.value === "edit");

const field = createField(props.modelField.code, null, {
	name: props.modelField.field.name,
});
const fieldShow = createField(props.modelField.code, null, {
	name: props.modelField.field.possibleValues[0].name,
	hint: props.modelField.field.possibleValues[0].hint,
});
const fieldEdit = createField(props.modelField.code, null, {
	name: props.modelField.field.possibleValues[1].name,
	hint: props.modelField.field.possibleValues[1].hint,
});

watch(valueShow, (v) => {
	if (v) modelValue.value = "show";
	else modelValue.value = "edit";
});
watch(valueEdit, (v) => {
	if (v) modelValue.value = "edit";
	else modelValue.value = "show";
});
watch(value, (v) => {
	if (v) {
		valueShow.value = true;
		valueEdit.value = false;
	} else modelValue.value = "none";
});

watch(modelValue, (v) => {
	switch (v) {
		case "show":
			valueShow.value = true;
			valueEdit.value = false;
			break;
		case "edit":
			valueShow.value = false;
			valueEdit.value = true;
			break;
		default:
			value.value = false;
	}
});
</script>

<template>
	<div class="rwcdg-knowledge">
		<base-checkbox v-model="value" :model-field="field" />
		<div v-if="value" class="rwcdg-knowledge__container">
			<base-checkbox v-model="valueShow" :model-field="fieldShow" />
			<base-checkbox v-model="valueEdit" :model-field="fieldEdit" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.rwcdg-knowledge {
	&__container {
		display: flex;
		flex-direction: column;
		margin-left: 2rem;
	}
}
</style>

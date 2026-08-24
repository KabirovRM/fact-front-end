import {
	RoleSettingsCanViewOutputDTO,
	RoleSettingsCanViewPersonal,
	RoleSettingsForm,
	RoleSettingsFormCanDoBlock,
	RoleSettingsFormCanViewGroup,
	RoleSettingsFormGroup,
	RoleSettingsOutputCanDo,
	RoleSettingsOutputDTO,
	RoleSettingsOutputMain,
} from "@/shared/api/v0/settings/roles";
import { Field } from "@/shared/lib";

const defaultMain: RoleSettingsOutputMain = {
	name: "",
	description: "",
};

function getMain(main: Field[]): RoleSettingsOutputMain {
	const output = defaultMain;
	const nameField = main.find((el) => el.code === "name") || null;
	const descriptionField = main.find((el) => el.code === "description") || null;
	output.name = nameField?.value ?? "";
	output.description = descriptionField?.value ?? "";
	return output;
}

function setCanDoValue(output: RoleSettingsOutputCanDo, fields: Field[], fieldCodes: string[]) {
	fieldCodes.forEach((code) =>
		fields.forEach((field) => {
			if (code === field.code) {
				output[code] = field.code === "settings" ? (field.value ?? []) : field.value;
				if (field?.items) {
					const itemCodes = field.items.map(({ code }) => code);
					setCanDoValue(output, field.items, itemCodes);
				}
			}
		}),
	);
}

export function getDefaultCanDo(groups: RoleSettingsFormGroup[]): RoleSettingsOutputCanDo {
	const defaultCanDo = {};
	groups.forEach((group) => {
		group.fields.forEach(({ code, value }) => (defaultCanDo[code] = value));
	});
	return defaultCanDo as RoleSettingsOutputCanDo;
}

function getCanDo(canDoBlock: RoleSettingsFormCanDoBlock): RoleSettingsOutputCanDo {
	const output: RoleSettingsOutputCanDo = getDefaultCanDo(canDoBlock.groups);
	canDoBlock.groups.forEach((group) => {
		const fieldCodes = group.fields.map(({ code }) => code);
		setCanDoValue(output, group.fields, fieldCodes);
	});
	return output;
}

export function getDefaultRoleSettingOutput(inputDTO: RoleSettingsForm): RoleSettingsOutputDTO {
	const yourselfGroup: RoleSettingsFormCanViewGroup | null =
		inputDTO.blocks.can_view.groups.find((el) => el.code === "see_about_yourself") || null;
	const subordinatesGroup: RoleSettingsFormCanViewGroup | null =
		inputDTO.blocks.can_view.groups.find((el) => el.code === "see_about_subordinates") || null;
	const teamMemberGroup: RoleSettingsFormCanViewGroup | null =
		inputDTO.blocks.can_view.groups.find((el) => el.code === "see_as_team_member") || null;
	const teamManagerGroup: RoleSettingsFormCanViewGroup | null =
		inputDTO.blocks.can_view.groups.find((el) => el.code === "see_as_manager") || null;
	const othersGroup: RoleSettingsFormCanViewGroup | null =
		inputDTO.blocks.can_view.groups.find((el) => el.code === "see_about_others") || null;

	return {
		main: getMain(inputDTO.main),
		can_do: getCanDo(inputDTO.blocks.can_do),
		can_view: {
			see_about_yourself: getDefaultCanViewGroupOutput(yourselfGroup),
			see_about_subordinates: getDefaultCanViewGroupOutput(subordinatesGroup),
			// see_as_manager: getDefaultCanViewGroupOutput(teamManagerGroup),
			//

			see_about_others: getDefaultCanViewGroupOutput(othersGroup),
		},
	} as RoleSettingsOutputDTO;
}

export function getDefaultPersonal(
	personalGroup: RoleSettingsFormCanViewGroup,
): RoleSettingsCanViewPersonal {
	const outputDTO = {};
	if (personalGroup.subgroups) {
		for (const subgroup of personalGroup.subgroups) {
			if (subgroup.fields) {
				const code = subgroup.code || subgroup.groupId;
				outputDTO[code] = {};

				for (const field of subgroup.fields) {
					outputDTO[code][field.code] =
						field.value ||
						(field.possibleValues && field.possibleValues[0]?.value) ||
						null;
				}
			}
		}
	}
	return outputDTO;
}

function findFieldValue<T = string>(
	code: string,
	subgroup: RoleSettingsFormCanViewGroup | null,
	def: T,
): T {
	if (subgroup && subgroup.fields) {
		const candidate = subgroup.fields.find((el) => el.code === code);
		if (!candidate) return;
		const value = candidate.value as T | null;
		const possibleValues = candidate.possibleValues;

		if (value == null) {
			if (Array.isArray(possibleValues)) {
				return candidate.possibleValues[0].value;
			} else {
				return def;
			}
		}
		return value;
	}
}

export function getDefaultCanViewGroupOutput(
	group: RoleSettingsFormCanViewGroup | null,
): RoleSettingsCanViewOutputDTO {
	function findSubgroup(code: string) {
		return (group?.subgroups && group.subgroups.find((el) => el.code === code)) || null;
	}

	const personalSubgroup = findSubgroup("personal");
	const workSubgroup = findSubgroup("work");
	const absencesSubgroup = findSubgroup("absences");
	const boardingSubgroup = findSubgroup("boarding");
	const efficiencySubgroup = findSubgroup("efficiency");
	const othersSubgroup = findSubgroup("others");
	const growthSubgroup = findSubgroup("growth");
	const edmsSubgroup = findSubgroup("edms");

	return {
		personal: personalSubgroup ? getDefaultPersonal(personalSubgroup) : {},
		work: {
			work: findFieldValue("work", workSubgroup, null),
			compensation: findFieldValue("compensation", workSubgroup, null),
			skills: findFieldValue("skills", workSubgroup, null),
			education: findFieldValue("education", workSubgroup, null),
			certificates: findFieldValue("certificates", workSubgroup, null),
			positions: findFieldValue("positions", workSubgroup, null),
			ranks: findFieldValue("ranks", workSubgroup, false),
			employment: findFieldValue("employment", workSubgroup, null),
			pay_sheets: findFieldValue("pay_sheets", workSubgroup, null),
			managers: findFieldValue("managers", workSubgroup, null),
			"part-timers": findFieldValue("part-timers", workSubgroup, null),
		},
		absences: {
			absences: findFieldValue("absences", absencesSubgroup, null),
		},
		boarding: {
			offboarding: findFieldValue("offboarding", boardingSubgroup, false),
			onboarding: findFieldValue("onboarding", boardingSubgroup, false),
		},
		efficiency: {
			competencies: findFieldValue("competencies", efficiencySubgroup, false),
			evaluation: findFieldValue("evaluation", efficiencySubgroup, false),
			"1_on_1": findFieldValue("1_on_1", efficiencySubgroup, false),
			objectives: findFieldValue("objectives", efficiencySubgroup, false),
		},
		others: {
			tasks: findFieldValue("tasks", othersSubgroup, false),
			documents: findFieldValue("documents", othersSubgroup, null),
			property: findFieldValue("property", othersSubgroup, null),
			children: findFieldValue("children", othersSubgroup, null),
			emergency_contacts: findFieldValue("emergency_contacts", othersSubgroup, null),
			notes: findFieldValue("emergency_contacts", othersSubgroup, null),
			learning: findFieldValue("learning", othersSubgroup, null),
		},
		growth: {
			pdp: findFieldValue("pdp", growthSubgroup, null),
		},
		edms: {
			edms_certificates: findFieldValue("edms_certificates", edmsSubgroup, null),
			passport_data: findFieldValue("passport_data", edmsSubgroup, null),
			snils: findFieldValue("snils", edmsSubgroup, null),
			enabled_edms: findFieldValue("enabled_edms", edmsSubgroup, null),
		},
	};
}

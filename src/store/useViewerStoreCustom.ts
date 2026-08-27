import { computed, ComputedRef } from "vue";

import { useViewerStore } from "@/store/storeViewer";

/**
 * Кастомный store для работы с canDo permissions из viewer store.
 * Предоставляет удобные computed свойства для проверки прав доступа.
 */
export function useViewerStoreCustom() {
	const viewer = useViewerStore();

	/**
	 * Проверка права на кастомизацию дашборда.
	 * Возвращает true, если пользователь право customize_dashboard_actions.
	 * Значение берётся из canDo, которое приходит с бэкенда.
	 */
	const canCustomizeDashboard: ComputedRef<boolean> = computed(
		() => viewer.props?.canDo?.customize_dashboard_actions === true
	);

	return {
		/** Оригинальный viewer store */
		viewer,
		/** Проверка права на кастомизацию дашборда */
		canCustomizeDashboard,
		/** canDo permissions из бэкенда */
		get canDo() {
			return viewer.props?.canDo;
		},
	};
}

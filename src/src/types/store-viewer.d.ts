import type { IViewerProps } from "@private/ismyteam/src/store/storeViewer";

declare module "@private/ismyteam/src/store/storeViewer" {
    interface IViewerProps {
        canDo?: {
            customize_dashboard_actions?: boolean;
        };
    }
}

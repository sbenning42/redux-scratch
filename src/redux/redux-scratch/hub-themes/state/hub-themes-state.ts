import { HubTheme } from '../../../../providers/hub-themes/hub-themes';
export { HubTheme } from '../../../../providers/hub-themes/hub-themes';

export interface HubThemesState {
    fetched: boolean;
    collection: HubTheme[];
}

export const initialHubThemesState: HubThemesState = {
    fetched: false,
    collection: [],
};
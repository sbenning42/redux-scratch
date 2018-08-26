export interface AppState {
    name: string;
    version: string;
    online: boolean;
    loading: boolean;
    errors: Error[];
    lastError: Error;
}

export const initialAppState: AppState = {
    name: 'Redux Scratch',
    version: '1.0.0',
    loading: false,
    online: true,
    errors: [],
    lastError: undefined
};
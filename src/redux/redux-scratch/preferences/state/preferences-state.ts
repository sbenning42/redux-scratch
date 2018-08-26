import { Preference } from '../../../../providers/preferences/preferences';
export { Preference } from '../../../../providers/preferences/preferences';

export interface PreferencesState {
    fetched: boolean;
    userId: string;
    collection: Preference[];
}

export const initialPreferencesState: PreferencesState = {
    fetched: false,
    userId: undefined,
    collection: [],
};

export interface PreferenceSerializer {
    serialize(obj: any): string;
    deserialize(serial: string): any;
}

export class ThemesPreferenceSerializer implements PreferenceSerializer {
    serialize(obj: HubTheme[]): string {
        const concatChildThemes = (aggregat, chunk) => aggregat ? `${aggregat};${chunk}` : chunk;
        const concatThemesAndChilds = theme => `${theme.codeTheme};${
            theme.childs.map(child => child.codeTheme).reduce(concatThemes, [])
        }`;
        return obj.map(concatThemesAndChilds).reduce(concatThemes, []);
    }
    deserialize(serial: string, references: HubTheme[]): HubTheme[] {
        const codeThemes = serial.split(';');
        const obj = [];
        let lastTheme;
        let lastReference;
        codeThemes.forEach(codeTheme => {
            const found = references.find(reference => reference.codeTheme === codeTheme);
            if (found) {
                lastReference = found;
                lastTheme = JSON.parse(JSON.stringify(found));
                lastTheme.childs = [];
                obj.push(lastTheme);
            } else if (lastReference) {
                const childReference = lastReference.childs.find(ch => ch.codeTheme === codeTheme);
                const child = JSON.parse(JSON.stringify(childReference));
                lastTheme.childs.push(child);
            }
        });
        return obj;
    }
}

export class FavorisPreferenceSerializer implements PreferenceSerializer {
    serialize(obj: any): string {
        return JSON.stringify(obj);
    }
    deserialize(serial: string): any {
        return JSON.parse(serial);
    }
}
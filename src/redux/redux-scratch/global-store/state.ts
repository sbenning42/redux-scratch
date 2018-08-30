import { Action } from '@ngrx/store';
import { LoadingOptions } from 'ionic-angular';

/**
 * Ce fichier décrit tout ce dont a besoin redux
 * pour gérer un "état" de l'application.
 * 
 * 
 * Chaque "feature" ou "aspect" de l'application
 * devrait idéalement posséder un tel fichier.
 */

/**
 * Le model de l'etat à décrire.
 */
export interface GlobalState {
    /**Le nom de l'application */
    name: string;
    /**La version de l'application */
    version: string;
    /**Le status en ligne/ hors ligne de l'application */
    online: boolean;
    /**Indique que l'application effectue une tâche asynchrone/synchrone-complexe */
    loading: boolean;
    /**L'ensemble des erreurs que l'application a rencontré */
    errors: Error[];
    /**La dernière erreur de l'application */
    error: Error;
}

/**
 * La valeur initiale de l'état à décrire.
 */
export const initialGlobalState: GlobalState = {
    name: 'Sample Redux App',
    version: '1.0.0',
    online: true, // Utiliser le plugin Network d'Ionic pour déterminer cet état
    loading: false,
    errors: [],
    error: undefined
}

/**
 * Une enum OPTIONNELLE qui rassemble
 * les valeurs des "type" d'action (implements Action@ngrx/store)
 * permettant aux composants et "effet" (implements Action@ngrx/effects)
 * de l'application, de modifier l'état à décrire.
 */
export enum GlobalActionTypes {
    /**Change le nom de l'application */
    setName = 'GLOBAL_SET_NAME',
    /**Change la version de l'application */
    setVersion = 'GLOBAL_SET_VERSION',
    /**Indique que l'application est en ligne */
    setOnline = 'GLOBAL_SET_ONLINE',
    /**Indique que l'application est hors ligne */
    setOffline = 'GLOBAL_SET_OFFLINE',
    /**Change la valeur de la dernière erreur rencontrée */
    setError = 'GLOBAL_SET_ERROR',
    /**Enlève la valeur de la dernière erreur rencontrée (ne l'enlève PAS du tableau errors) */
    unsetError = 'GLOBAL_UNSET_ERROR',
    /**Vide la liste des erreurs rencontrées par l'application */
    flushErrors = 'GLOBAL_FLUSH_ERRORS',
    /**Indique que l'application éffectue une tâche "longue" */
    loadingStart = 'GLOBAL_LOADING_START',
    /**Indique que l'application est diponible */
    loadingStop = 'GLOBAL_LOADING_STOP',
    /**Indique que l'application à besoin de conaître son status en ligne/hors ligne */
    askOnline = 'GLOBAL_ASK_ONLINE',
}

/**
 * On definit une classe pour chaques actions.
 * 
 * Une action peut avoir besoin de paramètre(s),
 * ceux-ci sont injectés dans son constructeur
 * 
 * */
export class GlobalSetNameAction implements Action {
    type = GlobalActionTypes.setName;
    constructor(public name: string) {}
}
export class GlobalSetVersionAction implements Action {
    type = GlobalActionTypes.setVersion;
    constructor(public version: string) {}
}
export class GlobalSetOnlineAction implements Action {
    type = GlobalActionTypes.setOnline;
}
export class GlobalSetOfflineAction implements Action {
    type = GlobalActionTypes.setOffline;
}
export class GlobalSetErrorAction implements Action {
    type = GlobalActionTypes.setError;
    constructor(public error: Error) {}
}
export class GlobalUnsetErrorAction implements Action {
    type = GlobalActionTypes.unsetError;
}
export class GlobalFlushErrorsAction implements Action {
    type = GlobalActionTypes.flushErrors;
}
export class GlobalLoadingStartAction implements Action {
    type = GlobalActionTypes.loadingStart;
    constructor(public opts: LoadingOptions) {}
}
export class GlobalLoadingStopAction implements Action {
    type = GlobalActionTypes.loadingStop;
}
export class GlobalAskOnlineAction implements Action {
    type = GlobalActionTypes.askOnline;
}

/**L'ensemble des types d'actions manipulant "l'état" à décrire */
export type GlobalActions = 
| GlobalSetNameAction
| GlobalSetVersionAction
| GlobalSetOnlineAction
| GlobalSetOfflineAction
| GlobalSetErrorAction
| GlobalUnsetErrorAction
| GlobalFlushErrorsAction
| GlobalLoadingStartAction
| GlobalLoadingStopAction
| GlobalAskOnlineAction;

/**
 * Le réducteur de "l'état" à décrire.
 * 
 * Le réducteur doit impérativement retourner une copie "profonde"
 * de l'état en cours.
 * 
 * Un des principes de Redux est que "l'état" de l'application est "immutable".
 * Ce principe de programmation fonctionnelle permet de manipuler un objet comme une valeur.
 * 
 * Chaques actions fournis ces paramètres nécessaires au calcul du nouvel "état".
 */
export function globalReducer(state: GlobalState = initialGlobalState, action: GlobalActions): GlobalState {
    switch (action.type) {
        case GlobalActionTypes.setName:
            return {
                ...state,
                name: (<GlobalSetNameAction>action).name,
            };
        case GlobalActionTypes.setVersion:
            return {
                ...state,
                version: (<GlobalSetVersionAction>action).version,
            };
        case GlobalActionTypes.setOnline:
            return {
                ...state,
                online: true,
            };
        case GlobalActionTypes.setOffline:
            return {
                ...state,
                online: false,
            };
        case GlobalActionTypes.setError:
            (<GlobalSetErrorAction>action).error.message = (<GlobalSetErrorAction>action).error.message
                ? (<GlobalSetErrorAction>action).error.message
                : 'Unknow error message';  
            return {
                ...state,
                error: (<GlobalSetErrorAction>action).error,
                errors: [...state.errors, (<GlobalSetErrorAction>action).error],
            };
        case GlobalActionTypes.unsetError:
            return {
                ...state,
                error: undefined,
            };
        case GlobalActionTypes.flushErrors:
            return {
                ...state,
                error: undefined,
                errors: [],
            };
        case GlobalActionTypes.loadingStart:
            return {
                ...state,
                loading: true,
            };
        case GlobalActionTypes.loadingStop:
            return {
                ...state,
                loading: false,
            };
        case GlobalActionTypes.askOnline:
        default:
            return state;
    }
}
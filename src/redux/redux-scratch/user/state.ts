import { Action } from '@ngrx/store';
import { SteamuloUser } from '../../../providers/auth/auth';
import { HubTheme } from '../hub-themes';

export class UserState {
    currentUser: SteamuloUser;
    themes: HubTheme[];
    favoris: string;
}
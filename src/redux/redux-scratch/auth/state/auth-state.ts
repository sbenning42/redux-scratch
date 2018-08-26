import { SteamuloUser } from '../../../../providers/auth/auth';

export interface AuthUser extends SteamuloUser {
}

export interface AuthState {
    authentified: boolean;
    authUser: AuthUser;
}

export const initialAuthState: AuthState = {
    authentified: false,
    authUser: undefined,
};
export enum AuthSelector {
  state = 'Auth',

  register = 'Register',
  login = 'Login',
  logout = 'Logout',

  registerPending = 'Register Pending',
  loginPending = 'Login Pending',
  logoutPending = 'Logout Pending',

  registerSuccess = 'Register Success',
  loginSuccess = 'Login Success',
  logoutSuccess = 'Logout Success',

  registerError = 'Register Error',
  loginError = 'login Error',
  logoutError = 'Logout Error'
}

export class AuthData {
  constructor(
    public authentified: boolean
  ) {}
}

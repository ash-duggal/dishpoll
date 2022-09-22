export const userDetailStateSelector = (state) => state.login.userDetils;
export const isLoginSelector = (state) => state.login.loginSuccess;
export const hasErrorSelector = (state) => state.login.loginFailure;
export const errorMessageSelector = (state) => state.login.error;

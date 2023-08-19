import { describe } from 'vitest';
import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/user-data';
import { userProcess, setCurrentUser } from './user-process.slice';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { AuthData } from '../../types/auth-data';

describe('UserProcess slice', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    currentUser: null,
  };
  const userTest: UserData = {
    name: 'Oliver Conner',
    avatarUrl: 'https://url-to-image/image.png',
    isPro: false,
    email: 'Oliver.conner@gmail.com',
    token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
  };
  const authDataTest: AuthData = {
    login: 'Oliver.conner@gmail.com',
    password: 'password1',
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = userProcess.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };
    const result = userProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should set "currentUser" to payload', () => {
    const expected = userTest;
    const result = userProcess.reducer(undefined, setCurrentUser(expected));
    expect(result.currentUser).toEqual(expected);
  });

  it('should set "authorizationStatus" to "AuthorizationStatus.Auth", "currentUser" to payload with "checkAuthAction.fulfilled"', () => {
    const expected = {
      authorizationStatus: AuthorizationStatus.Auth,
      currentUser: userTest,
    };
    const result = userProcess.reducer(
      undefined,
      checkAuthAction.fulfilled(userTest, '', undefined)
    );
    expect(result).toEqual(expected);
  });

  it('should set "authorizationStatus" to "AuthorizationStatus.NoAuth" with "checkAuthAction.rejected"', () => {
    const expected = AuthorizationStatus.NoAuth;
    const result = userProcess.reducer(
      undefined,
      checkAuthAction.rejected(null, '', undefined)
    );
    expect(result.authorizationStatus).toBe(expected);
  });

  it('should set "authorizationStatus" to "AuthorizationStatus.Auth", "currentUser" to payload with "loginAction.fulfilled"', () => {
    const expected = {
      authorizationStatus: AuthorizationStatus.Auth,
      currentUser: userTest,
    };
    const result = userProcess.reducer(
      undefined,
      loginAction.fulfilled(userTest, '', authDataTest)
    );
    expect(result).toEqual(expected);
  });

  it('should set "authorizationStatus" to "AuthorizationStatus.NoAuth" with "loginAction.rejected"', () => {
    const expected = AuthorizationStatus.NoAuth;
    const result = userProcess.reducer(
      undefined,
      loginAction.rejected(null, '', authDataTest)
    );
    expect(result.authorizationStatus).toBe(expected);
  });

  it('should set "authorizationStatus" to "AuthorizationStatus.NoAuth" with "logoutAction.fulfilled"', () => {
    const expected = AuthorizationStatus.NoAuth;
    const result = userProcess.reducer(
      undefined,
      logoutAction.fulfilled(undefined, '', undefined)
    );
    expect(result.authorizationStatus).toBe(expected);
  });
});

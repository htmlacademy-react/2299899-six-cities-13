import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from './login-page';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import userEvent from '@testing-library/user-event';
import {
  extractActionsTypes,
  makeFakeAuthData,
  makeFakeState,
  makeFakeUser,
} from '../../utils/test-mocks';
import { AuthData } from '../../types/auth-data';
import { loginAction } from '../../store/api-actions';
import { APIRoute, AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { redirectToRoute } from '../../store/action';

describe('Component: LoginPage', () => {
  let mockAuthData: AuthData;
  let mockState: State;

  beforeEach(() => {
    mockAuthData = makeFakeAuthData();
    mockState = makeFakeState();
    mockState[NameSpace.User].authorizationStatus = AuthorizationStatus.NoAuth;
  });

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<LoginPage />),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render correctly when user unters login and password', async () => {
    const { withStoreComponent } = withStore(
      withHistory(<LoginPage />),
      mockState
    );

    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId('loginElement'),
      mockAuthData.login
    );
    await userEvent.type(
      screen.getByTestId('passwordElement'),
      mockAuthData.password
    );

    expect(screen.getByDisplayValue(mockAuthData.login)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockAuthData.password)).toBeInTheDocument();
  });

  it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when submit button is clicked', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistory(<LoginPage />),
      mockState
    );
    mockAxiosAdapter
      .onPost(APIRoute.Login, {
        email: mockAuthData.login,
        password: mockAuthData.password,
      })
      .reply(204, makeFakeUser());

    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId('loginElement'),
      mockAuthData.login
    );
    await userEvent.type(
      screen.getByTestId('passwordElement'),
      mockAuthData.password
    );
    await userEvent.click(screen.getByTestId('login-submit'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);
  });
});

import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeaderUser from './header-user';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import {
  extractActionsTypes,
  makeFakeOffer,
  makeFakeState,
  makeFakeUser,
} from '../../utils/test-mocks';
import { APIRoute, AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { logoutAction } from '../../store/api-actions';
import userEvent from '@testing-library/user-event';
import { setCurrentUser } from '../../store/user-process/user-process.slice';

describe('Component: HeaderUser', () => {
  let mockState: State;
  const mockUser = makeFakeUser();

  beforeEach(() => {
    mockState = makeFakeState();
    mockState[NameSpace.User].currentUser = mockUser;
  });

  it('should render correctly with noAuth user status', () => {
    mockState[NameSpace.User].authorizationStatus = AuthorizationStatus.NoAuth;
    const { withStoreComponent } = withStore(
      withHistory(<HeaderUser />),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render correctly with auth user status', () => {
    mockState[NameSpace.User].authorizationStatus = AuthorizationStatus.Auth;
    mockState[NameSpace.Data].favorites = [makeFakeOffer(), makeFakeOffer()];
    const { withStoreComponent } = withStore(
      withHistory(<HeaderUser />),
      mockState
    );

    const { container } = render(withStoreComponent);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(
      container.getElementsByClassName('header__favorite-count')[0].textContent
    ).toBe(`${mockState[NameSpace.Data].favorites.length}`);
  });

  it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when clicked on "Sign out" button', async () => {
    mockState[NameSpace.User].authorizationStatus = AuthorizationStatus.Auth;
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistory(<HeaderUser />),
      mockState
    );
    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);
    mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, [makeFakeOffer()]);

    render(withStoreComponent);
    await userEvent.click(screen.getByText('Sign out'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      logoutAction.pending.type,
      setCurrentUser.type,
      logoutAction.fulfilled.type,
    ]);
  });
});

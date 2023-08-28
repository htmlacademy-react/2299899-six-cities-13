import { MemoryHistory, createMemoryHistory } from 'history';
import { describe } from 'vitest';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import { AppRoute, AuthorizationStatus, CITIES, NameSpace } from '../../const';
import { render, screen } from '@testing-library/react';
import { makeFakeState } from '../../utils/test-mocks';
import App from './app';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;
  const mockState = makeFakeState();
  mockState[NameSpace.Data].isLoading = false;
  mockState[NameSpace.User].authorizationStatus = AuthorizationStatus.NoAuth;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigates to "/"', () => {
    const { withStoreComponent } = withStore(
      withHistory(<App />, mockHistory),
      mockState
    );
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(CITIES[0])).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigates to "/login"', () => {
    const { withStoreComponent } = withStore(
      withHistory(<App />, mockHistory),
      mockState
    );
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigates to "/offer/:id"', () => {
    const { withStoreComponent } = withStore(
      withHistory(<App />, mockHistory),
      mockState
    );
    mockHistory.push(
      `${AppRoute.Offer}/${mockState[NameSpace.Data].offer?.id as string}`
    );

    render(withStoreComponent);

    expect(
      screen.getByText(mockState[NameSpace.Data].offer?.title as string)
    ).toBeInTheDocument();
    expect(
      screen.getByText('Other places in the neighbourhood')
    ).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigates to "/favorites"', () => {
    mockState[NameSpace.User].authorizationStatus = AuthorizationStatus.Auth;
    const { withStoreComponent } = withStore(
      withHistory(<App />, mockHistory),
      mockState
    );
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(
      screen.getByText(
        mockState[NameSpace.Data].favorites.at(0)?.title as string
      )
    ).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigates to non-existing route', () => {
    const { withStoreComponent } = withStore(
      withHistory(<App />, mockHistory),
      mockState
    );
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });
});

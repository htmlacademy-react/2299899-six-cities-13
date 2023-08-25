import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import {
  extractActionsTypes,
  makeFakeOffer,
  makeFakeState,
} from '../../utils/test-mocks';
import CardMain from './card-main';
import { State } from '../../types/state';
import { APIRoute, AuthorizationStatus, NameSpace } from '../../const';
import userEvent from '@testing-library/user-event';
import { toggleFavoriteAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';

describe('Component: CardMain', () => {
  const mockOffer = makeFakeOffer();
  let mockState: State;

  beforeEach(() => {
    mockState = makeFakeState();
  });

  it('should render correctly with given offer', () => {
    const { withStoreComponent } = withStore(
      withHistory(<CardMain offer={mockOffer} />),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });

  it('should dispatch "redirectToRoute" when clicked on bookmark and user no auth status', async () => {
    mockState[NameSpace.User].authorizationStatus = AuthorizationStatus.NoAuth;
    const { withStoreComponent, mockStore } = withStore(
      withHistory(<CardMain offer={mockOffer} />),
      mockState
    );

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId('card-main-bookmark-button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([redirectToRoute.type]);
  });

  it('should dispatch "toggleFavoriteAction.pending", "toggleFavoriteAction.fulfilled" when clicked on bookmark and user auth status', async () => {
    mockState[NameSpace.User].authorizationStatus = AuthorizationStatus.Auth;
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistory(<CardMain offer={mockOffer} />),
      mockState
    );
    mockAxiosAdapter
      .onPost(
        `${APIRoute.Favorites}/${mockOffer.id}/${Number(!mockOffer.isFavorite)}`
      )
      .reply(200, mockOffer);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId('card-main-bookmark-button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      toggleFavoriteAction.pending.type,
      toggleFavoriteAction.fulfilled.type,
    ]);
  });
});

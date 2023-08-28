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
import {
  APIRoute,
  AppRoute,
  AuthorizationStatus,
  NameSpace,
} from '../../const';
import userEvent from '@testing-library/user-event';
import { toggleFavoriteAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';

describe('Component: CardMain', () => {
  const mockOffer = makeFakeOffer();
  let mockState: State;
  const ClassNames = {
    [AppRoute.Main]: 'cities',
    [AppRoute.Offer]: 'near-places',
  };

  beforeEach(() => {
    mockState = makeFakeState();
  });

  it('should render correctly with given offer on "MainPage"', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <CardMain offer={mockOffer} className={ClassNames[AppRoute.Main]} />
      ),
      mockState
    );

    const { container } = render(withStoreComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(
      container.getElementsByClassName(`${ClassNames[AppRoute.Main]}__card`)
        .length
    ).not.toBe(0);
  });

  it('should render correctly with given offer on "OfferPage"', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <CardMain offer={mockOffer} className={ClassNames[AppRoute.Offer]} />
      ),
      mockState
    );

    const { container } = render(withStoreComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(
      container.getElementsByClassName(`${ClassNames[AppRoute.Offer]}__card`)
        .length
    ).not.toBe(0);
  });

  it('should dispatch "redirectToRoute" when clicked on bookmark and user no auth status', async () => {
    mockState[NameSpace.User].authorizationStatus = AuthorizationStatus.NoAuth;
    const { withStoreComponent, mockStore } = withStore(
      withHistory(
        <CardMain offer={mockOffer} className={ClassNames[AppRoute.Main]} />
      ),
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
      withHistory(
        <CardMain offer={mockOffer} className={ClassNames[AppRoute.Main]} />
      ),
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

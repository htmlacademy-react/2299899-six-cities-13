import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import {
  extractActionsTypes,
  makeFakeOffer,
  makeFakeState,
} from '../../utils/test-mocks';
import CardFavorites from './card-favorites';
import { State } from '../../types/state';
import { Offer } from '../../types/offer';
import userEvent from '@testing-library/user-event';
import { toggleFavoriteAction } from '../../store/api-actions';
import { APIRoute } from '../../const';

describe('Component: CardFavorites', () => {
  let mockState: State;
  let mockOffer: Offer;

  beforeEach(() => {
    mockState = makeFakeState();
    mockOffer = makeFakeOffer();
    mockOffer.isFavorite = true;
  });

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<CardFavorites offer={mockOffer} />),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });

  it('should dispatch "toggleFavoriteAction.pending", "toggleFavoriteAction.fulfilled" when clicked on bookmark', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistory(<CardFavorites offer={mockOffer} />),
      mockState
    );
    mockAxiosAdapter
      .onPost(`${APIRoute.Favorites}/${mockOffer.id}/0`)
      .reply(200, mockOffer);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId('card-favorites-bookmark-button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      toggleFavoriteAction.pending.type,
      toggleFavoriteAction.fulfilled.type,
    ]);
  });
});

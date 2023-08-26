import { describe } from 'vitest';
import {
  extractActionsTypes,
  makeFakeCity,
  makeFakeOffer,
  makeFakeState,
} from '../../utils/test-mocks';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import MainCardsBlock from './main-cards-block';
import { NameSpace } from '../../const';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { State } from '../../types/state';
import { setCardUnderMouse } from '../../store/app-process/app-process.slice';
import { Offer } from '../../types/offer';

describe('Component: MainCardsBlock', () => {
  let mockState: State;
  let currentCity: string;
  let filteredOffers: Offer[];

  beforeEach(() => {
    mockState = makeFakeState();
    currentCity = makeFakeCity().name;
    const offers = mockState[NameSpace.Data].offers;
    filteredOffers = offers.filter((offer) => offer.city.name === currentCity);
  });

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <MainCardsBlock
          offersCount={filteredOffers.length}
          currentCity={currentCity}
        />
      ),
      mockState
    );

    render(withStoreComponent);

    expect(
      screen.getByText(
        `${filteredOffers.length} places to stay in ${currentCity}`
      )
    );
  });

  it('should dispatch "setCardUnderMouse" when user mouse over, leave "CardMain"', async () => {
    const mockOffer = makeFakeOffer();
    mockState[NameSpace.Data].offers = [mockOffer];
    mockState[NameSpace.App].currentCity = mockOffer.city.name;
    const { withStoreComponent, mockStore } = withStore(
      withHistory(
        <MainCardsBlock
          offersCount={filteredOffers.length}
          currentCity={currentCity}
        />
      ),
      mockState
    );

    const { container } = render(withStoreComponent);
    await userEvent.hover(container.getElementsByClassName('place-card')[0]);
    await userEvent.unhover(container.getElementsByClassName('place-card')[0]);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([setCardUnderMouse.type, setCardUnderMouse.type]);
  });
});

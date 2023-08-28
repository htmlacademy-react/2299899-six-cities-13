import { describe } from 'vitest';
import {
  extractActionsTypes,
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

describe('Component: MainCardsBlock', () => {
  const mockOffer = makeFakeOffer();
  let mockState: State;
  const currentCity = mockOffer.city.name;

  beforeEach(() => {
    mockState = makeFakeState();
    mockState[NameSpace.App].currentCity = mockOffer.city.name;
  });

  it('should render correctly with only 1 offer', () => {
    mockState[NameSpace.Data].offers = [mockOffer];
    const { withStoreComponent } = withStore(
      withHistory(<MainCardsBlock offersCount={1} currentCity={currentCity} />),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByText(`1 place to stay in ${currentCity}`));
  });

  it('should render correctly with more than 1 offer', () => {
    const offers = [mockOffer, mockOffer, makeFakeOffer()];
    mockState[NameSpace.Data].offers = offers;
    const filteredOffers = offers.filter(
      (offer) => offer.city.name === currentCity
    );
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
        `${filteredOffers.length} place${
          filteredOffers.length >= 2 ? 's' : ''
        } to stay in ${currentCity}`
      )
    );
  });

  it('should dispatch "setCardUnderMouse" when user mouse over/leave "CardMain"', async () => {
    mockState[NameSpace.Data].offers = [mockOffer];
    const { withStoreComponent, mockStore } = withStore(
      withHistory(<MainCardsBlock offersCount={1} currentCity={currentCity} />),
      mockState
    );

    const { container } = render(withStoreComponent);
    await userEvent.hover(container.getElementsByClassName('place-card')[0]);
    await userEvent.unhover(container.getElementsByClassName('place-card')[0]);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([setCardUnderMouse.type, setCardUnderMouse.type]);
  });
});

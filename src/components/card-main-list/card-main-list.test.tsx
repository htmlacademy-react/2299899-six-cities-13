import { describe } from 'vitest';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import CardMainList from './card-main-list';
import { render } from '@testing-library/react';
import { State } from '../../types/state';
import { makeFakeOffer, makeFakeState } from '../../utils/test-mocks';
import { NameSpace } from '../../const';

describe('Component: CardMainList', () => {
  let mockState: State;

  beforeEach(() => {
    mockState = makeFakeState();
  });

  it('should render correctly on main page', () => {
    const onMouseOverCard = vi.fn();
    const onMouseLeaveCard = vi.fn();
    const offers = mockState[NameSpace.Data].offers;
    const currentCity = mockState[NameSpace.App].currentCity;
    const filteredOffers = offers.filter(
      (offer) => offer.city.name === currentCity
    );
    const { withStoreComponent } = withStore(
      withHistory(
        <CardMainList
          page="main"
          onMouseOverCard={onMouseOverCard}
          onMouseLeaveCard={onMouseLeaveCard}
        />
      ),
      mockState
    );

    const { container } = render(withStoreComponent);

    expect(container.getElementsByClassName('cities__places-list').length).toBe(
      1
    );
    expect(container.getElementsByClassName('near-places__list').length).toBe(
      0
    );
    expect(container.getElementsByClassName('place-card').length).toBe(
      filteredOffers.length
    );
  });

  it('should render correctly on offer page', () => {
    mockState[NameSpace.Data].nearOffers = [makeFakeOffer(), makeFakeOffer()];
    const { withStoreComponent } = withStore(
      withHistory(<CardMainList page="offer" />),
      mockState
    );

    const { container } = render(withStoreComponent);

    expect(container.getElementsByClassName('cities__places-list').length).toBe(
      0
    );
    expect(container.getElementsByClassName('near-places__list').length).toBe(
      1
    );
    expect(container.getElementsByClassName('place-card').length).toBe(
      mockState[NameSpace.Data].nearOffers.length
    );
  });
});

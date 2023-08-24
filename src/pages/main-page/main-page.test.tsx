import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import { makeFakeOffer, makeFakeState } from '../../utils/test-mocks';
import { CITIES, NameSpace } from '../../const';
import MainPage from './main-page';
import { State } from '../../types/state';

describe('Component: MainPage', () => {
  const mockOffer = makeFakeOffer();
  mockOffer.city.name = CITIES[0];
  let mockState: State;

  beforeEach(() => {
    mockState = makeFakeState();
    mockState[NameSpace.Data].offers = [mockOffer];
  });

  it('should render correctly with filtered offers', () => {
    mockState[NameSpace.App].currentCity = mockOffer.city.name;
    const { withStoreComponent } = withStore(
      withHistory(<MainPage />),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByTestId('main-page-offers-block')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render correctly with no filtered offers', () => {
    mockState[NameSpace.App].currentCity = CITIES[1];
    const { withStoreComponent } = withStore(
      withHistory(<MainPage />),
      mockState
    );

    const { container } = render(withStoreComponent);

    expect(
      container.getElementsByClassName('page__main--index-empty').length
    ).toBe(1);
    expect(
      container.getElementsByClassName('cities__places-container--empty').length
    ).toBe(1);
    expect(screen.getByTestId('main-page-no-offers')).toBeInTheDocument();
    expect(screen.queryByTestId('map')).toBeNull();
  });
});

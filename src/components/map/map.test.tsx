import { describe } from 'vitest';
import {
  makeFakeCity,
  makeFakeOffer,
  makeFakeState,
} from '../../utils/test-mocks';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import Map from './map';
import { render, screen } from '@testing-library/react';

describe('Component: Map', () => {
  const mockState = makeFakeState();
  const mockCity = makeFakeCity();
  const mockOffer = makeFakeOffer();
  const mockOffers = [mockOffer];

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <Map
          city={mockCity}
          offers={mockOffers}
          height="500px"
          zoom={mockCity.location.zoom}
        />
      ),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});

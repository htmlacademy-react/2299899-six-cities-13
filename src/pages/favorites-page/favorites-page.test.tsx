import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import { makeFakeOffer, makeFakeState } from '../../utils/test-mocks';
import { NameSpace } from '../../const';
import FavoritesPage from './favorites-page';

describe('Component: FavoritesPage', () => {
  const mockOffer = makeFakeOffer();
  const mockState = makeFakeState();

  it('should render correctly with existed favorites', () => {
    mockState[NameSpace.Data].favorites = [mockOffer];
    const { withStoreComponent } = withStore(
      withHistory(<FavoritesPage />),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByText(mockOffer.city.name)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });

  it('should render correctly with no favorites', () => {
    mockState[NameSpace.Data].favorites = [];
    const { withStoreComponent } = withStore(
      withHistory(<FavoritesPage />),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Save properties to narrow down search or plan your future trips.'
      )
    ).toBeInTheDocument();
  });
});

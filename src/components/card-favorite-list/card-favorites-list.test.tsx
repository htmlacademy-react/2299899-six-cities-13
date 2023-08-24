import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardFavoritesList from './card-favorites-list';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import { makeFakeOffer, makeFakeState } from '../../utils/test-mocks';
import { NameSpace } from '../../const';

describe('Component: CardFavoritesList', () => {
  it('should render correctly', () => {
    const mockOffer = makeFakeOffer();
    const mockState = makeFakeState();
    mockState[NameSpace.Data].favorites = [mockOffer];
    const { withStoreComponent } = withStore(
      withHistory(<CardFavoritesList />),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByText(mockOffer.city.name)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });
});

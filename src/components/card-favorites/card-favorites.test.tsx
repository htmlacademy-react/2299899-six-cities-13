import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import { makeFakeOffer, makeFakeState } from '../../utils/test-mocks';
import CardFavorites from './card-favorites';

describe('Component: CardFavorites', () => {
  const mockOffer = makeFakeOffer();
  mockOffer.isFavorite = true;
  const mockState = makeFakeState();

  it('should render correctly with offer in favorites', () => {
    const { withStoreComponent } = withStore(
      withHistory(<CardFavorites offer={mockOffer} />),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });
});

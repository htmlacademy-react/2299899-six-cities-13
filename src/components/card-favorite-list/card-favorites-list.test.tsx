import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardFavoritesList from './card-favorites-list';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import { makeFakeState } from '../../utils/test-mocks';
import { NameSpace } from '../../const';

describe('Component: CardFavoritesList', () => {
  it('should render correctly', () => {
    const mockState = makeFakeState();
    const { withStoreComponent } = withStore(
      withHistory(<CardFavoritesList />),
      mockState
    );

    const { container } = render(withStoreComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(container.getElementsByClassName('place-card').length).toBe(
      mockState[NameSpace.Data].favorites.length
    );
  });
});

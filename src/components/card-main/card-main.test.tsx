import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import { makeFakeOffer, makeFakeState } from '../../utils/test-mocks';
import CardMain from './card-main';

describe('Component: CardMain', () => {
  const mockOffer = makeFakeOffer();
  const mockState = makeFakeState();

  it('should render correctly with given offer', () => {
    const { withStoreComponent } = withStore(
      withHistory(<CardMain offer={mockOffer} />),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });
});

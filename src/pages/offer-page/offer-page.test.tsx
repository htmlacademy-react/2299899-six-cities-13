import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import { makeFakeOffer, makeFakeState } from '../../utils/test-mocks';
import { NameSpace } from '../../const';
import OfferPage from './offer-page';
import { State } from '../../types/state';

describe('Component: OfferPage', () => {
  const mockOffer = makeFakeOffer();
  let mockState: State;

  beforeEach(() => {
    mockState = makeFakeState();
    mockState[NameSpace.Data].offer = mockOffer;
  });

  it('should render Loading Component when offer is loading', () => {
    mockState[NameSpace.Data].isOfferLoading = true;
    const { withStoreComponent } = withStore(
      withHistory(<OfferPage />),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render correctly when offer is loaded', () => {
    mockState[NameSpace.Data].isOfferLoading = false;
    const { withStoreComponent } = withStore(
      withHistory(<OfferPage />),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when "currentOffer" is null', () => {
    mockState[NameSpace.Data].offer = null;
    const { withStoreComponent } = withStore(
      withHistory(<OfferPage />),
      mockState
    );

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });
});

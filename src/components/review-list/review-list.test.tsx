import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import {
  makeFakeOffer,
  makeFakeReview,
  makeFakeState,
} from '../../utils/test-mocks';
import ReviewList from './review-list';
import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';

describe('Component: ReviewList', () => {
  let mockState: State;
  let mockOffer: Offer;
  let mockReview: Review;

  beforeEach(() => {
    mockState = makeFakeState();
    mockOffer = makeFakeOffer();
    mockReview = makeFakeReview();
  });

  it('should render correctly with given offer id, existed reviews and auth user status', () => {
    const reviews = [mockReview, mockReview];
    mockState[NameSpace.Data].reviews = reviews;
    mockState[NameSpace.User].authorizationStatus = AuthorizationStatus.Auth;
    const { withStoreComponent } = withStore(
      withHistory(<ReviewList offerId={mockOffer.id} />),
      mockState
    );

    render(withStoreComponent);

    expect(
      screen.getByText(
        (_, element) => element?.textContent === `Reviews · ${reviews.length}`
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('offer-reviews-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('offer-reviews-list-item').length).toBe(
      reviews.length
    );
    expect(screen.getByTestId('offer-reviews-form')).toBeInTheDocument();
  });

  it('should render correctly with given offer id, no reviews and no auth user status', () => {
    mockState[NameSpace.Data].reviews = [];
    mockState[NameSpace.User].authorizationStatus = AuthorizationStatus.NoAuth;
    const { withStoreComponent } = withStore(
      withHistory(<ReviewList offerId={mockOffer.id} />),
      mockState
    );

    render(withStoreComponent);

    expect(
      screen.getAllByText(
        (_, element) => element?.textContent === 'Reviews · 0'
      )[0]
    ).toBeInTheDocument();
    expect(screen.getByTestId('offer-reviews-list')).toBeInTheDocument();
    expect(
      screen.queryByTestId('offer-reviews-list-item')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('offer-reviews-form')).not.toBeInTheDocument();
  });
});

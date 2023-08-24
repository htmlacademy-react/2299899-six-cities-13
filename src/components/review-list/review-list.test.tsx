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

describe('Component: ReviewList', () => {
  const mockState = makeFakeState();
  const mockOffer = makeFakeOffer();

  it('should render correctly with given offer id, existed reviews and auth user status', () => {
    const mockReview = makeFakeReview();
    mockState[NameSpace.Data].reviews = [mockReview];
    const mockReviewsAmount = mockState[NameSpace.Data].reviews.length;
    mockState[NameSpace.User].authorizationStatus = AuthorizationStatus.Auth;
    const { withStoreComponent } = withStore(
      withHistory(<ReviewList offerId={mockOffer.id} />),
      mockState
    );

    render(withStoreComponent);

    expect(
      screen.getByText(
        (_, element) =>
          element?.textContent === `Reviews · ${mockReviewsAmount}`
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('offer-reviews-list')).toBeInTheDocument();
    expect(screen.getByTestId('offer-reviews-list-item')).toBeInTheDocument();
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

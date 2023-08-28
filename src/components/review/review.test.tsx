import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Review from './review';
import { makeFakeReview } from '../../utils/test-mocks';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const mockReview = makeFakeReview();

    const { container } = render(<Review review={mockReview} />);

    expect(screen.getByTestId('offer-reviews-list-item')).toBeInTheDocument();
    expect(
      container.getElementsByClassName('reviews__user-name')[0].textContent
    ).toBe(mockReview.user.name);
  });
});

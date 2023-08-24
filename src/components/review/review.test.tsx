import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Review from './review';
import { makeFakeReview } from '../../utils/test-mocks';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const mockData = makeFakeReview();

    render(<Review review={mockData} />);

    expect(screen.getByTestId('offer-reviews-list-item')).toBeInTheDocument();
  });
});

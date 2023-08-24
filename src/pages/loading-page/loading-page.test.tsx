import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingPage from './loading-page';

describe('Component: LoadingPage', () => {
  it('should render correctly', () => {
    const expectedText = /Loading/i;

    render(<LoadingPage />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

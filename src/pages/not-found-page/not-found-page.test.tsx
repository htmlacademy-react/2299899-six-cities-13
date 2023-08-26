import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './not-found-page';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import { makeFakeState } from '../../utils/test-mocks';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<NotFoundPage />),
      makeFakeState()
    );

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Back to main page')).toBeInTheDocument();
  });
});

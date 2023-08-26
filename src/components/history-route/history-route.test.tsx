import { describe } from 'vitest';
import { createMemoryHistory } from 'history';
import HistoryRouter from './history-route';
import { render, screen } from '@testing-library/react';

describe('HOC: HistoryRouter', () => {
  it('should render correctly with HOC', () => {
    const expectedText = 'wrappedComponent';
    const mockComponent = <span>{expectedText}</span>;
    const history = createMemoryHistory();
    const preparedComponent = (
      <HistoryRouter history={history}>{mockComponent}</HistoryRouter>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

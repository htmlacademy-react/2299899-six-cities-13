import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from './login-page';
import { withHistory, withStore } from '../../utils/test-mocks-components';
import userEvent from '@testing-library/user-event';
import { makeFakeAuthData } from '../../utils/test-mocks';

describe('Component: LoginPage', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(withHistory(<LoginPage />), {});

    render(withStoreComponent);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render correctly when user unters login and password', async () => {
    const mockData = makeFakeAuthData();
    const { withStoreComponent } = withStore(withHistory(<LoginPage />), {});

    render(withStoreComponent);
    await userEvent.type(screen.getByTestId('loginElement'), mockData.login);
    await userEvent.type(
      screen.getByTestId('passwordElement'),
      mockData.password
    );

    expect(screen.getByDisplayValue(mockData.login)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockData.password)).toBeInTheDocument();
  });
});

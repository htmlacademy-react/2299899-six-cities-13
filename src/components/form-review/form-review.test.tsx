import { describe } from 'vitest';
import {
  extractActionsTypes,
  makeFakeOffer,
  makeFakeReview,
  makeFakeState,
} from '../../utils/test-mocks';
import { withStore } from '../../utils/test-mocks-components';
import { APIRoute, STARS } from '../../const';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { State } from '../../types/state';
import FormReview from './form-review';
import { postNewReviewAction } from '../../store/api-actions';

describe('Component: FormReview', () => {
  let mockState: State;
  const mockOffer = makeFakeOffer();

  beforeEach(() => {
    mockState = makeFakeState();
  });

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <FormReview offerId={mockOffer.id} />,
      mockState
    );

    const { container } = render(withStoreComponent);

    expect(screen.getByText('Your review'));
    expect(container.getElementsByClassName('form__rating-input').length).toBe(
      STARS.length
    );
    expect(
      container.getElementsByClassName('reviews__rating-label').length
    ).toBe(STARS.length);
    expect(screen.getByTestId('form-review-rating-5-input')).not.toBeChecked();
    expect(screen.getByTestId('form-review-text')).toHaveValue('');
    expect(screen.getByTestId('form-review-submit')).toBeDisabled();
  });

  it('should dispatch "postNewReviewAction.pending", "postNewReviewAction.fulfilled" when click on submit button', async () => {
    const testDescription =
      'We loved it so much, the house, the veiw, the location just great.';
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <FormReview offerId={mockOffer.id} />,
      mockState
    );
    mockAxiosAdapter
      .onPost(`${APIRoute.Reviews}/${mockOffer.id}`, {
        comment: testDescription,
        rating: 5,
      })
      .reply(200, makeFakeReview());

    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId('form-review-text'),
      testDescription
    );
    await userEvent.tab();
    await userEvent.click(screen.getByTestId('form-review-rating-5-label'));
    await userEvent.click(screen.getByTestId('form-review-submit'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(screen.getByTestId('form-review-rating-5-input')).toBeChecked();
    expect(screen.getByTestId('form-review-text')).toHaveValue(testDescription);
    expect(screen.getByTestId('form-review-submit')).not.toBeDisabled();
    expect(actions).toEqual([
      postNewReviewAction.pending.type,
      postNewReviewAction.fulfilled.type,
    ]);
  });
});

import { describe } from 'vitest';
import { extractActionsTypes, makeFakeState } from '../../utils/test-mocks';
import { withStore } from '../../utils/test-mocks-components';
import { NameSpace, STARS } from '../../const';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { State } from '../../types/state';
import FormReview from './form-review';
import { setIsPosted } from '../../store/data-process/data-process.slice';

describe('Component: MainCardsBlock', () => {
  let mockState: State;

  beforeEach(() => {
    mockState = makeFakeState();
  });

  it('should render correctly', () => {
    const onReviewSubmit = vi.fn();
    const { withStoreComponent } = withStore(
      <FormReview onReviewSubmit={onReviewSubmit} />,
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

  it('should dispatch "setIsPosted" when click on submit button and "isPosted" is true', async () => {
    const onReviewSubmit = vi.fn();
    const testDescription =
      'We loved it so much, the house, the veiw, the location just great.';
    mockState[NameSpace.Data].isPosted = true;
    const { withStoreComponent, mockStore } = withStore(
      <FormReview onReviewSubmit={onReviewSubmit} />,
      mockState
    );

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
    expect(onReviewSubmit).toBeCalledTimes(1);
    expect(actions).toEqual([setIsPosted.type]);
  });
});

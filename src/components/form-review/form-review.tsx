import {
  ChangeEvent,
  FormEvent,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { STARS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectIsReviewPosting,
  selectIsReviewPosted,
} from '../../store/data-process/data-process.selectors';
import { setIsReviewPosted } from '../../store/data-process/data-process.slice';
import { postNewReviewAction } from '../../store/api-actions';

type FormReviewProps = {
  offerId: string;
};

const FORM_DEFAULT_STATE = {
  rating: null,
  review: '',
};

function FormReview({ offerId }: FormReviewProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isReviewPosting = useAppSelector(selectIsReviewPosting);
  const isReviewPosted = useAppSelector(selectIsReviewPosted);

  const formRef = useRef<HTMLFormElement | null>(null);
  const [newReview, setNewReview] = useState(FORM_DEFAULT_STATE);
  const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const check =
        !!newReview.rating &&
        newReview.review.length >= 50 &&
        newReview.review.length <= 300;

      setIsSubmitAvailable(check);
    }

    return () => {
      isMounted = false;
    };
  }, [newReview]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (isReviewPosted) {
        formRef.current?.reset();
        setNewReview(FORM_DEFAULT_STATE);
        dispatch(setIsReviewPosted(null));
      }
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, isReviewPosted]);

  const handleFieldChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.currentTarget;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      postNewReviewAction({
        offerId,
        comment: newReview.review,
        rating: Number(newReview.rating),
      })
    );
  };

  const ratingStars = STARS.reduce(
    (res, star, index) => [
      ...res,
      <input
        key={`star-${5 - index}-input`}
        className="form__rating-input visually-hidden"
        name="rating"
        value={5 - index}
        id={`${5 - index}-stars`}
        type="radio"
        onChange={handleFieldChange}
        data-testid={`form-review-rating-${5 - index}-input`}
        disabled={!!isReviewPosting}
        checked={5 - index === Number(newReview.rating)}
      />,
      <label
        key={`star-${5 - index}-label`}
        htmlFor={`${5 - index}-stars`}
        className="reviews__rating-label form__rating-label"
        title={star}
        data-testid={`form-review-rating-${5 - index}-label`}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>,
    ],
    [] as ReactNode[]
  );

  return (
    <form
      ref={formRef}
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
      data-testid="offer-reviews-form"
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">{ratingStars}</div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={newReview.review}
        onChange={handleFieldChange}
        data-testid="form-review-text"
        disabled={!!isReviewPosting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isSubmitAvailable || !!isReviewPosting}
          data-testid="form-review-submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormReview;

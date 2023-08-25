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
import { selectIsPosted } from '../../store/data-process/data-process.selectors';
import { setIsPosted } from '../../store/data-process/data-process.slice';

type FormReviewProps = {
  onReviewSubmit: (rating: number, review: string) => void;
};

const FORM_DEFAULT_STATE = {
  rating: null,
  review: '',
};

function FormReview({ onReviewSubmit }: FormReviewProps): JSX.Element {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [newReview, setNewReview] = useState(FORM_DEFAULT_STATE);
  const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);
  const isReviewPosted = useAppSelector(selectIsPosted);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (newReview.rating && newReview.review.length >= 50) {
      setIsSubmitAvailable(true);
    } else {
      setIsSubmitAvailable(false);
    }
  }, [newReview]);

  useEffect(() => {
    if (isReviewPosted) {
      formRef.current?.reset();
      setNewReview(FORM_DEFAULT_STATE);
      dispatch(setIsPosted(false));
    }
  }, [dispatch, isReviewPosted]);

  const handleFieldChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (newReview.rating && newReview.review.length >= 50) {
      onReviewSubmit(Number(newReview.rating), newReview.review);
    }
  };

  const ratingStars = STARS.reduce(
    (res, star, index) => [
      ...res,
      <input
        key={`star-${5 - index}-input`}
        className="form__rating-input visually-hidden"
        name="rating"
        defaultValue={5 - index}
        id={`${5 - index}-stars`}
        type="radio"
        onChange={handleFieldChange}
        data-testid={`form-review-rating-${5 - index}-input`}
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
          disabled={!isSubmitAvailable}
          data-testid="form-review-submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormReview;

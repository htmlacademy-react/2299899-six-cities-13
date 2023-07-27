import { ChangeEvent, FormEvent, useState } from 'react';
import { STARS } from '../../const';

type FormReviewProps = {
  onReviewSubmit: () => void;
};

function FormReview({ onReviewSubmit }: FormReviewProps): JSX.Element {
  const [newReview, setNewReview] = useState({
    rating: '5',
    review: '',
  });

  const handleFieldChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onReviewSubmit();
  };

  const ratingStars = STARS.map((star, index) => (
    <>
      <input
        key={`star-${5 - index}-input`}
        className="form__rating-input visually-hidden"
        name="rating"
        defaultValue={5 - index}
        id={`${5 - index}-stars`}
        type="radio"
        onChange={handleFieldChange}
      />
      <label
        key={`star-${5 - index}-label`}
        htmlFor={`${5 - index}-stars`}
        className="reviews__rating-label form__rating-label"
        title={star}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  ));

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
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
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormReview;

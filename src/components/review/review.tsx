import { DateTimeFormat } from '../../const';
import { Review as ReviewType } from '../../types/review';
import { humanizeDate } from '../../utils/utils';

type ReviewProps = {
  review: ReviewType;
};

export default function Review({ review }: ReviewProps): JSX.Element {
  return (
    <li className="reviews__item" data-testid="offer-reviews-list-item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(review.rating / 5) * 100}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {humanizeDate(review.date, DateTimeFormat.COMMENT_DATE)}
        </time>
      </div>
    </li>
  );
}

import { useEffect } from 'react';
import FormReview from '../../components/form-review/form-review';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchReviewsAction,
  postNewCommentAction,
} from '../../store/api-actions';
import ReviewElement from '../review/review';
import { AuthorizationStatus } from '../../const';
import { getReviews } from '../../store/data-process/data-process.selectors';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

type ReviewListProps = {
  offerId: string;
};

export default function ReviewList(props: ReviewListProps): JSX.Element {
  const { offerId } = props;
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(fetchReviewsAction(offerId));
  }, [offerId, dispatch]);

  const onReviewSubmit = (rating: number, review: string) => {
    dispatch(postNewCommentAction({ offerId, comment: review, rating }));
  };

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewElement key={`reviews-${review.id}`} review={review} />
        ))}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && (
        <FormReview onReviewSubmit={onReviewSubmit} />
      )}
    </section>
  );
}

import { useEffect } from 'react';
import FormReview from '../../components/form-review/form-review';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-actions';
import ReviewElement from '../review/review';
import { AuthorizationStatus } from '../../const';

type ReviewListProps = {
  offerId: string;
};

export default function ReviewList(props: ReviewListProps): JSX.Element {
  const { offerId } = props;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchReviewsAction(offerId));
  });
  const reviews = useAppSelector((state) => state.reviews);
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
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
        <FormReview
          onReviewSubmit={() => {
            throw new Error('Function "onReviewSubmit" isn\'t implemented.');
          }}
        />
      )}
    </section>
  );
}

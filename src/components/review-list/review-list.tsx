import { useEffect } from 'react';
import FormReview from '../../components/form-review/form-review';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-actions';
import ReviewElement from '../review/review';
import { AuthorizationStatus } from '../../const';
import { selectReviews } from '../../store/data-process/data-process.selectors';
import { selectAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { sortReviewsNewToOld } from '../../utils/sort-options';

type ReviewListProps = {
  offerId: string;
};

export default function ReviewList(props: ReviewListProps): JSX.Element {
  const { offerId } = props;
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(selectReviews);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    dispatch(fetchReviewsAction(offerId));
  }, [offerId, dispatch]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list" data-testid="offer-reviews-list">
        {[...reviews]
          .sort(sortReviewsNewToOld)
          .slice(0, 10)
          .map((review) => (
            <ReviewElement key={`reviews-${review.id}`} review={review} />
          ))}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && (
        <FormReview offerId={offerId} />
      )}
    </section>
  );
}

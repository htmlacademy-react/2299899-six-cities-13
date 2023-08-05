import FormReview from '../../components/form-review/form-review';
import { Offer } from '../../mocks/offer';
import { MOCK_REVIEWS } from '../../mocks/reviews';
import { MOCK_USERS } from '../../mocks/users';
import ReviewElement from '../review/review';

type ReviewListProps = {
  currentOffer: Offer;
};

export default function ReviewList(props: ReviewListProps): JSX.Element {
  const { currentOffer } = props;
  const reviews = currentOffer.reviews.map((reviewId) =>
    MOCK_REVIEWS.find((review) => review.id === reviewId)
  );
  const reviewsElements = reviews.map((review) => {
    if (review) {
      const reviewUser = MOCK_USERS.find((user) => user.id === review.id);
      if (reviewUser) {
        return (
          <ReviewElement
            key={`${currentOffer.id}-reviews-${review.id}`}
            user={reviewUser}
            review={review}
          />
        );
      }
    }
  });
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews ·{' '}
        <span className="reviews__amount">{currentOffer.reviews.length}</span>
      </h2>
      <ul className="reviews__list">{reviewsElements}</ul>
      <FormReview
        onReviewSubmit={() => {
          throw new Error('Function "onReviewSubmit" isn\'t implemented.');
        }}
      />
    </section>
  );
}

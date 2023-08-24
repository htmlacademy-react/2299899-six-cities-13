import { MouseEvent } from 'react';
import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { toggleFavoriteAction } from '../../store/api-actions';

type CardFavoritesProps = {
  offer: Offer;
};

function CardFavorites({ offer }: CardFavoritesProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleFavoriteButoonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const offerId = evt.currentTarget.dataset.offerId as string;
    const isFavorite = Number(evt.currentTarget.dataset.isFavorite);
    const status = Number(!isFavorite);
    dispatch(toggleFavoriteAction({ offerId, status }));
  };

  return (
    <article className="favorites__card place-card" data-id={offer.id}>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={150}
            height={110}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
            data-offer-id={offer.id}
            data-is-favorite={Number(offer.isFavorite)}
            onClick={handleFavoriteButoonClick}
            data-testid="card-favorites-bookmark-button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating / 5) * 100}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default CardFavorites;

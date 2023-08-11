import { MouseEvent } from 'react';
import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';

export type MouseOverLeaveHandler = (evt: MouseEvent<HTMLElement>) => void;

type CardMainProps = {
  offer: Offer;
  mouseOverHandler?: MouseOverLeaveHandler;
  mouseLeaveHandler?: MouseOverLeaveHandler;
};

function CardMain(props: CardMainProps): JSX.Element {
  const { offer } = props;
  const { mouseOverHandler, mouseLeaveHandler } = props;
  return (
    <article
      className="cities__card place-card"
      data-id={offer.id}
      onMouseOver={mouseOverHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        {!!offer.previewImage && (
          <Link to={`/offer/${offer.id}`}>
            <img
              className="place-card__image"
              src={offer.previewImage}
              width={260}
              height={200}
              alt="Place image"
            />
          </Link>
        )}
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating / 5) * 100}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default CardMain;

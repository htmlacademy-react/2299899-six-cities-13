import { Helmet } from 'react-helmet-async';
import {
  AppRoute,
  AuthorizationStatus,
  OFFER_MAX_IMAGES_SHOWN,
} from '../../const';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import Map from '../../components/map/map';
import { useEffect, MouseEvent, useRef } from 'react';
import CardMainList from '../../components/card-main-list/card-main-list';
import ReviewList from '../../components/review-list/review-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchNearOffersAction,
  fetchOfferAction,
  toggleFavoriteAction,
} from '../../store/api-actions';
import cn from 'classnames';
import { capitalizeFirstLetter } from '../../utils/utils';
import HeaderUser from '../../components/header-user/header-user';
import {
  selectIsLoading,
  selectOffer,
  selectRandomNearOffers,
} from '../../store/data-process/data-process.selectors';
import { selectAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { redirectToRoute } from '../../store/action';
import LoadingPage from '../loading-page/loading-page';

function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id = '' } = useParams();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const currentOffer = useAppSelector(selectOffer);
  const nearOffers = useAppSelector(selectRandomNearOffers);
  const bookmarkRef = useRef<HTMLButtonElement>(null);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchOfferAction(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (currentOffer) {
      dispatch(fetchNearOffersAction(id));
    }
  }, [id, dispatch, currentOffer]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  const handleFavoriteButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
    } else {
      const offerId = evt.currentTarget.dataset.offerId as string;
      const status = Number(!Number(evt.currentTarget.dataset.isFavorite));
      dispatch(toggleFavoriteAction({ offerId, status }));
      if (bookmarkRef.current) {
        bookmarkRef.current.classList.toggle('offer__bookmark-button--active');
        bookmarkRef.current.dataset.isFavorite = String(status);
      }
    }
  };

  const gallery = currentOffer.images
    .slice(0, OFFER_MAX_IMAGES_SHOWN)
    .map((picture) => (
      <div className="offer__image-wrapper" key={`${id}-gallery-${picture}`}>
        <img className="offer__image" src={picture} alt="Photo studio" />
      </div>
    ));

  const goods = currentOffer.goods.map((service) => (
    <li className="offer__inside-item" key={`${id}-inside-${service}`}>
      {service}
    </li>
  ));

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <HeaderUser />
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">{gallery}</div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button
                  ref={bookmarkRef}
                  className={cn('offer__bookmark-button button', {
                    'offer__bookmark-button--active': currentOffer.isFavorite,
                  })}
                  type="button"
                  data-offer-id={currentOffer.id}
                  data-is-favorite={Number(currentOffer.isFavorite)}
                  onClick={handleFavoriteButtonClick}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{
                      width: `${(Math.round(currentOffer.rating) / 5) * 100}%`,
                    }}
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalizeFirstLetter(currentOffer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${currentOffer.bedrooms} Bedroom${
                    currentOffer.bedrooms > 1 ? 's' : ''
                  }`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {`Max ${currentOffer.maxAdults} adult${
                    currentOffer.maxAdults > 1 ? 's' : ''
                  }`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">{goods}</ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={cn(
                      'offer__avatar-wrapper user__avatar-wrapper',
                      {
                        'offer__avatar-wrapper--pro': currentOffer.host.isPro,
                      }
                    )}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>
              <ReviewList offerId={id} />
            </div>
          </div>
          <section className="offer__map map container">
            <Map
              city={currentOffer.city}
              offers={nearOffers}
              height="579px"
              zoom={currentOffer.city.location.zoom}
              currentOffer={currentOffer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <CardMainList page={AppRoute.Offer} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;

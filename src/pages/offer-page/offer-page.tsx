import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import Map from '../../components/map/map';
import { useEffect } from 'react';
import CardMainList from '../../components/card-main-list/card-main-list';
import ReviewList from '../../components/review-list/review-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchNearOffersAction,
  fetchOfferAction,
} from '../../store/api-actions';
import cn from 'classnames';
import LoadingPage from '../loading-page/loading-page';

function OfferPage(): JSX.Element {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferAction(id as string));
    dispatch(fetchNearOffersAction(id as string));
  }, [id, dispatch]);

  const currentOffer = useAppSelector((state) => state.offer);
  const nearOffers = useAppSelector((state) => state.nearOffers);
  const isOfferLoading = useAppSelector((state) => state.isOfferLoading);

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  if (isOfferLoading) {
    return <LoadingPage />;
  }

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
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((picture) => (
                <div
                  className="offer__image-wrapper"
                  key={`gallery-${picture}`}
                >
                  <img
                    className="offer__image"
                    src={picture}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
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
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${(currentOffer.rating / 5) * 100}%` }}
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type.slice(0, 1).toUpperCase() +
                    currentOffer.type.slice(1)}
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
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((service) => (
                    <li
                      className="offer__inside-item"
                      key={`${id as string}-inside-${service}`}
                    >
                      {service}
                    </li>
                  ))}
                </ul>
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
                  <span className="offer__user-status">
                    {currentOffer.host.isPro && 'Pro'}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>
              <ReviewList offerId={id as string} />
            </div>
          </div>
          <section className="offer__map map container">
            <Map
              city={currentOffer.city}
              offers={nearOffers}
              height="579px"
              zoom={currentOffer.city.location.zoom}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <CardMainList offers={nearOffers} page="offer" />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;

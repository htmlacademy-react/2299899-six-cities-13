import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { Link, useParams } from 'react-router-dom';
import { Offer } from '../../mocks/offer';
import NotFoundPage from '../not-found-page/not-found-page';
import { MOCK_USERS } from '../../mocks/users';
import CardMain from '../../components/card-main/card-main';
import ReviewList from '../../components/review-list/review-list';

type OfferPageProps = {
  offers: Offer[];
};

function OfferPage({ offers }: OfferPageProps): JSX.Element {
  const { id } = useParams();
  const currentOffer = offers.find((offer) => offer.id === Number(id)) as Offer;
  if (!currentOffer) {
    return <NotFoundPage />;
  }

  const host = MOCK_USERS.find((user) => user.id === currentOffer.host);

  const gallery = currentOffer.pictures.map((picture) => (
    <div
      className="offer__image-wrapper"
      key={`${id as string}-gallery-${picture}`}
    >
      <img className="offer__image" src={picture} alt="Photo studio" />
    </div>
  ));

  const FEATURES_CLASSES_SUFFIXES = ['entire', 'bedrooms', 'adults'];

  const features = currentOffer.features.map((feature, index) => (
    <li
      className={`offer__feature offer__feature--${FEATURES_CLASSES_SUFFIXES[index]}`}
      key={`${id as string}-features-${feature}`}
    >
      {feature}
    </li>
  ));

  const inside = currentOffer.inside.map((service) => (
    <li
      className="offer__inside-item"
      key={`${id as string}-inside-${service}`}
    >
      {service}
    </li>
  ));

  const nearPlaces = offers
    .slice(0, 3)
    .map((place) => (
      <CardMain offer={place} key={`${id as string}-places-${place.id}`} />
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
                    style={{ width: `${(currentOffer.rate / 5) * 100}%` }}
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer.rate}
                </span>
              </div>
              <ul className="offer__features">{features}</ul>
              <div className="offer__price">
                <b className="offer__price-value">€{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">{inside}</ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={host?.avatar}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host?.name}</span>
                  <span className="offer__user-status">
                    {host?.isPro && 'Pro'}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                  {/* <p className="offer__text">
                    An independent House, strategically located between Rembrand
                    Square and National Opera, but where the bustle of the city
                    comes to rest in this alley flowery and colorful.
                  </p> */}
                </div>
              </div>
              <ReviewList currentOffer={currentOffer} />
            </div>
          </div>
          <section className="offer__map map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">{nearPlaces}</div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;

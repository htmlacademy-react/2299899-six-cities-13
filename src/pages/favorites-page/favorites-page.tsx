import { Helmet } from 'react-helmet-async';

// import CardFavoritesList from '../../components/card-favorite-list/card-favorites-list';
import CardFavorites from '../../components/card-favorites/card-favorites';
import { Link } from 'react-router-dom';
import { AppRoute, CITIES } from '../../const';
import HeaderUser from '../../components/header-user/header-user';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/data-process/data-process.selectors';
import { Offer } from '../../types/offer';
import cn from 'classnames';

function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavorites);

  const favoriteOffersGrouped: { [key: string]: Offer[] } = CITIES.reduce(
    (object, city) => ({ ...object, [city]: [] }),
    {}
  );
  favoriteOffers.forEach((offer) => {
    favoriteOffersGrouped[offer.city.name].push(offer);
  });

  const favoritesElements = CITIES.map((city) => {
    if (favoriteOffersGrouped[city].length !== 0) {
      const cityOffers = favoriteOffersGrouped[city].map((offer) => (
        <CardFavorites
          offer={offer}
          key={`favorites-city-${city}-${offer.id}`}
        />
      ));
      return (
        <li
          className="favorites__locations-items"
          key={`favorites-city-${city}`}
        >
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">{cityOffers}</div>
        </li>
      );
    }
  });

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
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
      <main
        className={cn('page__main page__main--favorites', {
          'page__main--favorites-empty': favoriteOffers.length === 0,
        })}
      >
        <div className="page__favorites-container container">
          {favoriteOffers.length === 0 && (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
          )}
          {favoriteOffers.length !== 0 && (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">{favoritesElements}</ul>
            </section>
          )}
        </div>
      </main>
      <footer className="footer">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;

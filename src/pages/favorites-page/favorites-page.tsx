import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import HeaderUser from '../../components/header-user/header-user';
import { useAppSelector } from '../../hooks';
import { selectFavorites } from '../../store/data-process/data-process.selectors';
import cn from 'classnames';
import CardFavoritesList from '../../components/card-favorite-list/card-favorites-list';

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(selectFavorites);
  const offersCount = offers.length;

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
          'page__main--favorites-empty': offersCount === 0,
        })}
      >
        <div className="page__favorites-container container">
          {offersCount === 0 && (
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
          {offersCount !== 0 && <CardFavoritesList />}
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

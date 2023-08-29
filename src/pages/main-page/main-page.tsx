import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import HeaderUser from '../../components/header-user/header-user';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCurrentCity } from '../../store/app-process/app-process.selectors';
import cn from 'classnames';
import MainCardsBlock from '../../components/main-cards-block/main-cards-block';
import MainCardsBlockEmpty from '../../components/main-cards-block-empty/main-cards-block-empty';
import {
  selectFilteredOffers,
  selectIsLoading,
} from '../../store/data-process/data-process.selectors';
import { useEffect } from 'react';
import LoadingPage from '../loading-page/loading-page';
import { fetchOffersAction } from '../../store/api-actions';
import { selectCurrentUser } from '../../store/user-process/user-process.selectors';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(selectCurrentCity);
  const offers = useAppSelector(selectFilteredOffers);
  const currentUser = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector(selectIsLoading);
  const offersCount = offers.length;

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch, currentUser]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div
      className={cn('page page--gray page--main', {
        'page__main--index-empty': offersCount === 0,
      })}
    >
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                className="header__logo-link header__logo-link--active"
                to={AppRoute.Main}
              >
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
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList currentCity={currentCity} />
        <div className="cities">
          <div
            className={cn('cities__places-container container', {
              'cities__places-container--empty': offersCount === 0,
            })}
          >
            {offersCount === 0 && (
              <MainCardsBlockEmpty currentCity={currentCity} />
            )}
            {offersCount !== 0 && (
              <MainCardsBlock
                offersCount={offersCount}
                currentCity={currentCity}
              />
            )}
            <div className="cities__right-section">
              {offersCount !== 0 && (
                <section className="cities__map map">
                  <Map
                    city={offers[0].city}
                    offers={offers}
                    height="100%"
                    zoom={offers[0].city.location.zoom}
                  />
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;

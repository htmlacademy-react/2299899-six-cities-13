import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { AppRoute, SORT_OPTIONS } from '../../const';
import Map from '../../components/map/map';
import { useState, useCallback } from 'react';
import { MouseOverLeaveHandler } from '../../components/card-main/card-main';
import CitiesList from '../../components/cities-list/cities-list';
import * as sortOptions from './sort-options';
import HeaderUser from '../../components/header-user/header-user';
import { useAppSelector } from '../../hooks';
import { getCity } from '../../store/app-process/app-process.selectors';
import cn from 'classnames';
import Main from '../../components/main/main';
import MainEmpty from '../../components/main-empty/main-empty';

type MainPageProps = {
  offers: Offer[];
  cities: string[];
};

const sortFunctionMap = {
  [SORT_OPTIONS[1]]: sortOptions.sortPriceLowToHigh,
  [SORT_OPTIONS[2]]: sortOptions.sortPriceHighToLow,
  [SORT_OPTIONS[3]]: sortOptions.sortTop,
};

function MainPage(props: MainPageProps): JSX.Element {
  const { offers, cities } = props;

  const [activeCardId, setActiveCardId] = useState<string | undefined>(
    undefined
  );
  const [activeSort, setActiveSort] = useState<string>(SORT_OPTIONS[0]);
  const [isSortClosed, setIsSortClosed] = useState(true);

  const currentCity = useAppSelector(getCity);
  const filteredOffers = offers.filter(
    (offer) => offer.city.name === currentCity
  );
  const filteredOffersCount = filteredOffers.length;
  const sortedfilteredOffers = [...filteredOffers].sort(
    sortFunctionMap[activeSort]
  );

  const activeCard = filteredOffers.find((offer) => offer.id === activeCardId);

  const onMouseOverCard: MouseOverLeaveHandler = useCallback((evt) => {
    evt.preventDefault();
    setActiveCardId(evt.currentTarget.dataset.id);
  }, []);

  const onMouseLeaveCard: MouseOverLeaveHandler = useCallback((evt) => {
    evt.preventDefault();
    setActiveCardId(undefined);
  }, []);

  const onSortClick: MouseOverLeaveHandler = useCallback((evt) => {
    evt.preventDefault();
    setActiveSort(evt.currentTarget.innerText);
    setIsSortClosed((state) => !state);
  }, []);

  const onSortOptionsClick = useCallback(
    () => setIsSortClosed((state) => !state),
    []
  );

  return (
    <div
      className={cn('page page--gray page--main', {
        'page__main--index-empty': filteredOffers.length === 0,
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
        <CitiesList cities={cities} currentCity={currentCity} />
        <div className="cities">
          <div
            className={cn('cities__places-container container', {
              'cities__places-container--empty': filteredOffers.length === 0,
            })}
          >
            {filteredOffers.length === 0 && (
              <MainEmpty currentCity={currentCity} />
            )}
            {filteredOffers.length !== 0 && (
              <Main
                offers={sortedfilteredOffers}
                filteredOffersCount={filteredOffersCount}
                onMouseOverCard={onMouseOverCard}
                onMouseLeaveCard={onMouseLeaveCard}
                onSortClick={onSortClick}
                onSortOptionsClick={onSortOptionsClick}
                isSortClosed={isSortClosed}
                activeSort={activeSort}
                currentCity={currentCity}
              />
            )}
            <div className="cities__right-section">
              {filteredOffers.length !== 0 && (
                <section className="cities__map map">
                  <Map
                    city={filteredOffers[0].city}
                    offers={filteredOffers}
                    selectedOffer={activeCard}
                    height="500px"
                    zoom={filteredOffers[0].city.location.zoom}
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

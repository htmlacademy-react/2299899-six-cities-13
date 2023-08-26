import cn from 'classnames';
import { MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { CITIES, SORT_OPTIONS } from '../../const';
import {
  setCity,
  setCurrentSort,
} from '../../store/app-process/app-process.slice';

type CitiesListProps = {
  currentCity: string;
};

export default function CitiesList({
  currentCity,
}: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityChange = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    const cityTitle = evt.currentTarget.textContent;
    const newCity = CITIES.find((city) => city === cityTitle);
    if (newCity) {
      dispatch(setCity(newCity));
      dispatch(setCurrentSort(SORT_OPTIONS[0]));
    }
  };

  const citiesElements = CITIES.map((city) => (
    <li
      key={city}
      className="locations__item"
      onClick={handleCityChange}
      data-testid="city-item"
    >
      <a
        className={cn('locations__item-link tabs__item', {
          'tabs__item--active': currentCity === city,
        })}
        href="#"
      >
        <span>{city}</span>
      </a>
    </li>
  ));

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">{citiesElements}</ul>
      </section>
    </div>
  );
}

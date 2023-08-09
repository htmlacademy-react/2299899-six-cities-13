import cn from 'classnames';
import { MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { CITIES } from '../../const';
import { setCity } from '../../store/app-process/app-process.slice';

type CitiesListProps = {
  cities: string[];
  currentCity: string;
};

export default function CitiesList(props: CitiesListProps): JSX.Element {
  const { cities, currentCity } = props;
  const dispatch = useAppDispatch();

  const handleCityChange = (evt: MouseEvent<HTMLSpanElement>) => {
    evt.preventDefault();
    const cityTitle = evt.currentTarget.innerText;
    const newCity = CITIES.find((city) => city === cityTitle);
    if (newCity) {
      dispatch(setCity(newCity));
    }
  };
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city} className="locations__item">
              <a
                className={cn('locations__item-link tabs__item', {
                  'tabs__item--active': currentCity === city,
                })}
                href="#"
              >
                <span onClick={handleCityChange}>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

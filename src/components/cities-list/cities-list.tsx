import cn from 'classnames';

type CitiesListProps = {
  cities: string[];
  currentCity: string;
};

export default function CitiesList(props: CitiesListProps): JSX.Element {
  const { cities, currentCity } = props;
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
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

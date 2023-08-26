import { CITIES } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectGroupedFavorites } from '../../store/data-process/data-process.selectors';
import CardFavorites from '../card-favorites/card-favorites';

function CardFavoritesList(): JSX.Element {
  const groupedOffers = useAppSelector(selectGroupedFavorites);

  const favoritesElements = CITIES.map((city) => {
    if (groupedOffers[city].length !== 0) {
      const cityOffers = groupedOffers[city].map((offer) => (
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
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">{favoritesElements}</ul>
    </section>
  );
}

export default CardFavoritesList;

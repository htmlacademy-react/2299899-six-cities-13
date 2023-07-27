import { Offer } from '../../mocks/offer';
import CardFavorites from '../card-favorites/card-favorites';

type CardFavoritesListProps = {
  offers: Offer[];
};

function CardFavoritesList({ offers }: CardFavoritesListProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  return (
    <div className="favorites__places">
      {favoriteOffers.map((offer) => (
        <CardFavorites key={offer.id} offer={offer} />
      ))}
    </div>
  );
}

export default CardFavoritesList;

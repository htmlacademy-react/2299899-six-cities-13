import { Offer } from '../../mocks/offer';
import CardFavorites from '../card-favorites/card-favorites';

type CardFavoritesListProps = {
  offers: Offer[];
};

function CardFavoritesList({ offers }: CardFavoritesListProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const cardFavoritesList = favoriteOffers.map((offer) => (
    <CardFavorites key={offer.id} offer={offer} />
  ));
  return <div className="favorites__places">{cardFavoritesList}</div>;
}

export default CardFavoritesList;

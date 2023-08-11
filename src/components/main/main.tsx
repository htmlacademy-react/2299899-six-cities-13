import { Offer } from '../../types/offer';
import CardMainList from '../card-main-list/card-main-list';
import { MouseOverLeaveHandler } from '../card-main/card-main';
import SortOptions from '../sort-options/sort-options';

type MainProps = {
  offers: Offer[];
  filteredOffersCount: number;
  onMouseOverCard: MouseOverLeaveHandler;
  onMouseLeaveCard: MouseOverLeaveHandler;
  currentCity: string;
};

export default function Main(props: MainProps): JSX.Element {
  const {
    offers,
    filteredOffersCount,
    onMouseOverCard,
    onMouseLeaveCard,
    currentCity,
  } = props;

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {filteredOffersCount} places to stay in {currentCity}
      </b>
      <SortOptions />
      <CardMainList
        offers={offers}
        page="main"
        onMouseOverCard={onMouseOverCard}
        onMouseLeaveCard={onMouseLeaveCard}
      />
    </section>
  );
}

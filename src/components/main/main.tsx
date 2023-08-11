import { Offer } from '../../types/offer';
import CardMainList from '../card-main-list/card-main-list';
import { MouseOverLeaveHandler } from '../card-main/card-main';
import SortOptions from '../sort-options/sort-options';

type MainProps = {
  offers: Offer[];
  filteredOffersCount: number;
  onMouseOverCard: MouseOverLeaveHandler;
  onMouseLeaveCard: MouseOverLeaveHandler;
  onSortClick: MouseOverLeaveHandler;
  onSortOptionsClick: () => void;
  isSortClosed: boolean;
  activeSort: string;
  currentCity: string;
};

export default function Main(props: MainProps): JSX.Element {
  const {
    offers,
    filteredOffersCount,
    onMouseOverCard,
    onMouseLeaveCard,
    onSortClick,
    onSortOptionsClick,
    isSortClosed,
    activeSort,
    currentCity,
  } = props;

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {filteredOffersCount} places to stay in {currentCity}
      </b>
      <SortOptions
        activeSort={activeSort}
        onSortClick={onSortClick}
        isSortClosed={isSortClosed}
        onSortOptionsClick={onSortOptionsClick}
      />
      <CardMainList
        offers={offers}
        page="main"
        onMouseOverCard={onMouseOverCard}
        onMouseLeaveCard={onMouseLeaveCard}
      />
    </section>
  );
}

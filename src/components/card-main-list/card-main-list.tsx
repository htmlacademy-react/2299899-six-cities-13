import CardMain from '../../components/card-main/card-main';
import { MouseOverLeaveHandler } from '../../components/card-main/card-main';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import {
  selectSortedOffers,
  selectThreeRandomNearOffers,
} from '../../store/data-process/data-process.selectors';
import { AppRoute } from '../../const';

type CardMainListProps = {
  page: string;
  onMouseOverCard?: MouseOverLeaveHandler;
  onMouseLeaveCard?: MouseOverLeaveHandler;
};

function CardMainList(props: CardMainListProps): JSX.Element {
  const { page } = props;
  const { onMouseOverCard, onMouseLeaveCard } = props;

  const selector =
    page === AppRoute.Main ? selectSortedOffers : selectThreeRandomNearOffers;
  const offers = useAppSelector(selector);

  return (
    <div
      className={cn('places__list', {
        'cities__places-list tabs__content': page === AppRoute.Main,
        'near-places__list': page === AppRoute.Offer,
      })}
    >
      {offers.map((offer) => (
        <CardMain
          key={offer.id}
          offer={offer}
          mouseOverHandler={onMouseOverCard}
          mouseLeaveHandler={onMouseLeaveCard}
          className={page === AppRoute.Main ? 'cities' : 'near-places'}
        />
      ))}
    </div>
  );
}

export default CardMainList;

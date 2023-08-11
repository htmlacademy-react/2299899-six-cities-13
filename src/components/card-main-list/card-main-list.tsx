import { Offer } from '../../types/offer';
import CardMain from '../../components/card-main/card-main';
import { MouseOverLeaveHandler } from '../../components/card-main/card-main';
import cn from 'classnames';
import { SORT_OPTIONS } from '../../const';
import * as options from './sort-options';
import { useAppSelector } from '../../hooks';
import { getCurrentSort } from '../../store/app-process/app-process.selectors';

type CardMainListProps = {
  offers: Offer[];
  page: string;
  onMouseOverCard?: MouseOverLeaveHandler;
  onMouseLeaveCard?: MouseOverLeaveHandler;
};

const sortFunctionMap = {
  [SORT_OPTIONS[1]]: options.sortPriceLowToHigh,
  [SORT_OPTIONS[2]]: options.sortPriceHighToLow,
  [SORT_OPTIONS[3]]: options.sortTop,
};

function CardMainList(props: CardMainListProps): JSX.Element {
  const { offers, page } = props;
  const { onMouseOverCard, onMouseLeaveCard } = props;
  const currentSort = useAppSelector(getCurrentSort);

  const sortedfilteredOffers = [...offers].sort(sortFunctionMap[currentSort]);
  return (
    <div
      className={cn('places__list', {
        'cities__places-list': page === 'main',
        'tabs__content': page === 'main',
        'near-places__list': page === 'offer',
      })}
    >
      {sortedfilteredOffers.map((offer) => (
        <CardMain
          key={offer.id}
          offer={offer}
          mouseOverHandler={onMouseOverCard}
          mouseLeaveHandler={onMouseLeaveCard}
        />
      ))}
    </div>
  );
}

export default CardMainList;

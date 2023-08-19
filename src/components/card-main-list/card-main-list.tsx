import CardMain from '../../components/card-main/card-main';
import { MouseOverLeaveHandler } from '../../components/card-main/card-main';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import {
  selectNearOffers,
  selectSortedOffers,
} from '../../store/data-process/data-process.selectors';

type CardMainListProps = {
  page: string;
  onMouseOverCard?: MouseOverLeaveHandler;
  onMouseLeaveCard?: MouseOverLeaveHandler;
};

function CardMainList(props: CardMainListProps): JSX.Element {
  const { page } = props;
  const { onMouseOverCard, onMouseLeaveCard } = props;

  const selector = page === 'main' ? selectSortedOffers : selectNearOffers;
  const offers = useAppSelector(selector);

  return (
    <div
      className={cn('places__list', {
        'cities__places-list': page === 'main',
        'tabs__content': page === 'main',
        'near-places__list': page === 'offer',
      })}
    >
      {offers.map((offer) => (
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

import { Offer } from '../../mocks/offer';
import CardMain from '../../components/card-main/card-main';
import { MouseOverLeaveHandler } from '../../components/card-main/card-main';

type CardMainListProps = {
  offers: Offer[];
  className: string;
  onMouseOverCard: MouseOverLeaveHandler;
  onMouseLeaveCard: MouseOverLeaveHandler;
};

function CardMainList(props: CardMainListProps): JSX.Element {
  const { offers } = props;
  const { className } = props;
  const { onMouseOverCard, onMouseLeaveCard } = props;
  return (
    <div className={className}>
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

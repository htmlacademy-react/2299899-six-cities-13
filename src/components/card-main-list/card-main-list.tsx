import { Offer } from '../../mocks/offer';
import CardMain from '../../components/card-main/card-main';
import { useState } from 'react';

type CardMainListProps = {
  offers: Offer[];
};

function CardMainList({ offers }: CardMainListProps): JSX.Element {
  const [, setActiveCard] = useState(-1);
  const cardList = offers.map((offer) => (
    <CardMain
      key={offer.id}
      offer={offer}
      mouseOverHandler={(evt) => {
        evt.preventDefault();
        setActiveCard(offer.id);
      }}
      mouseLeaveHandler={(evt) => {
        evt.preventDefault();
        setActiveCard(-1);
      }}
    />
  ));
  return (
    <div className="cities__places-list places__list tabs__content">
      {cardList}
    </div>
  );
}

export default CardMainList;

import { useCallback } from 'react';
import { useAppDispatch } from '../../hooks';
import CardMainList from '../card-main-list/card-main-list';
import { MouseOverLeaveHandler } from '../card-main/card-main';
import SortOptions from '../sort-options/sort-options';
import { setCardUnderMouse } from '../../store/app-process/app-process.slice';
import { AppRoute } from '../../const';

type MainCardsBlockProps = {
  offersCount: number;
  currentCity: string;
};

export default function MainCardsBlock(
  props: MainCardsBlockProps
): JSX.Element {
  const { offersCount, currentCity } = props;

  const dispatch = useAppDispatch();

  const handleCardHoverCard: MouseOverLeaveHandler = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(setCardUnderMouse(evt.currentTarget.dataset.id));
    },
    [dispatch]
  );

  const handleCardUnhoverCard: MouseOverLeaveHandler = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(setCardUnderMouse(undefined));
    },
    [dispatch]
  );

  return (
    <section
      className="cities__places places"
      data-testid="main-page-offers-block"
    >
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offersCount} place{offersCount >= 2 ? 's' : ''} to stay in{' '}
        {currentCity}
      </b>
      <SortOptions />
      <CardMainList
        page={AppRoute.Main}
        onMouseOverCard={handleCardHoverCard}
        onMouseLeaveCard={handleCardUnhoverCard}
      />
    </section>
  );
}

import { useCallback } from 'react';
import { useAppDispatch } from '../../hooks';
import CardMainList from '../card-main-list/card-main-list';
import { MouseOverLeaveHandler } from '../card-main/card-main';
import SortOptions from '../sort-options/sort-options';
import { setCardUnderMouse } from '../../store/app-process/app-process.slice';

type MainCardsBlockProps = {
  offersCount: number;
  currentCity: string;
};

export default function MainCardsBlock(
  props: MainCardsBlockProps
): JSX.Element {
  const { offersCount, currentCity } = props;

  const dispatch = useAppDispatch();

  const onMouseOverCard: MouseOverLeaveHandler = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(setCardUnderMouse(evt.currentTarget.dataset.id));
    },
    [dispatch]
  );

  const onMouseLeaveCard: MouseOverLeaveHandler = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(setCardUnderMouse(undefined));
    },
    [dispatch]
  );

  return (
    <section className="cities__places places" data-testid="main-page-offers-block">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offersCount} places to stay in {currentCity}
      </b>
      <SortOptions />
      <CardMainList
        page="main"
        onMouseOverCard={onMouseOverCard}
        onMouseLeaveCard={onMouseLeaveCard}
      />
    </section>
  );
}

import { useState } from 'react';
import { SORT_OPTIONS } from '../../const';
import cn from 'classnames';
import { MouseOverLeaveHandler } from '../card-main/card-main';
import { setCurrentSort } from '../../store/app-process/app-process.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCurrentSort } from '../../store/app-process/app-process.selectors';

export default function SortOptions(): JSX.Element {
  const [isSortClosed, setIsSortClosed] = useState(true);
  const currentSort = useAppSelector(selectCurrentSort);
  const dispatch = useAppDispatch();

  const handleDropdownClick = () => setIsSortClosed((state) => !state);
  const handleSortClick: MouseOverLeaveHandler = (evt) => {
    evt.preventDefault();
    dispatch(setCurrentSort(evt.currentTarget.innerText));
    setIsSortClosed(true);
  };

  const listElements = SORT_OPTIONS.map((option) => (
    <li
      key={`sort-option-${option}`}
      className={cn('places__option', {
        'places__option--active': option === currentSort,
      })}
      tabIndex={0}
      onClick={handleSortClick}
    >
      {option}
    </li>
  ));

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleDropdownClick}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom places__options--${
          isSortClosed ? 'closed' : 'opened'
        }`}
      >
        {listElements}
      </ul>
    </form>
  );
}

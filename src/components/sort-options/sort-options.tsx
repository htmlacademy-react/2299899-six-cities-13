import { SORT_OPTIONS } from '../../const';
import cn from 'classnames';
import { MouseOverLeaveHandler } from '../card-main/card-main';

type SortOptionsProps = {
  activeSort: string;
  onSortClick: MouseOverLeaveHandler;
  isSortClosed: boolean;
  onSortOptionsClick: MouseOverLeaveHandler;
};

export default function SortOptions(props: SortOptionsProps): JSX.Element {
  const { activeSort, isSortClosed } = props;
  const { onSortClick, onSortOptionsClick } = props;
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={onSortOptionsClick}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom places__options--${
          isSortClosed ? 'closed' : 'opened'
        }`}
      >
        {SORT_OPTIONS.map((option) => (
          <li
            key={`sort-option-${option}`}
            className={cn('places__option', {
              'places__option--active': option === activeSort,
            })}
            tabIndex={0}
            onClick={onSortClick}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

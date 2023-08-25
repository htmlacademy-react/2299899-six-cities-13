import { describe } from 'vitest';
import { extractActionsTypes, makeFakeState } from '../../utils/test-mocks';
import { NameSpace, SORT_OPTIONS } from '../../const';
import { random } from 'faker';
import { State } from '../../types/state';
import { withStore } from '../../utils/test-mocks-components';
import SortOptions from './sort-options';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setCurrentSort } from '../../store/app-process/app-process.slice';

describe('Component: SortOptions', () => {
  let mockState: State;

  beforeEach(() => {
    mockState = makeFakeState();
  });

  it('should render correctly', () => {
    const currentSort = random.arrayElement(SORT_OPTIONS);
    mockState[NameSpace.App].currentSort = currentSort;
    const { withStoreComponent } = withStore(<SortOptions />, mockState);

    render(withStoreComponent);

    expect(screen.getByTestId('sort-options-status').textContent).toBe(
      currentSort
    );
    expect(screen.getByRole('list').getAttribute('class')).toContain('closed');
  });

  it('should render correctly when clicked on dropdown', async () => {
    const currentSort = random.arrayElement(SORT_OPTIONS);
    mockState[NameSpace.App].currentSort = currentSort;
    const { withStoreComponent } = withStore(<SortOptions />, mockState);

    const { container } = render(withStoreComponent);
    await userEvent.click(screen.getByTestId('sort-options-status'));

    expect(screen.getByRole('list').getAttribute('class')).toContain('opened');
    expect(
      container.getElementsByClassName('places__option--active').length
    ).toBe(1);
    expect(container.getElementsByClassName('places__option').length).toBe(
      SORT_OPTIONS.length
    );
  });

  it('should dispatch "setCurrentSort", close dropdown when clicked on dropdown sort option', async () => {
    const currentSort = random.arrayElement(SORT_OPTIONS);
    mockState[NameSpace.App].currentSort = currentSort;
    const { withStoreComponent, mockStore } = withStore(
      <SortOptions />,
      mockState
    );

    const { container } = render(withStoreComponent);
    await userEvent.click(screen.getByTestId('sort-options-status'));
    const sortOptionsElements = Array.from(
      container.getElementsByClassName('places__option')
    );
    await userEvent.click(random.arrayElement(sortOptionsElements));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([setCurrentSort.type]);
    expect(screen.getByRole('list').getAttribute('class')).toContain('closed');
  });
});

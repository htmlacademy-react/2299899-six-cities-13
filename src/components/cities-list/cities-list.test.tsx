import { describe } from 'vitest';
import {
  extractActionsTypes,
  makeFakeCity,
  makeFakeState,
} from '../../utils/test-mocks';
import { CITIES, NameSpace } from '../../const';
import { withStore } from '../../utils/test-mocks-components';
import CitiesList from './cities-list';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  setCurrentCity,
  setCurrentSort,
} from '../../store/app-process/app-process.slice';
import { State } from '../../types/state';

describe('Component: CitiesList', () => {
  let mockState: State;

  beforeEach(() => {
    mockState = makeFakeState();
  });

  it('should render correctly with provided current city', () => {
    const mockCity = makeFakeCity();
    mockState[NameSpace.App].currentCity = mockCity.name;
    const { withStoreComponent } = withStore(
      <CitiesList currentCity={mockCity.name} />
    );

    const { container } = render(withStoreComponent);

    expect(container.getElementsByClassName('tabs__item').length).toBe(
      CITIES.length
    );
    expect(container.getElementsByClassName('tabs__item--active').length).toBe(
      1
    );
    expect(
      container.getElementsByClassName('tabs__item--active')[0].textContent
    ).toBe(mockCity.name);
  });

  it('should dispatch "setCurrentCity", "setCurrentSort" when city is changed', async () => {
    mockState[NameSpace.App].currentCity = CITIES[0];
    const { withStoreComponent, mockStore } = withStore(
      <CitiesList currentCity={CITIES[0]} />
    );

    render(withStoreComponent);
    await userEvent.click(screen.getAllByTestId('city-item')[1]);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([setCurrentCity.type, setCurrentSort.type]);
  });
});

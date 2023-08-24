import { describe } from 'vitest';
import { makeFakeCity, makeFakeState } from '../../utils/test-mocks';
import { CITIES, NameSpace } from '../../const';
import { withStore } from '../../utils/test-mocks-components';
import CitiesList from './cities-list';
import { render } from '@testing-library/react';

describe('Component: CitiesList', () => {
  const mockState = makeFakeState();

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
});

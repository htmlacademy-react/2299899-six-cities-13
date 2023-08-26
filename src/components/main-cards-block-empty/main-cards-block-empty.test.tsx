import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainCardsBlockEmpty from './main-cards-block-empty';
import { random } from 'faker';
import { CITIES } from '../../const';

describe('Component: MainCardsBlockEmpty', () => {
  it('should render correctly', () => {
    const mockCity = random.arrayElement(CITIES);
    const expectedBoldText = 'No places to stay available';
    const expectedText = `We could not find any property available at the moment in ${mockCity}`;

    render(<MainCardsBlockEmpty currentCity={mockCity} />);

    expect(screen.getByText(expectedBoldText)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

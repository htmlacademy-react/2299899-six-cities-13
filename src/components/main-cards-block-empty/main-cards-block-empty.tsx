type MainCardsBlockEmptyProps = {
  currentCity: string;
};

export default function MainCardsBlockEmpty({
  currentCity,
}: MainCardsBlockEmptyProps): JSX.Element {
  return (
    <section className="cities__no-places" data-testid="main-page-no-offers">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">
          We could not find any property available at the moment in{' '}
          {currentCity}
        </p>
      </div>
    </section>
  );
}

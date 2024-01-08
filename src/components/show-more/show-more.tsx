type ShowMoreButtonProps = {
  action: () => void;
}

export function ShowMoreButton({action}: ShowMoreButtonProps) {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => action()}>Show more</button>
    </div>
  );
}

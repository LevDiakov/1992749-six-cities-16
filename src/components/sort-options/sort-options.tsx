import cn from 'classnames';
import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setSortOption } from '../../features/sorting-offers-by-cities';
import { sortOptions } from '../../const';
import { SortOption } from '../../types/types';

type SortOptionsProps = {
  currentSortOption: SortOption;
}

function SortOptions({currentSortOption}: SortOptionsProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  const handleFormSortClick = () => {
    setIsOpened((prevState) => !prevState);
  };

  const dispatch = useAppDispatch();

  const handleSortTypeClick = (item: string) => {
    setIsOpened(false);
    dispatch(setSortOption(item));
  };

  return (
    <form className="places__sorting" action="#" method="get" >
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleFormSortClick}>
        {currentSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn('places__options places__options--custom ', {'places__options--opened': isOpened})} >
        {sortOptions.map((item) => (
          <li
            onClick={() => handleSortTypeClick(item) }
            key={item}
            className={cn('places__option', {
              'places__option--active': item === currentSortOption,
            })}
            tabIndex={0}
          >
            {item}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortOptions;


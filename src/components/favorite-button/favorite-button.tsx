import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { postFavoritesAction } from '../../store/api-actions';

type FavoriteButtonProps = {
  isFavorite: boolean;
  className: string;
  id: string | undefined;
}

function FavoriteButton({isFavorite, className, id}: FavoriteButtonProps): JSX.Element {
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(isFavorite);
  const dispatch = useAppDispatch();
  return (
    <button onClick={() => {
      setFavoriteStatus(() => !favoriteStatus);
      const message = {
        offerId: id,
        status: favoriteStatus ? 1 : 0,
      };
      dispatch(postFavoritesAction(message));
    }}
    className={`${isFavorite ? `${className}__bookmark-button--active` : ''} ${className}__bookmark-button button`} type="button"
    >
      <svg className={`${className}__bookmark-icon`} width={className === 'offer' ? '31' : '18'} height={className === 'offer' ? '33' : '19'}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>

  );
}
export default FavoriteButton;

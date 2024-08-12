import { Offer } from '../../types/types';
import { Link } from 'react-router-dom';
import { AppRoute, NumericalValues } from '../../const';
import { getCapitalLetter } from '../../utils';
import FavoriteButton from '../favorite-button/favorite-button';

type PlaceCardProps = {
  offer: Offer;
  className: string;
  onListOfferHover?: (id?: string) => void;
}

function PlaceCard({offer, className, onListOfferHover}: PlaceCardProps): JSX.Element {
  const {price, previewImage, title, type, isPremium, rating, id, isFavorite} = offer;

  return (
    <article className={`${className}__card place-card`}
      onMouseEnter={() => onListOfferHover && onListOfferHover(id)}
      onMouseLeave={() => onListOfferHover && onListOfferHover(undefined)}
    >
      { isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : ''}
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to={AppRoute.Offer.replace(':id', id)}>
          <img className="place-card__image" src={previewImage} width={(className === 'favorites') ? '150' : '260'} height={(className === '/favorites') ? '110' : '200'} alt="Place image" />
        </Link>
      </div>
      <div className={`${className === 'favorites' ? 'favorites__card-info ' : ''}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton isFavorite={isFavorite} className='place-card' />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(rating * NumericalValues.Twenty)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer.replace(':id', id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{getCapitalLetter(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;

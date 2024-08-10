import { Navigate, useParams } from 'react-router-dom';
import Reviews from '../../components/reviews/reviews';
import { FullOffer, Offer, userReviews} from '../../types/types';
import { getCapitalLetter } from '../../utils';
import { offers } from '../../mocks/offers';
import PlaceCard from '../../components/place-card/place-card';
import { AppRoute, NumericalValues } from '../../const';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import Map from '../../components/map/map';

type OfferPageProps = {
  fullOffers: FullOffer[];
  reviews: userReviews[];
}

function OfferPage({fullOffers, reviews}: OfferPageProps): JSX.Element {
  const {id} = useParams();
  const currentOffer: FullOffer | undefined = fullOffers.find((item) => item.id === id);
  if (!currentOffer) {
    return <Navigate to={AppRoute.NotFound} replace/>;
  }
  const selectedOffer: Offer | undefined = offers.find((item) => item.id === currentOffer.id);
  const {bedrooms, images, isPremium, rating, title, type, maxAdults, price, goods, host, description, isFavorite} = currentOffer;

  return (
    <div className="page">

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((item) => (
                <div className="offer__image-wrapper" key={item}>
                  <img className="offer__image" src={item} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium ?
                <div className="offer__mark">
                  <span>Premium</span>
                </div> : '' }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <FavoriteButton isFavorite={isFavorite} className='offer' />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(rating * NumericalValues.Twenty)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">4.8</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {getCapitalLetter(type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} {bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} {maxAdults > 1 ? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((item) => (
                    <li className="offer__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`${host.isPro ? 'offer__avatar-wrapper--pro' : ''} offer__avatar-wrapper user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  <span className="offer__user-status">
                    {host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>

              <Reviews reviews={reviews}/>

            </div>
          </div>
          <Map city={currentOffer.city} selectedOffer={selectedOffer} offers={offers.slice(NumericalValues.Zero, NumericalValues.Four)} className='offer'/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">

              {offers.slice(NumericalValues.Zero, NumericalValues.Three).map((item) => <PlaceCard key={item.id} offer={item} className='near-places'/>)}

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;

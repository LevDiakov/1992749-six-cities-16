import { Navigate, useParams } from 'react-router-dom';
import Reviews from '../../components/reviews/reviews';
import { getCapitalLetter } from '../../utils';
import { AppRoute, NumericalValues } from '../../const';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import Map from '../../components/map/map';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchFullOfferAction, fetchOffersNearbyAction, fetchReviewsAction } from '../../store/api-actions';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import PlaceCard from '../../components/place-card/place-card';

function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const currentActivOffer = useAppSelector((state) => state.rental.currentOffer);
  const reviews = useAppSelector((state) => state.rental.reviews);
  const offersNearby = useAppSelector((state) => state.rental.offersNearby);
  const isCurrentOfferLoadingStatus = useAppSelector((state) => state.rental.isCurrentOfferLoadingStatus);
  const isReviewsLoadingStatus = useAppSelector((state) => state.rental.isReviewsLoadingStatus);
  const isOffersNearbyLoadingStatus = useAppSelector((state) => state.rental.isOffersNearbyLoadingStatus);
  useEffect(() => {
    if(id) {
      dispatch(fetchFullOfferAction(id));
      dispatch(fetchReviewsAction(id));
      dispatch(fetchOffersNearbyAction(id));
    }
  }, [dispatch, id]);

  if (isCurrentOfferLoadingStatus || isReviewsLoadingStatus || isOffersNearbyLoadingStatus) {
    return (
      <LoadingScreen />
    );
  }

  if (!currentActivOffer) {
    return <Navigate to={AppRoute.NotFound} replace/>;
  }

  const {bedrooms, images, isPremium, rating, title, type, maxAdults, price, goods, host, description, isFavorite} = currentActivOffer;

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

              {<Reviews reviews={reviews}/>}

            </div>
          </div>
          {<Map city={currentActivOffer.city} selectedOffer={currentActivOffer} offers={offersNearby.slice(NumericalValues.Zero, NumericalValues.Three)} className='offer'/>}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">

              {offersNearby.slice(NumericalValues.Zero, NumericalValues.Three).map((item) => <PlaceCard key={item.id} offer={item} className='near-places'/>)}

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;

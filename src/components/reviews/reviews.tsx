import { AuthorizationStatus, NumericalValues } from '../../const';
import { userReviews } from '../../types/types';
import { gethumanizeDate, getSortedByDates } from '../../utils';
import { useAppSelector } from '../../store/hooks';
import ReviewsForm from '../reviews-form/reviews-form';

type ReviewsProps = {
  reviews: userReviews;
}

function Reviews({reviews}: ReviewsProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.rental.authorizationStatus);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
    Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {[...reviews].sort(getSortedByDates).map((item) => (reviews.length > 0 ? (
          <li className="reviews__item" key={crypto.randomUUID()}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img
                  className="reviews__avatar user__avatar"
                  src={item.user.avatarUrl}
                  width={54}
                  height={54}
                  alt="Reviews avatar"
                />
              </div>
              <span className="reviews__user-name">{item.user.name}</span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{width: `${(item.rating * NumericalValues.Twenty)}%`}} />
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {item.comment}
              </p>
              <time className="reviews__time" dateTime={item.date}>
                {gethumanizeDate(item.date)}
              </time>
            </div>
          </li>) : ''
        ))}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth ? (
        <ReviewsForm />
      ) : null}
    </section>

  );
}

export default Reviews;

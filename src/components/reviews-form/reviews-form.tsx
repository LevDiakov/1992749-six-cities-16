import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useState, useEffect, Fragment } from 'react';
import { COMMENT_LENGTH, REVIEWS_RATING } from '../../const';
import { addReviewsAction } from '../../store/api-actions';

function ReviewsForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  });
  const validateForm = () =>
    formData.rating && formData.comment.length >= COMMENT_LENGTH.min && formData.comment.length <= COMMENT_LENGTH.max;
  const isDisabled = !validateForm();
  const isFormUploading = useAppSelector((state) => state.rental.isReviewsUploadingStatus);
  useEffect(() => {
    if (!isFormUploading) {
      setFormData({
        rating: 0,
        comment: '',
      });
    }
  }, [isFormUploading]);

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        const message = {
          offerId: id,
          data: formData,
        };
        dispatch(addReviewsAction(message));
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">
      Your review
      </label>
      <div className="reviews__rating-form form__rating" >
        {REVIEWS_RATING.map(({title, rank}) => (
          <Fragment key={title} >
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rank}
              id={`${rank}-stars`}
              type="radio"
              onChange={
                (evt) => {
                  const {name, value} = evt.target;
                  const numberValue = Number.parseInt(value, 10);
                  setFormData({...formData, [name]: numberValue});
                }
              }
            />
            <label key={title}
              htmlFor={`${rank}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea onChange={
        (evt) => {
          const {name, value} = evt.target;
          setFormData({...formData, [name]: value});
        }
      }
      value={formData.comment}
      className="reviews__textarea form__textarea"
      id="comment"
      name="comment"
      placeholder="Tell how was your stay, what you like and what can be improved"
      minLength={COMMENT_LENGTH.min}
      maxLength={COMMENT_LENGTH.max}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
        with at least <b className="reviews__text-amount">50 characters </b>
        and no more than <b className="reviews__text-amount">300 characters</b>.<br/>
        There are <b className="reviews__text-amount">{COMMENT_LENGTH.max - formData.comment.length} characters</b> left to use.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled}
        >
        Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;

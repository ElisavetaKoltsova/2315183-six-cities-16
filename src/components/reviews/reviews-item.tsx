import { Comment } from '../../types/comments.ts';

type ReviewsItemProps = {
  comment: Comment;
}

function ReviewsItem({comment}: ReviewsItemProps): JSX.Element {
  const starsPercent = comment.rating * 100 / 5;
  const commentDate = new Date(comment.date);
  return (
    <li className="reviews__item" data-testid="reviewsItem">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${starsPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time
          className="reviews__time"
          dateTime={commentDate.toDateString()}
        >
          {
            commentDate.toLocaleString('en', {
              month: 'long',
              year: 'numeric'
            })
          }
        </time>
      </div>
    </li>
  );
}

export default ReviewsItem;

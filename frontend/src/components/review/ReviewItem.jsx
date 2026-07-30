import StarRating from './StarRating'
import { timeAgo } from '../../data/mockData'
import './ReviewItem.css'

export default function ReviewItem({ review }) {
  const initial = review.user.charAt(0).toUpperCase()

  return (
    <div className="review-item animate-fade-in">
      <div className="review-item__header">
        <div className="review-item__avatar" style={{ backgroundColor: `hsl(${review.user.charCodeAt(0) * 7 % 360}, 60%, 65%)` }}>
          {review.avatar ? <img src={review.avatar} alt={review.user} /> : initial}
        </div>
        <div className="review-item__meta">
          <span className="review-item__name">{review.user}</span>
          <span className="review-item__date">{timeAgo(review.date)}</span>
        </div>
        <StarRating rating={review.rating} size={14} />
      </div>
      <p className="review-item__content">{review.content}</p>
      
      {review.replies?.map((reply, i) => (
        <div key={i} className="review-item__reply">
          <div className="review-item__reply-header">
            <span className="review-item__reply-avatar">👤</span>
            <span className="review-item__reply-name">{reply.user}</span>
            {reply.isAuthor && <span className="review-item__author-badge">Tác giả</span>}
            <span className="review-item__date">{timeAgo(reply.date)}</span>
          </div>
          <p className="review-item__reply-content">{reply.content}</p>
        </div>
      ))}
    </div>
  )
}

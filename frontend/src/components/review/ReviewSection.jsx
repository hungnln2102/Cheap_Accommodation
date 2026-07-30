import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import StarRating from './StarRating'
import RatingBadge from './RatingBadge'
import ReviewItem from './ReviewItem'
import ReviewForm from './ReviewForm'
import './ReviewSection.css'

export default function ReviewSection({ reviews: initialReviews, rating, reviewCount }) {
  const [reviews, setReviews] = useState(initialReviews)

  // Tính rating trung bình live
  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : rating

  // Breakdown
  const breakdown = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percent: reviews.length ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0,
  }))

  const handleNewReview = (review) => {
    setReviews(prev => [review, ...prev])
  }

  return (
    <section className="review-section">
      <h2 className="review-section__title">
        <MessageCircle size={22} /> Đánh giá & Bình luận
        <span className="review-section__count">({reviews.length})</span>
      </h2>

      {/* Rating Summary */}
      <div className="review-section__summary">
        <div className="review-section__score">
          <span className="review-section__score-number">{avgRating.toFixed(1)}</span>
          <StarRating rating={avgRating} size={20} />
          <span className="review-section__score-text">{reviews.length} đánh giá</span>
          <RatingBadge rating={avgRating} size="lg" />
        </div>
        <div className="review-section__breakdown">
          {breakdown.map(b => (
            <div key={b.star} className="review-section__bar-row">
              <span className="review-section__bar-label">{b.star} ⭐</span>
              <div className="review-section__bar-track">
                <div className="review-section__bar-fill" style={{ width: `${b.percent}%` }} />
              </div>
              <span className="review-section__bar-count">{b.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      <ReviewForm onSubmit={handleNewReview} />

      {/* Review List */}
      <div className="review-section__list">
        {reviews.map(review => (
          <ReviewItem key={review.id} review={review} />
        ))}
        {reviews.length === 0 && (
          <p className="review-section__empty">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
        )}
      </div>
    </section>
  )
}

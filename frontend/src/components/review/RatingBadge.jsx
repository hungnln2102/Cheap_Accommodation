import { getRatingBadge } from '../../data/mockData'
import './RatingBadge.css'

export default function RatingBadge({ rating, size = 'md' }) {
  const badge = getRatingBadge(rating)

  return (
    <span className={`rating-badge rating-badge--${badge.type} rating-badge--${size}`}>
      <span className="rating-badge__icon">{badge.icon}</span>
      <span className="rating-badge__label">{badge.label}</span>
    </span>
  )
}

import { useState } from 'react'
import { Star } from 'lucide-react'
import './StarRating.css'

export default function StarRating({ rating = 0, max = 5, size = 18, interactive = false, onChange }) {
  const [hovered, setHovered] = useState(0)

  const handleClick = (val) => {
    if (interactive && onChange) onChange(val)
  }

  return (
    <div className={`star-rating ${interactive ? 'star-rating--interactive' : ''}`} onMouseLeave={() => setHovered(0)}>
      {Array.from({ length: max }, (_, i) => {
        const val = i + 1
        const filled = interactive ? val <= (hovered || rating) : val <= Math.round(rating)
        return (
          <Star
            key={i}
            size={size}
            className={`star-rating__star ${filled ? 'star-rating__star--filled' : ''}`}
            fill={filled ? 'var(--color-star)' : 'none'}
            stroke={filled ? 'var(--color-star)' : 'var(--color-star-empty)'}
            onClick={() => handleClick(val)}
            onMouseEnter={() => interactive && setHovered(val)}
          />
        )
      })}
    </div>
  )
}

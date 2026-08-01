import { Link } from 'react-router-dom'
import { MapPin, Maximize2, Star, Heart } from 'lucide-react'
import { formatPrice, AMENITY_ICONS, AMENITY_LABELS } from '../../data/mockData'
import { useAuth } from '../../context/AuthContext'
import RatingBadge from '../review/RatingBadge'
import './RoomCard.css'

export default function RoomCard({ room, index = 0 }) {
  const { toggleFavorite, isFavorite } = useAuth()
  const isRented = room.status === 'rented'
  const isSaved = isFavorite(room.id)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(room.id)
  }

  return (
    <Link
      to={`/phong/${room.slug}`}
      className={`room-card animate-fade-in ${isRented ? 'room-card--rented' : ''}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="room-card__image-wrapper">
        <img src={room.images[0]} alt={room.title} className="room-card__image" loading="lazy" width={400} height={300} />
        
        {/* Nút Trái tim lưu nhanh */}
        <button 
          className={`room-card__favorite-btn ${isSaved ? 'room-card__favorite-btn--active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isSaved ? 'Xóa khỏi yêu thích' : 'Lưu vào yêu thích'}
        >
          <Heart size={16} fill={isSaved ? '#ef4444' : 'transparent'} stroke={isSaved ? '#ef4444' : 'currentColor'} />
        </button>

        <div className="room-card__badges">
          <span className={`room-card__status room-card__status--${room.status}`}>
            {isRented ? 'Đã thuê' : 'Còn trống'}
          </span>
          <RatingBadge rating={room.rating} size="sm" />
        </div>
        <span className="room-card__photo-count">📷 {room.images.length}</span>
      </div>

      <div className="room-card__body">
        <h3 className="room-card__title">{room.title}</h3>

        <div className="room-card__meta">
          <span className="room-card__location"><MapPin size={14} /> {room.address.split(',').slice(-2).join(',').trim()}</span>
          <span className="room-card__area"><Maximize2 size={14} /> {room.area} m²</span>
        </div>

        <div className="room-card__amenities">
          {room.amenities.slice(0, 4).map(a => (
            <span key={a} className="room-card__amenity" title={AMENITY_LABELS[a]}>{AMENITY_ICONS[a]}</span>
          ))}
          {room.amenities.length > 4 && (
            <span className="room-card__amenity room-card__amenity--more">+{room.amenities.length - 4}</span>
          )}
        </div>

        <div className="room-card__footer">
          <span className="room-card__price">{formatPrice(room.price)}</span>
          <span className="room-card__rating">
            <Star size={14} fill="var(--color-star)" stroke="var(--color-star)" />
            {room.rating.toFixed(1)}
            <span className="room-card__review-count">({room.reviewCount})</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

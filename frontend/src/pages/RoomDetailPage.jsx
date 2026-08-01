import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, Heart, Share2, MapPin, Maximize2,
  Building, Banknote, Phone, MessageCircle, Clock, Star, Shield,
  ChevronUp, Zap, Droplets, Wifi, X, Grid, Check, Info
} from 'lucide-react'
import { rooms, formatPrice, AMENITY_ICONS, AMENITY_LABELS, timeAgo } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import StarRating from '../components/review/StarRating'
import RatingBadge from '../components/review/RatingBadge'
import ReviewSection from '../components/review/ReviewSection'
import './RoomDetailPage.css'

export default function RoomDetailPage() {
  const { slug } = useParams()
  const room = rooms.find(r => r.slug === slug)
  const { user, triggerLogin, toggleFavorite, isFavorite } = useAuth()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [showPhone, setShowPhone] = useState(false)
  const [stickyVisible, setStickyVisible] = useState(false)
  const [quickMsgText, setQuickMsgText] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hỗ trợ đóng mở lightbox bằng phím tắt
  useEffect(() => {
    if (!lightboxOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      else if (e.key === 'ArrowLeft') setLightboxIndex(i => i === 0 ? room.images.length - 1 : i - 1)
      else if (e.key === 'ArrowRight') setLightboxIndex(i => i === room.images.length - 1 ? 0 : i + 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, room])

  if (!room) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Phòng không tồn tại</h2>
        <Link to="/" className="detail__back-link">← Về trang chủ</Link>
      </div>
    )
  }

  const isSaved = isFavorite(room.id)

  const handleQuickSend = () => {
    if (!user) {
      triggerLogin()
      return
    }
    if (!quickMsgText.trim()) return
    alert(`Đã gửi tin nhắn đến chủ trọ ${room.landlord.name}: "${quickMsgText}"`)
    setQuickMsgText('')
  }

  // Chuẩn bị danh sách bento gồm đúng 5 ảnh (lặp lại nếu thiếu) để đảm bảo layout bento luôn tròn trịa
  const bentoImages = [...room.images]
  while (bentoImages.length < 5) {
    bentoImages.push(bentoImages[bentoImages.length % room.images.length])
  }

  return (
    <div className="detail-page">
      {/* Sticky header when scrolled */}
      <div className={`detail-sticky ${stickyVisible ? 'detail-sticky--visible' : ''}`}>
        <div className="detail-sticky__inner container">
          <img src={room.thumbnails[0]} alt="" className="detail-sticky__thumb" />
          <div className="detail-sticky__info">
            <span className="detail-sticky__title">{room.title}</span>
            <span className="detail-sticky__price">{formatPrice(room.price)}</span>
          </div>
          <div className="detail-sticky__actions">
            <button 
              className={`detail-sticky__save-icon-btn ${isSaved ? 'detail-sticky__save-icon-btn--active' : ''}`}
              onClick={() => toggleFavorite(room.id)}
              aria-label="Lưu phòng"
            >
              <Heart size={16} fill={isSaved ? '#ef4444' : 'transparent'} stroke={isSaved ? '#ef4444' : 'currentColor'} />
            </button>
            <button className="detail-sticky__cta" onClick={() => setShowPhone(true)}>
              <Phone size={16} /> Liên hệ
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="detail__breadcrumb container">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <span>Phòng trọ</span>
        <span>/</span>
        <span className="detail__breadcrumb-current">{room.title}</span>
      </div>

      {/* Modern Bento Grid Gallery */}
      <div className="detail__bento-gallery container animate-fade-in">
        <div className="detail__bento-main" onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}>
          <img src={bentoImages[0]} alt={`${room.title} - Ảnh chính`} className="detail__bento-img" />
          <div className="detail__bento-overlay">
            <Maximize2 size={24} className="detail__bento-zoom-icon" />
          </div>
        </div>
        <div className="detail__bento-side">
          {bentoImages.slice(1, 5).map((img, idx) => (
            <div 
              key={idx} 
              className="detail__bento-sub" 
              onClick={() => { setLightboxIndex(idx + 1); setLightboxOpen(true); }}
            >
              <img src={img} alt={`${room.title} - Ảnh ${idx + 2}`} className="detail__bento-img" />
              <div className="detail__bento-overlay">
                <Maximize2 size={16} className="detail__bento-zoom-icon" />
              </div>
              {idx === 3 && room.images.length > 5 && (
                <div className="detail__bento-more">
                  <Grid size={18} />
                  <span>+{room.images.length - 5} ảnh</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Floating actions directly inside the gallery */}
        <div className="detail__bento-actions">
          <button className="detail__bento-action" aria-label="Chia sẻ"><Share2 size={18} /></button>
          <button 
            className={`detail__bento-action ${isSaved ? 'detail__bento-action--active' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleFavorite(room.id); }}
            aria-label="Lưu phòng"
          >
            <Heart size={18} fill={isSaved ? '#ef4444' : 'transparent'} stroke={isSaved ? '#ef4444' : 'currentColor'} />
          </button>
        </div>
        
        <button className="detail__bento-view-all" onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}>
          <Grid size={14} /> Xem tất cả {room.images.length} ảnh
        </button>
      </div>

      <div className="detail__layout container">
        {/* =================== LEFT COLUMN =================== */}
        <div className="detail__main">
          {/* Title + Price */}
          <div className="detail__title-section">
            <div className="detail__title-row">
              <h1 className="detail__title">{room.title}</h1>
              <button 
                className={`detail__save-btn ${isSaved ? 'detail__save-btn--active' : ''}`}
                onClick={() => toggleFavorite(room.id)}
              >
                <Heart size={18} fill={isSaved ? '#ef4444' : 'transparent'} stroke={isSaved ? '#ef4444' : 'currentColor'} />
                {isSaved ? 'Đã lưu' : 'Lưu tin'}
              </button>
            </div>
            
            <div className="detail__badge-row">
              <span className={`detail__status detail__status--${room.status}`}>
                {room.status === 'available' ? '🟢 Còn trống' : '🔴 Đã thuê'}
              </span>
              <span className="detail__verified-badge">
                <Check size={12} /> Tin đã duyệt
              </span>
            </div>

            <div className="detail__price-row">
              <span className="detail__price">{formatPrice(room.price)}</span>
              <span className="detail__area"><Maximize2 size={16} /> {room.area} m²</span>
            </div>
            <div className="detail__rating-row">
              <StarRating rating={room.rating} size={18} />
              <span className="detail__rating-value">{room.rating.toFixed(1)}</span>
              <span className="detail__rating-count">({room.reviewCount} đánh giá)</span>
              <RatingBadge rating={room.rating} />
            </div>
            <p className="detail__updated"><Clock size={14} /> Đăng {timeAgo(room.postedAt)} • Cập nhật {timeAgo(room.updatedAt)}</p>
          </div>

          {/* Address */}
          <div className="detail__section">
            <h2 className="detail__section-title">📍 Địa chỉ</h2>
            <p className="detail__address"><MapPin size={16} /> {room.address}</p>
          </div>

          {/* Specs */}
          <div className="detail__section">
            <h2 className="detail__section-title">📋 Thông tin chi tiết</h2>
            <div className="detail__specs">
              <div className="detail__spec">
                <Maximize2 size={18} className="detail__spec-icon" />
                <span className="detail__spec-label">Diện tích</span>
                <span className="detail__spec-value">{room.area} m²</span>
              </div>
              {room.floor && (
                <div className="detail__spec">
                  <Building size={18} className="detail__spec-icon" />
                  <span className="detail__spec-label">Tầng</span>
                  <span className="detail__spec-value">Tầng {room.floor}</span>
                </div>
              )}
              <div className="detail__spec">
                <Shield size={18} className="detail__spec-icon" />
                <span className="detail__spec-label">Tình trạng nội thất</span>
                <span className="detail__spec-value">{room.furniture}</span>
              </div>
              <div className="detail__spec">
                <Banknote size={18} className="detail__spec-icon" />
                <span className="detail__spec-label">Tiền đặt cọc</span>
                <span className="detail__spec-value">{room.deposit.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="detail__section">
            <h2 className="detail__section-title">✨ Tiện ích phòng trọ</h2>
            <div className="detail__amenities">
              {room.amenities.map(a => (
                <div key={a} className="detail__amenity">
                  <span className="detail__amenity-icon">{AMENITY_ICONS[a]}</span>
                  <span className="detail__amenity-label">{AMENITY_LABELS[a]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="detail__section">
            <h2 className="detail__section-title">📝 Mô tả chi tiết</h2>
            <div className="detail__description" dangerouslySetInnerHTML={{ __html: room.description }} />
          </div>

          {/* Reviews */}
          <ReviewSection reviews={room.reviews} rating={room.rating} reviewCount={room.reviewCount} />
        </div>

        {/* =================== RIGHT SIDEBAR (GLASSMORPHISM) =================== */}
        <aside className="detail__sidebar">
          <div className="detail__sidebar-card">
            {/* Redesigned Landlord Profile */}
            <div className="detail__landlord-profile">
              <div className="detail__landlord-header">
                <div className="detail__landlord-avatar-container">
                  <img src={room.landlord.avatar} alt={room.landlord.name} className="detail__landlord-avatar" />
                  <span className="detail__landlord-status-dot"></span>
                </div>
                <div className="detail__landlord-info">
                  <div className="detail__landlord-name-row">
                    <h3 className="detail__landlord-name">{room.landlord.name}</h3>
                    <span className="detail__landlord-verified" title="Chủ trọ uy tín đã xác thực">
                      <Shield size={11} fill="currentColor" /> Xác thực
                    </span>
                  </div>
                  <span className="detail__landlord-type">{room.landlord.type}</span>
                </div>
              </div>

              <div className="detail__landlord-divider"></div>

              <div className="detail__landlord-stats-grid">
                <div className="detail__landlord-stat">
                  <span className="detail__landlord-stat-icon">⚡</span>
                  <div className="detail__landlord-stat-data">
                    <span className="detail__landlord-stat-val">{room.landlord.responseRate}%</span>
                    <span className="detail__landlord-stat-lbl">Phản hồi</span>
                  </div>
                </div>
                <div className="detail__landlord-stat">
                  <span className="detail__landlord-stat-icon">📋</span>
                  <div className="detail__landlord-stat-data">
                    <span className="detail__landlord-stat-val">{room.landlord.listings}</span>
                    <span className="detail__landlord-stat-lbl">Tin đăng</span>
                  </div>
                </div>
                <div className="detail__landlord-stat">
                  <span className="detail__landlord-stat-icon">📅</span>
                  <div className="detail__landlord-stat-data">
                    <span className="detail__landlord-stat-val">{room.landlord.joinedYears} năm</span>
                    <span className="detail__landlord-stat-lbl">Tham gia</span>
                  </div>
                </div>
              </div>

              <div className="detail__landlord-activity">
                <Clock size={12} />
                <span>Hoạt động {room.landlord.activeAgo}</span>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="detail__cta-group">
              <button className="detail__cta-chat" onClick={!user ? () => triggerLogin() : undefined}>
                <MessageCircle size={18} /> Nhắn tin ngay
              </button>
              <button className="detail__cta-phone" onClick={() => setShowPhone(s => !s)}>
                <Phone size={18} /> {showPhone ? room.landlord.phone : 'Hiện số điện thoại'}
              </button>
            </div>

            {/* Quick Send Message Input */}
            <div className="detail__quick-msg">
              <input 
                type="text" 
                placeholder={user ? "Hỏi nhanh chủ nhà về phòng này..." : "Đăng nhập để gửi tin nhắn"} 
                className="detail__quick-input" 
                value={quickMsgText}
                onChange={(e) => setQuickMsgText(e.target.value)}
                onClick={!user ? () => triggerLogin() : undefined}
                readOnly={!user}
              />
              <button className="detail__quick-send" onClick={handleQuickSend}>Gửi</button>
            </div>

            {/* Styled Question Bubbles */}
            <div className="detail__quick-questions">
              <span className="detail__quick-questions-title"><Info size={12} /> Gợi ý câu hỏi nhanh:</span>
              <div className="detail__quick-q-list">
                <button 
                  className="detail__quick-q"
                  onClick={user ? () => setQuickMsgText("Có video thực tế phòng không ạ?") : () => triggerLogin()}
                >
                  🎥 Có video thực tế?
                </button>
                <button 
                  className="detail__quick-q"
                  onClick={user ? () => setQuickMsgText("Điện nước tính thế nào ạ?") : () => triggerLogin()}
                >
                  ⚡ Giá điện nước?
                </button>
                <button 
                  className="detail__quick-q"
                  onClick={user ? () => setQuickMsgText("Phòng có máy lạnh không ạ?") : () => triggerLogin()}
                >
                  ❄️ Có máy lạnh?
                </button>
                <button 
                  className="detail__quick-q"
                  onClick={user ? () => setQuickMsgText("Khi nào có thể qua xem phòng?") : () => triggerLogin()}
                >
                  🔑 Lịch xem phòng?
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Modern Lightbox Modal */}
      {lightboxOpen && (
        <div className="detail-lightbox" onClick={() => setLightboxOpen(false)}>
          <button className="detail-lightbox__close" onClick={() => setLightboxOpen(false)} aria-label="Đóng">
            <X size={26} />
          </button>
          
          <div className="detail-lightbox__counter">
            Ảnh {lightboxIndex + 1} / {room.images.length}
          </div>
          
          <div className="detail-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={room.images[lightboxIndex]} 
              alt={`${room.title} - Ảnh ${lightboxIndex + 1}`} 
              className="detail-lightbox__img animate-fade-in" 
              key={lightboxIndex}
            />
            
            <button 
              className="detail-lightbox__nav detail-lightbox__nav--prev" 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => i === 0 ? room.images.length - 1 : i - 1); }}
              aria-label="Ảnh trước"
            >
              <ChevronLeft size={30} />
            </button>
            
            <button 
              className="detail-lightbox__nav detail-lightbox__nav--next" 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => i === room.images.length - 1 ? 0 : i + 1); }}
              aria-label="Ảnh sau"
            >
              <ChevronRight size={30} />
            </button>
          </div>

          {/* Bottom Thumbnails List */}
          <div className="detail-lightbox__thumbs" onClick={(e) => e.stopPropagation()}>
            {room.images.map((img, idx) => (
              <button
                key={idx}
                className={`detail-lightbox__thumb ${idx === lightboxIndex ? 'detail-lightbox__thumb--active' : ''}`}
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Xem ảnh ${idx + 1}`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Back to top */}
      {stickyVisible && (
        <button className="detail__back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  )
}

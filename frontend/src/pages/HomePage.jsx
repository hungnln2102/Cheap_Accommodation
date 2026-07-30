import { useState, useMemo } from 'react'
import { Search, TrendingUp } from 'lucide-react'
import { rooms, PRICE_RANGES } from '../data/mockData'
import FilterBar from '../components/filter/FilterBar'
import RoomCard from '../components/room/RoomCard'
import './HomePage.css'

const TAGS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'new_post', label: 'Bài đăng mới' },
  { key: 'new_room', label: 'Phòng mới' },
  { key: 'cheap_room', label: 'Phòng giá rẻ' }
]

export default function HomePage() {
  const [filters, setFilters] = useState({ location: 'all', priceRange: 'all', category: 'all' })
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState('all')

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      // Ẩn phòng đã thuê khỏi danh sách chính trên trang chủ
      if (room.status === 'rented') return false

      // Location
      if (filters.location !== 'all' && room.location !== filters.location) return false

      // Price
      if (filters.priceRange !== 'all') {
        const range = PRICE_RANGES.find(p => p.key === filters.priceRange)
        if (range && (room.price < range.min || room.price >= range.max)) return false
      }

      // Category
      if (filters.category !== 'all' && room.category !== filters.category) return false

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return room.title.toLowerCase().includes(q) || room.address.toLowerCase().includes(q)
      }

      return true
    })
  }, [filters, searchQuery])

  const processedRooms = useMemo(() => {
    let list = [...filteredRooms]

    if (activeTag === 'new_post') {
      // Sắp xếp bài đăng mới nhất (postedAt desc)
      list.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
    } else if (activeTag === 'new_room') {
      // Sắp xếp phòng mới cập nhật (updatedAt desc)
      list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    } else if (activeTag === 'cheap_room') {
      // Sắp xếp phòng giá rẻ trước (price asc)
      list.sort((a, b) => a.price - b.price)
    }

    return list
  }, [filteredRooms, activeTag])

  const getListingTitle = () => {
    switch (activeTag) {
      case 'new_post':
        return 'Bài đăng mới nhất'
      case 'new_room':
        return 'Phòng mới cập nhật'
      case 'cheap_room':
        return 'Phòng trọ giá tốt nhất'
      default:
        return 'Phòng trọ mới nhất'
    }
  }

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__content container">
          <h1 className="hero__title animate-fade-in">
            Tìm phòng trọ <span className="hero__accent">giá tốt</span><br />ngay hôm nay
          </h1>
          <p className="hero__subtitle animate-fade-in" style={{ animationDelay: '100ms' }}>
            Hàng ngàn phòng trọ chất lượng, giá rẻ tại TP.HCM — đánh giá thực tế từ người thuê.
          </p>

          <div className="hero__search animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Search size={20} className="hero__search-icon" />
            <input
              type="text"
              className="hero__search-input"
              placeholder="Tìm theo tên, địa chỉ, khu vực..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="hero-search"
            />
          </div>

          <div className="hero__stats animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="hero__stat">
              <span className="hero__stat-number">{rooms.length}+</span>
              <span className="hero__stat-label">Phòng trọ</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">7</span>
              <span className="hero__stat-label">Quận/Huyện</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">4.5⭐</span>
              <span className="hero__stat-label">Đánh giá TB</span>
            </div>
          </div>
        </div>
      </section>

      {/* Listing */}
      <section className="listing container">
        {/* Lọc nằm ở đầu theo yêu cầu */}
        <FilterBar filters={filters} onChange={setFilters} />

        {/* Các hạng mục tags/chips lọc */}
        <div className="listing__tags animate-fade-in" style={{ animationDelay: '100ms' }}>
          {TAGS.map(tag => (
            <button
              key={tag.key}
              className={`listing__tag ${activeTag === tag.key ? 'listing__tag--active' : ''}`}
              onClick={() => setActiveTag(tag.key)}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Tiêu đề & kết quả nằm dưới bộ lọc */}
        <div className="listing__header">
          <h2 className="listing__title">
            <TrendingUp size={22} /> {getListingTitle()}
          </h2>
          <span className="listing__count">{processedRooms.length} kết quả</span>
        </div>

        <div className="listing__grid">
          {processedRooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>

        {processedRooms.length === 0 && (
          <div className="listing__empty">
            <span className="listing__empty-icon">🔍</span>
            <h3>Không tìm thấy phòng phù hợp</h3>
            <p>Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.</p>
          </div>
        )}
      </section>
    </div>
  )
}

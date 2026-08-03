import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Menu, X, Moon, Sun, Phone, Heart, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { rooms } from '../../data/mockData'
import './Header.css'

export default function Header() {
  const { user, favorites, logout, triggerLogin } = useAuth()
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    setDropdownOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    if (!dropdownOpen) return
    const handleOutsideClick = () => setDropdownOpen(false)
    window.addEventListener('click', handleOutsideClick)
    return () => window.removeEventListener('click', handleOutsideClick)
  }, [dropdownOpen])

  const toggleDark = () => {
    setDarkMode(prev => {
      document.documentElement.classList.toggle('dark', !prev)
      return !prev
    })
  }

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
  }

  // Lọc lấy danh sách các phòng đã lưu
  const favoriteRooms = rooms.filter(room => favorites.includes(room.id))

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">🏠</span>
          <span className="header__logo-text">Phòng Trọ <span className="header__logo-accent">Tốt</span></span>
        </Link>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <Link to="/" className={`header__link ${location.pathname === '/' ? 'header__link--active' : ''}`}>
            <Home size={16} /> Trang chủ
          </Link>
          <Link to="/" className="header__link">
            <Search size={16} /> Tìm phòng
          </Link>
          <a href="tel:0901234567" className="header__link">
            <Phone size={16} /> Liên hệ
          </a>
          <Link to="/admin" className={`header__link ${location.pathname.startsWith('/admin') ? 'header__link--active' : ''}`}>
            <LayoutDashboard size={16} /> Quản lý
          </Link>
        </nav>

        <div className="header__actions">
          <button className="header__theme-toggle" onClick={toggleDark} aria-label="Chuyển giao diện">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Khối tài khoản & đăng nhập */}
          {user ? (
            <div className="header__user" onClick={(e) => e.stopPropagation()}>
              <button 
                className="header__user-btn" 
                onClick={() => setDropdownOpen(o => !o)}
                aria-label="User menu"
              >
                <img src={user.avatar} alt={user.name} className="header__avatar" />
                <span className="header__username">{user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="header__dropdown animate-scale-up">
                  <div className="header__dropdown-user">
                    <span className="header__dropdown-name">{user.name}</span>
                    <span className="header__dropdown-email">{user.email}</span>
                  </div>

                  <div className="header__dropdown-section">
                    <div className="header__dropdown-title">
                      <Heart size={14} className="header__heart-icon" /> Phòng đã lưu ({favoriteRooms.length})
                    </div>
                    {favoriteRooms.length === 0 ? (
                      <p className="header__dropdown-empty">Chưa lưu phòng trọ nào.</p>
                    ) : (
                      <div className="header__dropdown-list">
                        {favoriteRooms.map(room => (
                          <Link
                            key={room.id}
                            to={`/phong/${room.slug}`}
                            className="header__dropdown-item"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <img src={room.images[0]} alt={room.title} className="header__dropdown-thumb" />
                            <div className="header__dropdown-info">
                              <div className="header__dropdown-title-row">
                                <span className="header__dropdown-item-title">{room.title}</span>
                                {room.status === 'rented' && <span className="header__dropdown-item-badge">Đã thuê</span>}
                              </div>
                              <span className="header__dropdown-item-price">
                                {(room.price / 1000000).toFixed(1)} triệu/tháng
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <button className="header__dropdown-logout" onClick={handleLogout}>
                    <LogOut size={14} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="header__login-btn" onClick={() => triggerLogin()}>
              Đăng nhập
            </button>
          )}

          <button className="header__menu-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  )
}

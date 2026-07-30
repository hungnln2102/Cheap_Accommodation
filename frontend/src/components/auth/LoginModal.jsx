import { useState, useEffect } from 'react'
import { X, Lock, User, KeyRound } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './LoginModal.css'

export default function LoginModal() {
  const { showLoginModal, setShowLoginModal, login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (showLoginModal) {
      setUsername('')
      setPassword('')
      setError('')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showLoginModal])

  // Lắng nghe phím Escape để đóng modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showLoginModal) {
        setShowLoginModal(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showLoginModal, setShowLoginModal])

  if (!showLoginModal) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim()) {
      setError('Vui lòng nhập tên đăng nhập hoặc email')
      return
    }
    if (!password) {
      setError('Vui lòng nhập mật khẩu')
      return
    }

    // Đăng nhập thành công (mọi password đều được chấp nhận cho mục đích demo)
    login(username, password)
  }

  const handleQuickLogin = (userNick) => {
    login(userNick, '123456')
  }

  return (
    <div className="login-overlay" onClick={() => setShowLoginModal(false)}>
      <div className="login-card animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <button 
          className="login-card__close" 
          onClick={() => setShowLoginModal(false)}
          aria-label="Đóng"
        >
          <X size={20} />
        </button>

        <div className="login-card__header">
          <div className="login-card__logo">🏠</div>
          <h2 className="login-card__title">Đăng nhập tài khoản</h2>
          <p className="login-card__subtitle">Đăng nhập để lưu tin yêu thích và viết đánh giá</p>
        </div>

        <form onSubmit={handleSubmit} className="login-card__form">
          {error && <div className="login-card__error">{error}</div>}

          <div className="login-card__field">
            <label className="login-card__label">Tên đăng nhập / Email</label>
            <div className="login-card__input-wrapper">
              <User size={18} className="login-card__input-icon" />
              <input 
                type="text" 
                className="login-card__input"
                placeholder="Nhập tên tài khoản..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="login-card__field">
            <label className="login-card__label">Mật khẩu</label>
            <div className="login-card__input-wrapper">
              <Lock size={18} className="login-card__input-icon" />
              <input 
                type="password" 
                className="login-card__input"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="login-card__submit-btn">
            Đăng nhập
          </button>
        </form>

        <div className="login-card__divider">
          <span>Hoặc đăng nhập nhanh bằng tài khoản thử nghiệm</span>
        </div>

        <div className="login-card__quick-actions">
          <button 
            type="button" 
            className="login-card__quick-btn"
            onClick={() => handleQuickLogin('Nguyen Hung')}
          >
            <KeyRound size={14} /> Nguyễn Hùng (Người thuê)
          </button>
          <button 
            type="button" 
            className="login-card__quick-btn"
            onClick={() => handleQuickLogin('ThyThy Quan HCM')}
          >
            <KeyRound size={14} /> ThyThy (Môi giới)
          </button>
        </div>
      </div>
    </div>
  )
}

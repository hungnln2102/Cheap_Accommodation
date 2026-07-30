import { useState, useEffect } from 'react'
import { Send } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import StarRating from './StarRating'
import './ReviewForm.css'

export default function ReviewForm({ onSubmit }) {
  const { user, triggerLogin } = useAuth()
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name)
    } else {
      setName('')
    }
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating || !name.trim() || !content.trim()) return

    onSubmit({
      id: Date.now(),
      user: name.trim(),
      avatar: user?.avatar || null,
      rating,
      content: content.trim(),
      date: new Date().toISOString().split('T')[0],
      replies: [],
    })
    setRating(0)
    setContent('')
  }

  return (
    <div className="review-form-container">
      <form className="review-form" onSubmit={handleSubmit}>
        <h4 className="review-form__title">Viết đánh giá của bạn</h4>
        
        <div className="review-form__rating">
          <span className="review-form__label">Đánh giá:</span>
          <StarRating rating={rating} interactive onChange={setRating} size={24} />
          {rating > 0 && <span className="review-form__rating-text">{rating}/5 sao</span>}
        </div>

        {user ? (
          <div className="review-form__user-info">
            <img src={user.avatar} alt="" className="review-form__user-avatar" />
            <span className="review-form__user-name">Đánh giá bằng tài khoản: <strong>{user.name}</strong></span>
          </div>
        ) : (
          <div className="review-form__field">
            <label className="review-form__label" htmlFor="reviewer-name">Tên của bạn</label>
            <input
              id="reviewer-name"
              type="text"
              className="review-form__input"
              placeholder="Nhập tên hiển thị..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled
            />
          </div>
        )}

        <div className="review-form__field">
          <label className="review-form__label" htmlFor="reviewer-content">Nội dung đánh giá</label>
          <textarea
            id="reviewer-content"
            className="review-form__textarea"
            placeholder="Chia sẻ trải nghiệm của bạn về phòng trọ này..."
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={!user}
          />
        </div>

        <button type="submit" className="review-form__submit" disabled={!user || !rating || !content.trim()}>
          <Send size={16} /> Gửi đánh giá
        </button>
      </form>

      {!user && (
        <div className="review-form__overlay" onClick={() => triggerLogin()}>
          <button type="button" className="review-form__overlay-btn">
            Đăng nhập để viết đánh giá
          </button>
        </div>
      )}
    </div>
  )
}

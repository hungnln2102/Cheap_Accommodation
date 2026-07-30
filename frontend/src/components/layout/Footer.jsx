import { Heart } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__grid">
          <div className="footer__col">
            <h3 className="footer__title">🏠 Phòng Trọ Tốt</h3>
            <p className="footer__desc">Nền tảng tìm phòng trọ giá rẻ, chất lượng tại Việt Nam. Đánh giá thực tế từ người thuê.</p>
          </div>
          <div className="footer__col">
            <h4 className="footer__subtitle">Liên kết</h4>
            <ul className="footer__links">
              <li><a href="/">Trang chủ</a></li>
              <li><a href="/">Tìm phòng</a></li>
              <li><a href="/">Đăng tin</a></li>
              <li><a href="/">Liên hệ</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__subtitle">Khu vực phổ biến</h4>
            <ul className="footer__links">
              <li><a href="/">Quận 1</a></li>
              <li><a href="/">Phú Nhuận</a></li>
              <li><a href="/">Bình Thạnh</a></li>
              <li><a href="/">Gò Vấp</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__subtitle">Liên hệ</h4>
            <ul className="footer__links">
              <li>📞 0901 234 567</li>
              <li>✉️ contact@phongtrotot.vn</li>
              <li>📍 TP. Hồ Chí Minh, Việt Nam</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2025 Phòng Trọ Tốt. Made with <Heart size={14} className="footer__heart" /> in Vietnam.</p>
        </div>
      </div>
    </footer>
  )
}

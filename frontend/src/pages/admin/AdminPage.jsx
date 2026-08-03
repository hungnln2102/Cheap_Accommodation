import { useMemo, useState } from 'react'
import {
  Activity,
  BarChart3,
  BedDouble,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Eye,
  Home,
  MapPin,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ToggleLeft,
  Trash2,
  Upload,
  Users,
} from 'lucide-react'
import { rooms as initialRooms, formatPrice } from '../../data/mockData'
import { useAuth } from '../../context/AuthContext'
import './AdminPage.css'

const trafficData = [
  { label: 'T2', views: 1240 },
  { label: 'T3', views: 1680 },
  { label: 'T4', views: 1420 },
  { label: 'T5', views: 2180 },
  { label: 'T6', views: 2540 },
  { label: 'T7', views: 3120 },
  { label: 'CN', views: 2860 },
]

const statusLabels = {
  available: 'Còn trống',
  rented: 'Đã thuê',
  maintenance: 'Bảo trì',
  hidden: 'Ẩn bài',
}

const statusOptions = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'available', label: 'Còn trống' },
  { value: 'rented', label: 'Đã thuê' },
  { value: 'maintenance', label: 'Bảo trì' },
  { value: 'hidden', label: 'Ẩn bài' },
]

function ProtectedAdmin({ children }) {
  const { user, triggerLogin } = useAuth()

  if (!user) {
    return (
      <section className="admin-auth container">
        <div className="admin-auth__card">
          <div className="admin-auth__icon"><ShieldCheck size={34} /></div>
          <span className="admin-auth__eyebrow">Private route</span>
          <h1>Đăng nhập để vào trang quản lý</h1>
          <p>
            Khu vực admin dùng để quản lý phòng trọ, theo dõi lượt truy cập và kiểm soát trạng thái bài đăng.
          </p>
          <button className="admin-auth__button" onClick={() => triggerLogin()}>
            Đăng nhập quản trị
          </button>
        </div>
      </section>
    )
  }

  return children
}

function StatCard({ icon: Icon, label, value, trend, tone = 'primary' }) {
  return (
    <article className={`admin-stat admin-stat--${tone}`}>
      <div className="admin-stat__icon"><Icon size={22} /></div>
      <div>
        <span className="admin-stat__label">{label}</span>
        <strong className="admin-stat__value">{value}</strong>
        <span className="admin-stat__trend">{trend}</span>
      </div>
    </article>
  )
}

function AdminPageContent() {
  const [managedRooms, setManagedRooms] = useState(initialRooms)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedRoomId, setSelectedRoomId] = useState(initialRooms[0]?.id ?? null)

  const stats = useMemo(() => {
    const totalRooms = managedRooms.length
    const availableRooms = managedRooms.filter(room => room.status === 'available').length
    const rentedRooms = managedRooms.filter(room => room.status === 'rented').length
    const totalReach = managedRooms.reduce((sum, room) => sum + room.reviewCount * 43 + Math.round(room.rating * 120), 0)
    const averageRent = Math.round(managedRooms.reduce((sum, room) => sum + room.price, 0) / Math.max(totalRooms, 1))

    return { totalRooms, availableRooms, rentedRooms, totalReach, averageRent }
  }, [managedRooms])

  const filteredRooms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return managedRooms.filter(room => {
      const matchesStatus = statusFilter === 'all' || room.status === statusFilter
      const matchesQuery = !normalizedQuery ||
        room.title.toLowerCase().includes(normalizedQuery) ||
        room.address.toLowerCase().includes(normalizedQuery)

      return matchesStatus && matchesQuery
    })
  }, [managedRooms, query, statusFilter])

  const selectedRoom = managedRooms.find(room => room.id === selectedRoomId) ?? managedRooms[0]
  const maxViews = Math.max(...trafficData.map(item => item.views))

  const toggleRoomStatus = (roomId) => {
    setManagedRooms(prev => prev.map(room => {
      if (room.id !== roomId) return room
      return { ...room, status: room.status === 'available' ? 'rented' : 'available' }
    }))
  }

  const hideRoom = (roomId) => {
    setManagedRooms(prev => prev.map(room => room.id === roomId ? { ...room, status: 'hidden' } : room))
  }

  return (
    <div className="admin-page">
      <section className="admin-hero">
        <div className="container admin-hero__inner">
          <div>
            <span className="admin-hero__eyebrow"><ShieldCheck size={16} /> Admin Dashboard</span>
            <h1>Trung tâm quản lý phòng trọ</h1>
            <p>Kiểm soát bài đăng, theo dõi phòng trống, traffic và người dùng online theo roadmap trong docs.</p>
          </div>
          <div className="admin-hero__actions">
            <button className="admin-button admin-button--ghost"><Settings size={17} /> Cài đặt</button>
            <button className="admin-button"><Plus size={17} /> Thêm phòng</button>
          </div>
        </div>
      </section>

      <section className="container admin-content">
        <div className="admin-stats">
          <StatCard icon={Building2} label="Tổng số phòng" value={stats.totalRooms} trend="Đang quản lý" />
          <StatCard icon={CheckCircle2} label="Phòng còn trống" value={stats.availableRooms} trend={`${stats.rentedRooms} phòng đã thuê`} tone="success" />
          <StatCard icon={Eye} label="Lượt reach" value={stats.totalReach.toLocaleString('vi-VN')} trend="Ước tính từ tương tác" tone="info" />
          <StatCard icon={CircleDollarSign} label="Giá thuê TB" value={formatPrice(stats.averageRent)} trend="Theo danh sách hiện tại" tone="warning" />
        </div>

        <div className="admin-grid">
          <article className="admin-panel admin-panel--traffic">
            <div className="admin-panel__header">
              <div>
                <span className="admin-panel__eyebrow"><BarChart3 size={15} /> Traffic Dashboard</span>
                <h2>Lượt truy cập 7 ngày</h2>
              </div>
              <span className="admin-live"><Activity size={14} /> {stats.availableRooms + 8} online</span>
            </div>
            <div className="admin-chart" aria-label="Biểu đồ lượt truy cập 7 ngày">
              {trafficData.map(item => (
                <div className="admin-chart__item" key={item.label}>
                  <div className="admin-chart__bar" style={{ height: `${Math.max((item.views / maxViews) * 100, 12)}%` }}>
                    <span>{item.views.toLocaleString('vi-VN')}</span>
                  </div>
                  <strong>{item.label}</strong>
                </div>
              ))}
            </div>
            <div className="admin-device-split">
              <span><Users size={15} /> Mobile 68%</span>
              <span><Home size={15} /> Desktop 32%</span>
            </div>
          </article>

          <article className="admin-panel admin-panel--editor">
            <div className="admin-panel__header">
              <div>
                <span className="admin-panel__eyebrow"><Pencil size={15} /> Form nhanh</span>
                <h2>{selectedRoom ? 'Chỉnh sửa phòng' : 'Chọn một phòng'}</h2>
              </div>
            </div>
            {selectedRoom && (
              <form className="admin-form">
                <label>
                  Tên phòng
                  <input value={selectedRoom.title} readOnly />
                </label>
                <div className="admin-form__row">
                  <label>
                    Giá thuê
                    <input value={selectedRoom.price.toLocaleString('vi-VN')} readOnly />
                  </label>
                  <label>
                    Diện tích
                    <input value={`${selectedRoom.area} m²`} readOnly />
                  </label>
                </div>
                <label>
                  Địa chỉ
                  <textarea value={selectedRoom.address} readOnly />
                </label>
                <div className="admin-upload-box">
                  <Upload size={20} />
                  <span>Khu vực upload ảnh sẽ kết nối API ở bước backend.</span>
                </div>
              </form>
            )}
          </article>
        </div>

        <article className="admin-panel admin-panel--rooms">
          <div className="admin-panel__header admin-panel__header--stacked">
            <div>
              <span className="admin-panel__eyebrow"><BedDouble size={15} /> Room Management</span>
              <h2>Danh sách phòng trọ</h2>
            </div>
            <div className="admin-toolbar">
              <div className="admin-search">
                <Search size={16} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tìm theo tên hoặc địa chỉ..."
                />
              </div>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Phòng</th>
                  <th>Khu vực</th>
                  <th>Giá thuê</th>
                  <th>Trạng thái</th>
                  <th>Đánh giá</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map(room => (
                  <tr key={room.id} className={selectedRoom?.id === room.id ? 'admin-table__row--active' : ''}>
                    <td>
                      <button className="admin-room" onClick={() => setSelectedRoomId(room.id)}>
                        <img src={room.thumbnails?.[0] ?? room.images[0]} alt={room.title} />
                        <span>
                          <strong>{room.title}</strong>
                          <small>{room.area} m² · Tầng {room.floor || '—'}</small>
                        </span>
                      </button>
                    </td>
                    <td><span className="admin-location"><MapPin size={14} /> {room.address}</span></td>
                    <td>{formatPrice(room.price)}</td>
                    <td><span className={`admin-status admin-status--${room.status}`}>{statusLabels[room.status] ?? room.status}</span></td>
                    <td>{room.rating} ⭐ · {room.reviewCount}</td>
                    <td>
                      <div className="admin-actions">
                        <button onClick={() => toggleRoomStatus(room.id)} title="Đổi trạng thái nhanh"><ToggleLeft size={17} /></button>
                        <button onClick={() => setSelectedRoomId(room.id)} title="Sửa phòng"><Pencil size={17} /></button>
                        <button onClick={() => hideRoom(room.id)} title="Ẩn bài"><Trash2 size={17} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedAdmin>
      <AdminPageContent />
    </ProtectedAdmin>
  )
}

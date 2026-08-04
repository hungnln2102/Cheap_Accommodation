import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BedDouble,
  Bell,
  Building2,
  CheckCircle2,
  Edit3,
  Eye,
  Trash2,
  Filter,
  FileText,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import { CATEGORIES, LOCATIONS, formatPrice, rooms as initialRooms } from '../../data/mockData'
import { useAuth } from '../../context/AuthContext'
import LoginModal from '../../components/auth/LoginModal'
import './AdminPage.css'

const trafficData = [
  { label: '28/07', views: 14, users: 8 },
  { label: '29/07', views: 20, users: 11 },
  { label: '30/07', views: 6, users: 5 },
  { label: '31/07', views: 24, users: 13 },
  { label: '01/08', views: 27, users: 9 },
  { label: '02/08', views: 6, users: 7 },
  { label: '03/08', views: 15, users: 8 },
  { label: '04/08', views: 4, users: 3 },
]

const occupancyData = [
  { label: 'T1', available: 6, rented: 1, revenue: 7800000 },
  { label: 'T2', available: 7, rented: 1, revenue: 8200000 },
  { label: 'T3', available: 6, rented: 2, revenue: 13200000 },
  { label: 'T4', available: 5, rented: 3, revenue: 19400000 },
  { label: 'T5', available: 4, rented: 4, revenue: 24800000 },
  { label: 'T6', available: 5, rented: 3, revenue: 20500000 },
  { label: 'T7', available: 6, rented: 2, revenue: 14600000 },
  { label: 'T8', available: 7, rented: 1, revenue: 7500000 },
]

const sourceData = [
  { label: 'Tìm kiếm', value: 42, color: '#60a5fa' },
  { label: 'Trực tiếp', value: 26, color: '#8b5cf6' },
  { label: 'Facebook', value: 18, color: '#ec4899' },
  { label: 'Zalo', value: 14, color: '#10b981' },
]

const navItems = [
  { key: 'overview', label: 'Tổng quan', icon: BarChart3 },
  { key: 'rooms', label: 'Phòng trọ', icon: BedDouble },
  { key: 'tenants', label: 'Khách thuê', icon: Users },
  { key: 'contracts', label: 'Hợp đồng', icon: FileText },
  { key: 'messages', label: 'Tin nhắn', icon: MessageSquare },
  { key: 'settings', label: 'Cài đặt', icon: Settings },
]


const getLookupLabel = (items, key) => items.find(item => item.key === key)?.label || key

const getRoomDisplayTitle = (room) => room.title || room.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

const getRoomReach = (room) => room.reviewCount * 43 + Math.round(room.rating * 120)

function ProtectedAdmin({ children }) {
  const { user, triggerLogin } = useAuth()

  if (!user) {
    return (
      <main className="admin-login-page">
        <section className="admin-login-card">
          <div className="admin-login-brand">
            <span>PT</span>
            <div>
              <strong>Phòng Trọ Tốt Admin</strong>
              <small>Private operations workspace</small>
            </div>
          </div>
          <div className="admin-login-icon"><ShieldCheck size={34} /></div>
          <p className="admin-kicker">Khu vực riêng tư</p>
          <h1>Đăng nhập để quản trị hệ thống</h1>
          <p className="admin-login-copy">Theo dõi các chỉ số phòng trọ, tỷ lệ lấp đầy và lưu lượng truy cập.</p>
          <button className="admin-primary-btn" onClick={() => triggerLogin()}>Đăng nhập quản trị</button>
        </section>
        <LoginModal />
      </main>
    )
  }

  return children
}

function MetricCard({ icon: Icon, label, value, note, accent = '#38bdf8', positive = true }) {
  const TrendIcon = positive ? ArrowUpRight : ArrowDownRight

  return (
    <article className="admin-metric-card">
      <div className="admin-metric-card__head">
        <p>{label}</p>
        <span style={{ '--metric-accent': accent }}><Icon size={20} /></span>
      </div>
      <strong>{value}</strong>
      <div className={'admin-metric-card__delta ' + (positive ? 'is-positive' : 'is-negative')}>
        <TrendIcon size={15} /> <b>{note}</b>
      </div>
    </article>
  )
}

function MultiLineChart({ data, series, yLabels }) {
  const width = 900
  const height = 320
  const padX = 52
  const padY = 34
  const values = data.flatMap(item => series.map(line => item[line.key]))
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = Math.max(max - min, 1)
  const xFor = (index) => padX + (index / Math.max(data.length - 1, 1)) * (width - padX * 2)
  const yFor = (value) => height - padY - ((value - min) / range) * (height - padY * 2)

  return (
    <svg className="admin-chart admin-chart--line" viewBox={'0 0 ' + width + ' ' + height} role="img" aria-label="Biểu đồ chỉ số theo thời gian">
      {[0, 0.25, 0.5, 0.75, 1].map(tick => {
        const y = padY + tick * (height - padY * 2)
        return <line key={tick} x1={padX} x2={width - padX} y1={y} y2={y} className="admin-chart__grid" />
      })}
      {data.map((item, index) => <line key={item.label} x1={xFor(index)} x2={xFor(index)} y1={padY} y2={height - padY} className="admin-chart__grid admin-chart__grid--vertical" />)}
      {yLabels.map((label, index) => <text key={label} x={18} y={padY + index * ((height - padY * 2) / Math.max(yLabels.length - 1, 1)) + 4}>{label}</text>)}
      {series.map(line => {
        const points = data.map((item, index) => xFor(index) + ',' + yFor(item[line.key])).join(' ')
        return <polyline key={line.key} points={points} fill="none" stroke={line.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      })}
      {series.flatMap(line => data.map((item, index) => <circle key={line.key + item.label} cx={xFor(index)} cy={yFor(item[line.key])} r="4" fill={line.color} />))}
      {data.map((item, index) => <text key={item.label} x={xFor(index)} y={height - 6} textAnchor="middle">{item.label}</text>)}
    </svg>
  )
}

function SourceDonut({ data }) {
  const radius = 44
  const circumference = 2 * Math.PI * radius
  let cumulative = 0

  return (
    <div className="admin-source-widget">
      <div className="admin-source-donut">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r={radius} className="admin-source-donut__track" />
          {data.map(item => {
            const dash = (item.value / 100) * circumference
            const gap = circumference - dash
            const offset = -cumulative * circumference / 100
            cumulative += item.value
            return <circle key={item.label} cx="60" cy="60" r={radius} stroke={item.color} strokeDasharray={dash + ' ' + gap} strokeDashoffset={offset} className="admin-source-donut__slice" />
          })}
        </svg>
        <div>
          <strong>100%</strong>
          <small>Nguồn</small>
        </div>
      </div>
      <div className="admin-source-list">
        {data.map(item => <span key={item.label}><i style={{ background: item.color }} /> {item.label} <b>{item.value}%</b></span>)}
      </div>
    </div>
  )
}


function RoomsPage({ rooms }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedRoom, setSelectedRoom] = useState(null)

  const roomStats = useMemo(() => {
    const available = rooms.filter(room => room.status === 'available').length
    const rented = rooms.filter(room => room.status === 'rented').length
    const avgArea = Math.round(rooms.reduce((sum, room) => sum + room.area, 0) / Math.max(rooms.length, 1))
    const totalReach = rooms.reduce((sum, room) => sum + getRoomReach(room), 0)

    return { available, rented, avgArea, totalReach }
  }, [rooms])

  const filteredRooms = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return rooms.filter(room => {
      if (statusFilter !== 'all' && room.status !== statusFilter) return false
      if (!normalizedQuery) return true

      return [room.title, room.address, room.slug, room.landlord?.name]
        .filter(Boolean)
        .some(value => value.toLowerCase().includes(normalizedQuery))
    })
  }, [rooms, searchQuery, statusFilter])

  return (
    <main className="admin-dashboard">
      <section className="admin-overview-hero admin-overview-hero--rooms">
        <div>
          <p className="admin-kicker"><BedDouble size={14} /> Quản lý phòng trọ</p>
          <h2>Danh sách phòng đang đăng trên hệ thống</h2>
        </div>
        <div className="admin-overview-hero__meta">
          <span>{roomStats.available} còn trống</span>
          <span>{roomStats.rented} đã thuê</span>
        </div>
      </section>

      <section className="admin-metrics-shell admin-metrics-shell--rooms">
        <MetricCard icon={Building2} label="Tổng phòng" value={rooms.length} note={roomStats.available + ' còn trống'} accent="#38bdf8" positive />
        <MetricCard icon={CheckCircle2} label="Đã thuê" value={roomStats.rented} note="Không hiện ngoài trang chủ" accent="#22c55e" positive />
        <MetricCard icon={BedDouble} label="Diện tích TB" value={roomStats.avgArea + 'm²'} note="Theo dữ liệu phòng" accent="#8b5cf6" positive />
        <MetricCard icon={Eye} label="Reach ước tính" value={roomStats.totalReach.toLocaleString('vi-VN')} note="Từ đánh giá & tương tác" accent="#60a5fa" positive />
      </section>

      <section className="admin-card admin-room-directory">
        <div className="admin-card-heading admin-card-heading--with-actions">
          <div>
            <p className="admin-kicker">Danh sách phòng</p>
            <h3>{filteredRooms.length} phòng phù hợp</h3>
          </div>
          <div className="admin-room-tools">
            <label className="admin-room-search"><Search size={16} /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Tìm phòng, địa chỉ, chủ nhà..." /></label>
            <label className="admin-room-filter"><Filter size={16} /><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">Tất cả trạng thái</option><option value="available">Còn trống</option><option value="rented">Đã thuê</option></select></label>
          </div>
        </div>

        <div className="admin-room-table-wrap">
          <table className="admin-room-table">
            <thead>
              <tr>
                <th>Phòng trọ</th>
                <th>Khu vực</th>
                <th>Giá</th>
                <th>Diện tích</th>
                <th>Trạng thái</th>
                <th>Reach</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map(room => (
                <tr key={room.id}>
                  <td>
                    <div className="admin-room-table__title">
                      <img src={room.images[0]} alt={getRoomDisplayTitle(room)} />
                      <div>
                        <strong>{getRoomDisplayTitle(room)}</strong>
                        <span>{getLookupLabel(CATEGORIES, room.category)} · {room.landlord?.name}</span>
                      </div>
                    </div>
                  </td>
                  <td>{getLookupLabel(LOCATIONS, room.location)}</td>
                  <td>{formatPrice(room.price)}</td>
                  <td>{room.area}m²</td>
                  <td><span className={'admin-room-status-pill admin-room-status-pill--' + room.status}>{room.status === 'rented' ? 'Đã thuê' : 'Còn trống'}</span></td>
                  <td>{getRoomReach(room).toLocaleString('vi-VN')}</td>
                  <td>
                    <div className="admin-room-actions">
                      <button onClick={() => setSelectedRoom(room)}><Eye size={15} /> View</button>
                      <button><Edit3 size={15} /> Sửa</button>
                      <button className="is-danger"><Trash2 size={15} /> Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selectedRoom && (
        <div className="admin-preview-backdrop" role="presentation" onClick={() => setSelectedRoom(null)}>
          <section className="admin-preview-modal" role="dialog" aria-modal="true" aria-label="Xem trước thông tin phòng" onClick={(event) => event.stopPropagation()}>
            <div className="admin-preview-modal__header">
              <div>
                <p className="admin-kicker">Xem trước phòng trọ</p>
                <h3>{getRoomDisplayTitle(selectedRoom)}</h3>
              </div>
              <button onClick={() => setSelectedRoom(null)} aria-label="Đóng xem trước"><X size={20} /></button>
            </div>

            <div className="admin-preview-form">
              <img src={selectedRoom.images[0]} alt={getRoomDisplayTitle(selectedRoom)} className="admin-preview-form__image" />
              <label>Tên phòng<input readOnly value={getRoomDisplayTitle(selectedRoom)} /></label>
              <label>Địa chỉ<input readOnly value={selectedRoom.address} /></label>
              <label>Loại phòng<input readOnly value={getLookupLabel(CATEGORIES, selectedRoom.category)} /></label>
              <label>Khu vực<input readOnly value={getLookupLabel(LOCATIONS, selectedRoom.location)} /></label>
              <label>Giá thuê<input readOnly value={formatPrice(selectedRoom.price)} /></label>
              <label>Diện tích<input readOnly value={selectedRoom.area + 'm²'} /></label>
              <label>Trạng thái<input readOnly value={selectedRoom.status === 'rented' ? 'Đã thuê' : 'Còn trống'} /></label>
              <label>Chủ nhà<input readOnly value={selectedRoom.landlord?.name || 'Chưa có'} /></label>
              <label>Đánh giá<input readOnly value={selectedRoom.rating.toFixed(1) + '/5 · ' + selectedRoom.reviewCount + ' đánh giá'} /></label>
              <label>Reach ước tính<input readOnly value={getRoomReach(selectedRoom).toLocaleString('vi-VN')} /></label>
            </div>

            <div className="admin-preview-modal__footer">
              <button onClick={() => setSelectedRoom(null)}>Đóng</button>
              <button><Edit3 size={16} /> Chỉnh sửa</button>
              <button className="is-danger"><Trash2 size={16} /> Xóa</button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

function AdminDashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const rooms = initialRooms

  const stats = useMemo(() => {
    const totalRooms = rooms.length
    const rentedRooms = rooms.filter(room => room.status === 'rented').length
    const availableRooms = totalRooms - rentedRooms
    const fillRate = Math.round((rentedRooms / Math.max(totalRooms, 1)) * 100)
    const views = trafficData.reduce((sum, item) => sum + item.views, 0)
    const users = trafficData.reduce((sum, item) => sum + item.users, 0)

    return { totalRooms, rentedRooms, availableRooms, fillRate, views, users }
  }, [rooms])

  return (
    <div className="admin-app">
      <aside className={sidebarOpen ? 'admin-aside admin-aside--open' : 'admin-aside'}>
        <div className="admin-logo"><span>PT</span><div><strong>Phòng Trọ Tốt</strong><small>Admin Console</small></div></div>
        <nav className="admin-menu" aria-label="Điều hướng admin">
          {navItems.map(item => {
            const Icon = item.icon
            return <button key={item.key} className={activeSection === item.key ? 'is-active' : ''} onClick={() => setActiveSection(item.key)}><Icon size={18} /> {item.label}</button>
          })}
        </nav>
        <div className="admin-aside-card"><Sparkles size={18} /><span>Tổng quan chỉ hiển thị KPI và xu hướng vận hành.</span></div>
      </aside>

      <section className="admin-panel">
        <header className="admin-header">
          <button className="admin-mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Mở menu"><Menu size={20} /></button>
          <div>
            <p className="admin-kicker">Dashboard</p>
            <h1>{activeSection === 'rooms' ? 'Thông tin phòng trọ' : 'Tổng quan phòng trọ'}</h1>
          </div>
          <div className="admin-header-actions">
            <label className="admin-search"><Search size={16} /><input placeholder="Tìm chỉ số, phòng, khách thuê..." /></label>
            <button className="admin-header-icon" aria-label="Thông báo"><Bell size={18} /></button>
            <div className="admin-profile"><img src={user.avatar} alt={user.name} /><span>{user.name}</span></div>
            <button className="admin-logout" onClick={logout}><LogOut size={16} /> Đăng xuất</button>
          </div>
        </header>

        {activeSection === 'rooms' ? <RoomsPage rooms={rooms} /> : (
        <main className="admin-dashboard">
          <section className="admin-overview-hero">
            <div>
              <p className="admin-kicker"><Activity size={14} /> Chỉ số vận hành</p>
              <h2>Theo dõi nhanh tình trạng phòng và hiệu quả truy cập</h2>
            </div>
            <div className="admin-overview-hero__meta">
              <span>{stats.availableRooms} phòng trống</span>
              <span>{stats.fillRate}% lấp đầy</span>
            </div>
          </section>

          <section className="admin-metrics-shell">
            <MetricCard icon={Building2} label="Tổng phòng" value={stats.totalRooms} note={stats.availableRooms + ' còn trống'} accent="#38bdf8" positive />
            <MetricCard icon={CheckCircle2} label="Đã thuê" value={stats.rentedRooms} note={stats.fillRate + '% lấp đầy'} accent="#22c55e" positive />
            <MetricCard icon={Eye} label="Lượt xem" value={stats.views} note={stats.users + ' khách truy cập'} accent="#60a5fa" positive />
          </section>

          <section className="admin-main-grid">
            <article className="admin-card admin-card--wide">
              <div className="admin-card-heading">
                <div>
                  <p className="admin-kicker">Tỷ lệ phòng theo tháng</p>
                  <h3>Phòng trống và phòng đã thuê</h3>
                </div>
              </div>
              <div className="admin-legend">
                <span style={{ '--legend-color': '#60a5fa' }}>Phòng trống</span>
                <span style={{ '--legend-color': '#10b981' }}>Đã thuê</span>
              </div>
              <MultiLineChart
                data={occupancyData}
                yLabels={['8', '6', '4', '2', '0']}
                series={[{ key: 'available', color: '#60a5fa' }, { key: 'rented', color: '#10b981' }]}
              />
            </article>

            <article className="admin-card admin-card--source">
              <div className="admin-card-heading"><div><p className="admin-kicker">Nguồn truy cập</p><h3>Kênh đưa khách vào website</h3></div></div>
              <SourceDonut data={sourceData} />
            </article>
          </section>

          <section className="admin-card admin-card--wide">
            <div className="admin-card-heading"><div><p className="admin-kicker">Lưu lượng truy cập</p><h3>Views và khách truy cập</h3></div></div>
            <div className="admin-legend">
              <span style={{ '--legend-color': '#8b5cf6' }}>Lượt xem</span>
              <span style={{ '--legend-color': '#3b82f6' }}>Khách truy cập</span>
            </div>
            <MultiLineChart
              data={trafficData}
              yLabels={['28', '21', '14', '7', '0']}
              series={[{ key: 'views', color: '#8b5cf6' }, { key: 'users', color: '#3b82f6' }]}
            />
          </section>
        </main>
        )}
      </section>

      {sidebarOpen && <button className="admin-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Đóng menu"><X size={18} /></button>}
    </div>
  )
}

export default function AdminPage() {
  return <ProtectedAdmin><AdminDashboard /></ProtectedAdmin>
}

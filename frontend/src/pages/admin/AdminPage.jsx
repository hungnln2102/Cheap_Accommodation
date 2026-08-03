import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BedDouble,
  Bell,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Eye,
  FileText,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  X,
} from 'lucide-react'
import { rooms as initialRooms } from '../../data/mockData'
import { useAuth } from '../../context/AuthContext'
import LoginModal from '../../components/auth/LoginModal'
import './AdminPage.css'

const trafficData = [
  { day: 'T2', reach: 1240, users: 318, ccu: 14, source: 'Organic', conversion: 3.2 },
  { day: 'T3', reach: 1680, users: 426, ccu: 19, source: 'Direct', conversion: 3.8 },
  { day: 'T4', reach: 1420, users: 351, ccu: 16, source: 'Facebook', conversion: 2.9 },
  { day: 'T5', reach: 2180, users: 512, ccu: 28, source: 'Organic', conversion: 4.4 },
  { day: 'T6', reach: 2540, users: 640, ccu: 31, source: 'Google Ads', conversion: 4.9 },
  { day: 'T7', reach: 3120, users: 784, ccu: 42, source: 'Direct', conversion: 5.1 },
  { day: 'CN', reach: 2860, users: 701, ccu: 37, source: 'Organic', conversion: 4.7 },
]

const sourceData = [
  { label: 'Organic', value: 42, color: '#0f766e' },
  { label: 'Direct', value: 28, color: '#2563eb' },
  { label: 'Facebook', value: 18, color: '#7c3aed' },
  { label: 'Google Ads', value: 12, color: '#d97706' },
]

const navItems = [
  { label: 'Tổng quan', icon: BarChart3, active: true },
  { label: 'Phòng trọ', icon: BedDouble },
  { label: 'Khách thuê', icon: Users },
  { label: 'Hợp đồng', icon: FileText },
  { label: 'Tin nhắn', icon: MessageSquare },
  { label: 'Cài đặt', icon: Settings },
]

function ProtectedAdmin({ children }) {
  const { user, triggerLogin } = useAuth()

  if (!user) {
    return (
      <main className="admin-login-page">
        <section className="admin-login-card">
          <div className="admin-login-brand">
            <span>247</span>
            <div>
              <strong>TimTro247 Admin</strong>
              <small>Private operations workspace</small>
            </div>
          </div>
          <div className="admin-login-icon"><ShieldCheck size={34} /></div>
          <p className="admin-kicker">Khu vực riêng tư</p>
          <h1>Đăng nhập để quản trị hệ thống</h1>
          <p className="admin-login-copy">Dashboard này tách biệt khỏi website public, dành cho đội vận hành theo dõi phòng, traffic, user mới và CCU.</p>
          <button className="admin-primary-btn" onClick={() => triggerLogin()}>Đăng nhập quản trị</button>
        </section>
        <LoginModal />
      </main>
    )
  }

  return children
}

function MiniSparkline({ data, color = '#0f766e' }) {
  const width = 128
  const height = 42
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = Math.max(max - min, 1)
  const points = data.map((value, index) => {
    const x = (index / Math.max(data.length - 1, 1)) * width
    const y = height - ((value - min) / range) * (height - 8) - 4
    return x + ',' + y
  }).join(' ')

  return (
    <svg className="admin-sparkline" viewBox={'0 0 ' + width + ' ' + height} aria-hidden="true">
      <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Donut({ value, color = '#0f766e' }) {
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const safeValue = Math.min(Math.max(value, 0), 100)
  const offset = circumference - (safeValue / 100) * circumference

  return (
    <div className="admin-small-donut">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} className="admin-small-donut__track" />
        <circle cx="50" cy="50" r={radius} className="admin-small-donut__value" stroke={color} strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <strong>{safeValue}%</strong>
    </div>
  )
}

function LineChart({ data }) {
  const width = 820
  const height = 300
  const padX = 44
  const padY = 34
  const max = Math.max(...data.map(item => item.reach))
  const min = Math.min(...data.map(item => item.reach))
  const range = Math.max(max - min, 1)
  const points = data.map((item, index) => {
    const x = padX + (index / Math.max(data.length - 1, 1)) * (width - padX * 2)
    const y = height - padY - ((item.reach - min) / range) * (height - padY * 2)
    return { ...item, x, y }
  })
  const line = points.map((point, index) => (index === 0 ? 'M ' : 'L ') + point.x + ' ' + point.y).join(' ')
  const area = line + ' L ' + points[points.length - 1].x + ' ' + (height - padY) + ' L ' + points[0].x + ' ' + (height - padY) + ' Z'

  return (
    <svg className="admin-line" viewBox={'0 0 ' + width + ' ' + height} role="img" aria-label="Biểu đồ reach theo ngày">
      <path d={area} className="admin-line__area" />
      <path d={line} className="admin-line__path" />
      {points.map(point => (
        <g key={point.day}>
          <circle cx={point.x} cy={point.y} r="5" className="admin-line__dot" />
          <text x={point.x} y={height - 8} textAnchor="middle">{point.day}</text>
        </g>
      ))}
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
          <small>Traffic</small>
        </div>
      </div>
      <div className="admin-source-list">
        {data.map(item => (
          <span key={item.label}><i style={{ background: item.color }} /> {item.label} <b>{item.value}%</b></span>
        ))}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, note, color = '#0f766e', type = 'line', percent = 72, series = [] }) {
  return (
    <article className="admin-stat-card">
      <div className="admin-stat-card__top">
        <span className="admin-stat-card__icon" style={{ color }}><Icon size={20} /></span>
        <span className="admin-stat-card__trend"><ArrowUpRight size={14} /> 12.4%</span>
      </div>
      <div className="admin-stat-card__body">
        <p>{label}</p>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
      <div className="admin-stat-card__chart">
        {type === 'donut' ? <Donut value={percent} color={color} /> : <MiniSparkline data={series.length ? series : [12, 16, 14, 22, 19, 28, 25]} color={color} />}
      </div>
    </article>
  )
}

function AdminDashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const rooms = initialRooms

  const stats = useMemo(() => {
    const totalRooms = rooms.length
    const rentedRooms = rooms.filter(room => room.status === 'rented').length
    const newRooms = rooms.filter(room => {
      const updatedAt = new Date(room.updatedAt || room.postedAt)
      return (Date.now() - updatedAt.getTime()) / (1000 * 60 * 60 * 24) <= 30
    }).length
    const reach = rooms.reduce((sum, room) => sum + room.reviewCount * 43 + Math.round(room.rating * 120), 0)
    const newUsers = trafficData.reduce((sum, item) => sum + item.users, 0)
    const ccu = trafficData[trafficData.length - 1].ccu
    const rentedRate = Math.round((rentedRooms / Math.max(totalRooms, 1)) * 100)

    return { totalRooms, rentedRooms, newRooms, reach, newUsers, ccu, rentedRate }
  }, [rooms])

  return (
    <div className="admin-app">
      <aside className={sidebarOpen ? 'admin-aside admin-aside--open' : 'admin-aside'}>
        <div className="admin-logo"><span>247</span><div><strong>TimTro247</strong><small>Admin Console</small></div></div>
        <nav className="admin-menu">
          {navItems.map(item => {
            const Icon = item.icon
            return <button key={item.label} className={item.active ? 'is-active' : ''}><Icon size={18} /> {item.label}</button>
          })}
        </nav>
        <div className="admin-aside-card"><Sparkles size={18} /><span>Private dashboard cho đội vận hành.</span></div>
      </aside>

      <section className="admin-panel">
        <header className="admin-header">
          <button className="admin-mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Mở menu"><Menu size={20} /></button>
          <div>
            <p className="admin-kicker">Dashboard</p>
            <h1>Tổng quan vận hành</h1>
          </div>
          <div className="admin-header-actions">
            <label className="admin-search"><Search size={16} /><input placeholder="Tìm phòng, khách thuê..." /></label>
            <button className="admin-header-icon"><Bell size={18} /></button>
            <div className="admin-profile"><img src={user.avatar} alt={user.name} /><span>{user.name}</span></div>
            <button className="admin-logout" onClick={logout}><LogOut size={16} /> Đăng xuất</button>
          </div>
        </header>

        <main className="admin-dashboard">
          <section className="admin-hero-card">
            <div>
              <p className="admin-kicker"><Activity size={14} /> Live operations</p>
              <h2>Dashboard tổng quan</h2>
              <p>Toàn bộ số liệu chính cho phòng, reach, user mới và CCU được gom về một màn hình theo chuẩn private admin.</p>
            </div>
          </section>

          <section className="admin-stat-grid">
            <StatCard icon={Building2} label="Tổng phòng" value={stats.totalRooms} note="Tất cả phòng" type="donut" percent={100} />
            <StatCard icon={CheckCircle2} label="Phòng đã thuê" value={stats.rentedRooms} note="Tỷ lệ đã thuê" color="#10b981" type="donut" percent={stats.rentedRate} />
            <StatCard icon={BedDouble} label="Phòng mới" value={stats.newRooms} note="Trong 30 ngày" color="#2563eb" series={[1, 2, 2, 3, 4, 4, stats.newRooms]} />
            <StatCard icon={Eye} label="Lượt reach" value={stats.reach.toLocaleString('vi-VN')} note="Tổng tương tác" color="#d97706" series={trafficData.map(item => item.reach)} />
            <StatCard icon={Users} label="User mới" value={stats.newUsers.toLocaleString('vi-VN')} note="7 ngày gần nhất" color="#7c3aed" series={trafficData.map(item => item.users)} />
            <StatCard icon={Activity} label="CCU" value={stats.ccu} note="Đang online" color="#0f766e" series={trafficData.map(item => item.ccu)} />
          </section>

          <section className="admin-analytics-layout">
            <article className="admin-card admin-card--line">
              <div className="admin-card-heading"><div><p className="admin-kicker">Reach trend</p><h3>Biểu đồ lượt reach</h3></div><strong>{stats.reach.toLocaleString('vi-VN')}</strong></div>
              <LineChart data={trafficData} />
            </article>
            <article className="admin-card admin-card--source">
              <div className="admin-card-heading"><div><p className="admin-kicker">Source mix</p><h3>Nguồn traffic</h3></div></div>
              <SourceDonut data={sourceData} />
            </article>
          </section>

          <section className="admin-card admin-card--table">
            <div className="admin-card-heading"><div><p className="admin-kicker">Traffic table</p><h3>Bảng Traffic</h3></div><span className="admin-live"><Activity size={14} /> {stats.ccu} CCU</span></div>
            <div className="admin-table-scroll">
              <table className="admin-traffic-table">
                <thead><tr><th>Ngày</th><th>Lượt reach</th><th>User mới</th><th>CCU cao nhất</th><th>Nguồn chính</th><th>Conversion</th></tr></thead>
                <tbody>
                  {trafficData.map(item => <tr key={item.day}><td>{item.day}</td><td>{item.reach.toLocaleString('vi-VN')}</td><td>{item.users.toLocaleString('vi-VN')}</td><td>{item.ccu}</td><td>{item.source}</td><td>{item.conversion}%</td></tr>)}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </section>

      {sidebarOpen && <button className="admin-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Đóng menu"><X size={18} /></button>}
    </div>
  )
}

export default function AdminPage() {
  return <ProtectedAdmin><AdminDashboard /></ProtectedAdmin>
}

import { MapPin, DollarSign, Tag, X } from 'lucide-react'
import { LOCATIONS, PRICE_RANGES, CATEGORIES } from '../../data/mockData'
import './FilterBar.css'

export default function FilterBar({ filters, onChange }) {
  const update = (key, value) => onChange({ ...filters, [key]: value })
  const activeCount = Object.values(filters).filter(v => v !== 'all').length

  return (
    <div className="filter-bar">
      <div className="filter-bar__selects">
        <div className="filter-bar__group">
          <MapPin size={16} className="filter-bar__icon" />
          <select
            value={filters.location}
            onChange={(e) => update('location', e.target.value)}
            className="filter-bar__select"
            id="filter-location"
          >
            {LOCATIONS.map(l => <option key={l.key} value={l.key}>{l.label}</option>)}
          </select>
        </div>

        <div className="filter-bar__group">
          <DollarSign size={16} className="filter-bar__icon" />
          <select
            value={filters.priceRange}
            onChange={(e) => update('priceRange', e.target.value)}
            className="filter-bar__select"
            id="filter-price"
          >
            {PRICE_RANGES.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
        </div>

        <div className="filter-bar__group">
          <Tag size={16} className="filter-bar__icon" />
          <select
            value={filters.category}
            onChange={(e) => update('category', e.target.value)}
            className="filter-bar__select"
            id="filter-category"
          >
            {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
        </div>
      </div>

      {activeCount > 0 && (
        <button
          className="filter-bar__clear"
          onClick={() => onChange({ location: 'all', priceRange: 'all', category: 'all' })}
        >
          <X size={14} /> Xóa bộ lọc ({activeCount})
        </button>
      )}
    </div>
  )
}

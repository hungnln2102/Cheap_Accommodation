---
name: UI/UX Design System — Cheap Accommodation
description: >
  Skill thiết kế UI/UX chuẩn cho dự án Cheap_Accommodation. Cung cấp hệ thống
  design tokens, color palette, typography, component patterns, animation guidelines
  và quy tắc bắt buộc để tạo giao diện đẹp, hiện đại và nhất quán.
  Dùng khi tạo mới component, trang, hay review UI hiện có.
---

# UI/UX Design System — Cheap Accommodation

## 🎯 Design Philosophy

Giao diện của Cheap_Accommodation phải truyền đạt được 3 giá trị cốt lõi:

1. **Trust** — Người thuê phòng phải tin tưởng ngay từ cái nhìn đầu tiên
2. **Clarity** — Thông tin phòng, giá, hợp đồng phải rõ ràng, không gây nhầm lẫn
3. **Warmth** — Cảm giác "như ở nhà", không lạnh lẽo như corporate SaaS

> **Trường phái thiết kế:** Modern Minimal với điểm nhấn warm gradient — tránh flat design thuần túy (nhạt nhẽo) và tránh skeuomorphism (lỗi thời).

---

## 🎨 Color System

### Primary Palette

```css
/* Brand Colors — Warm Teal / Emerald */
--color-primary-50:  #f0fdf9;
--color-primary-100: #ccfbef;
--color-primary-200: #99f6e0;
--color-primary-300: #5eead4;
--color-primary-400: #2dd4bf;
--color-primary-500: #14b8a6;   /* Primary action */
--color-primary-600: #0d9488;   /* Primary hover */
--color-primary-700: #0f766e;   /* Primary active */
--color-primary-800: #115e59;
--color-primary-900: #134e4a;

/* Accent — Warm Amber (giá, nổi bật) */
--color-accent-400:  #fbbf24;
--color-accent-500:  #f59e0b;   /* Badges, highlights */
--color-accent-600:  #d97706;

/* Semantic */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error:   #ef4444;
--color-info:    #3b82f6;
```

### Neutral Palette (Warm Gray — không dùng pure gray)

```css
--color-gray-50:  #fafaf9;    /* Background sáng */
--color-gray-100: #f5f5f4;    /* Surface */
--color-gray-200: #e7e5e4;    /* Border nhẹ */
--color-gray-300: #d6d3d1;    /* Border */
--color-gray-400: #a8a29e;    /* Placeholder text */
--color-gray-500: #78716c;    /* Muted text */
--color-gray-600: #57534e;    /* Body text phụ */
--color-gray-700: #44403c;    /* Body text chính */
--color-gray-800: #292524;    /* Heading */
--color-gray-900: #1c1917;    /* Dark background */
--color-gray-950: #0c0a09;    /* Darkest */
```

### Dark Mode Surface System

```css
/* Dark mode layers (elevation-based, không dùng opacity hack) */
--surface-base:    #0f1117;   /* Nền tổng */
--surface-raised:  #1a1d27;   /* Cards */
--surface-overlay: #22253a;   /* Modals, dropdowns */
--surface-sunken:  #090c14;   /* Input backgrounds */
```

### Gradient Presets

```css
/* Hero gradient */
--gradient-hero: linear-gradient(135deg, #0f766e 0%, #0ea5e9 50%, #8b5cf6 100%);

/* Card shimmer */
--gradient-card: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%);

/* CTA button */
--gradient-cta: linear-gradient(90deg, #14b8a6 0%, #0ea5e9 100%);

/* Price badge */
--gradient-price: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
```

---

## 📝 Typography

### Font Stack

```css
/* Primary — Inter (UI text) */
--font-sans: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;

/* Display — Sử dụng cho hero heading, marketing */
--font-display: 'Cal Sans', 'Playfair Display', serif;

/* Mono — code, số phòng, giá */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

**Import Google Fonts:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Type Scale (Mobile-first)

```css
/* Fluid typography — tự scale theo viewport */
--text-xs:   clamp(0.694rem, 0.7vw + 0.5rem, 0.75rem);
--text-sm:   clamp(0.833rem, 0.8vw + 0.6rem, 0.875rem);
--text-base: clamp(1rem,     1vw + 0.75rem,  1rem);
--text-lg:   clamp(1.125rem, 1.2vw + 0.8rem, 1.125rem);
--text-xl:   clamp(1.25rem,  1.5vw + 0.9rem, 1.25rem);
--text-2xl:  clamp(1.5rem,   2vw + 1rem,     1.5rem);
--text-3xl:  clamp(1.875rem, 2.5vw + 1rem,   1.875rem);
--text-4xl:  clamp(2.25rem,  3vw + 1.2rem,   2.25rem);
--text-5xl:  clamp(3rem,     4vw + 1.5rem,   3rem);

/* Line height */
--leading-tight:  1.25;
--leading-snug:   1.375;
--leading-normal: 1.5;
--leading-relaxed:1.625;

/* Font weight */
--font-light:    300;
--font-normal:   400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;
--font-extrabold:800;
```

### Typography Rules

```
✅ Heading 1 (trang): font-bold, text-4xl/5xl, letter-spacing: -0.02em
✅ Heading 2 (section): font-semibold, text-3xl, letter-spacing: -0.01em
✅ Heading 3 (card title): font-semibold, text-xl
✅ Body: font-normal, text-base, line-height: 1.625
✅ Caption: font-medium, text-sm, color: gray-500
✅ Price: font-bold, font-mono, text-2xl, color: primary-600

❌ KHÔNG dùng font-size < 12px cho bất kỳ text nào
❌ KHÔNG dùng font-weight: 100 hoặc 200 (quá mỏng, khó đọc)
❌ KHÔNG dùng text-transform: uppercase cho đoạn văn dài
```

---

## 📐 Spacing & Layout System

### Spacing Scale (4px base)

```css
--space-0:   0;
--space-px:  1px;
--space-0.5: 2px;
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
--space-32:  128px;
```

### Container & Grid

```css
/* Container widths */
--container-sm:  640px;
--container-md:  768px;
--container-lg:  1024px;
--container-xl:  1280px;
--container-2xl: 1536px;

/* Standard page padding */
--page-padding-x: clamp(1rem, 4vw, 4rem);

/* Grid cho danh sách phòng */
.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}
```

### Border Radius Scale

```css
--radius-sm:   4px;   /* Input, tag nhỏ */
--radius-md:   8px;   /* Button, badge */
--radius-lg:   12px;  /* Card */
--radius-xl:   16px;  /* Modal, panel */
--radius-2xl:  20px;  /* Card hero */
--radius-full: 9999px;/* Pill, avatar */
```

---

## 🪟 Component Design Patterns

### 1. Room Card (Component quan trọng nhất)

```
Cấu trúc bắt buộc:
┌─────────────────────────────────┐
│  [Ảnh phòng — aspect 4:3]       │
│  [Badge: Còn trống / Đã thuê]   │
├─────────────────────────────────┤
│  Số phòng + Địa chỉ            │
│  Diện tích • Tầng               │
│  ──────────────────────────     │
│  💰 X.XXX.000đ / tháng          │
│  [Xem chi tiết] [Liên hệ]       │
└─────────────────────────────────┘

Styling rules:
- Border: 1px solid rgba(0,0,0,0.06)
- Background: white / dark: surface-raised
- Shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)
- Hover shadow: 0 10px 25px rgba(0,0,0,0.15)
- Hover transform: translateY(-2px)
- Transition: all 200ms ease
- Border-radius: --radius-xl
```

### 2. Status Badge

```css
/* Available — xanh lá */
.badge-available {
  background: #dcfce7;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

/* Rented — đỏ/cam */
.badge-rented {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

/* Maintenance — vàng */
.badge-maintenance {
  background: #fef9c3;
  color: #ca8a04;
  border: 1px solid #fde68a;
}

/* Dark mode: dùng opacity thấp hơn */
.dark .badge-available {
  background: rgba(22, 163, 74, 0.15);
  color: #4ade80;
  border-color: rgba(74, 222, 128, 0.3);
}
```

### 3. Price Display

```css
/* Giá thuê tháng — nổi bật */
.price-tag {
  font-family: var(--font-mono);
  font-size: var(--text-2xl);
  font-weight: 700;
  background: var(--gradient-price);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Sub-text giá */
.price-period {
  font-size: var(--text-sm);
  color: var(--color-gray-500);
  font-weight: 400;
}
```

### 4. Button System

```css
/* Primary CTA */
.btn-primary {
  background: var(--gradient-cta);
  color: white;
  font-weight: 600;
  padding: 0.625rem 1.5rem;
  border-radius: var(--radius-md);
  border: none;
  box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.4);
  transition: all 200ms ease;
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(20, 184, 166, 0.4);
}
.btn-primary:active {
  transform: translateY(0);
}

/* Secondary */
.btn-secondary {
  background: transparent;
  color: var(--color-primary-600);
  border: 1.5px solid var(--color-primary-300);
  padding: 0.625rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all 150ms ease;
}
.btn-secondary:hover {
  background: var(--color-primary-50);
  border-color: var(--color-primary-500);
}

/* Danger */
.btn-danger {
  background: #fee2e2;
  color: #dc2626;
  border: 1.5px solid #fecaca;
  /* Hover: đổi sang solid red */
}

/* Quy tắc icon trong button */
/* Icon luôn đứng trước text, gap: 8px, icon size: 1em */
```

### 5. Form Input

```css
.input {
  width: 100%;
  padding: 0.625rem 1rem;
  background: var(--color-gray-50);
  border: 1.5px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  color: var(--color-gray-800);
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
.input::placeholder { color: var(--color-gray-400); }
.input:hover { border-color: var(--color-gray-300); }
.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15);
  background: white;
}
.input.error {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

/* Label */
.label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: 0.375rem;
  display: block;
}
```

### 6. Glassmorphism Panel (dùng cho hero, sidebar nổi)

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-xl);
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 10px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Dark mode glass */
.dark .glass-panel {
  background: rgba(15, 17, 23, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}
```

### 7. Data Table (hóa đơn, hợp đồng)

```css
/* Striped rows với warm tint */
.table-row:nth-child(even) { background: var(--color-gray-50); }
.table-row:hover { background: var(--color-primary-50); }

/* Header */
.table-header {
  background: var(--color-gray-100);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-gray-500);
}
```

---

## ✨ Animation & Motion

### Transition Presets

```css
/* Micro interactions (hover, focus) */
--transition-fast:    all 100ms ease;
--transition-normal:  all 200ms ease;
--transition-slow:    all 300ms ease-out;
--transition-spring:  all 400ms cubic-bezier(0.34, 1.56, 0.64, 1);

/* Fade */
--transition-fade:    opacity 200ms ease;

/* Slide */
--transition-slide:   transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Keyframe Animations

```css
/* Shimmer loading skeleton */
@keyframes shimmer {
  0%   { background-position: -1000px 0; }
  100% { background-position:  1000px 0; }
}
.skeleton {
  background: linear-gradient(90deg,
    var(--color-gray-200) 25%,
    var(--color-gray-100) 50%,
    var(--color-gray-200) 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite linear;
  border-radius: var(--radius-md);
}

/* Fade + slide up (page mount) */
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-slide-up {
  animation: fadeSlideUp 400ms ease forwards;
}

/* Staggered list items */
.list-item:nth-child(1) { animation-delay: 50ms; }
.list-item:nth-child(2) { animation-delay: 100ms; }
.list-item:nth-child(3) { animation-delay: 150ms; }
/* ...etc */

/* Pulse cho badge "Mới" */
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.4); }
  70%  { box-shadow: 0 0 0 8px rgba(20, 184, 166, 0); }
  100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0); }
}
.badge-new { animation: pulse-ring 2s infinite; }

/* Số đếm tăng (giá, số phòng) */
@keyframes countUp {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Motion Rules

```
✅ Hover: translateY(-2px) + shadow tăng — dùng cho card, button
✅ Click: translateY(0) — snap trở về
✅ Page transition: fadeSlideUp 400ms — entrance
✅ Modal open: scale(0.95) → scale(1) + fade, 200ms
✅ Toast notification: slide in từ bottom-right, 300ms
✅ Loading state: skeleton shimmer thay vì spinner khi có thể

❌ KHÔNG dùng animation > 500ms cho micro interactions
❌ KHÔNG dùng bounce (quá playful cho bất động sản)
❌ KHÔNG animate nhiều properties cùng lúc (trừ fade + slide)
❌ KHÔNG tắt animation nếu user có prefers-reduced-motion
```

```css
/* Luôn check prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🌙 Dark Mode

### Strategy: CSS Custom Properties + class `.dark`

```css
:root {
  --bg-page:    var(--color-gray-50);
  --bg-card:    white;
  --bg-input:   var(--color-gray-50);
  --text-body:  var(--color-gray-700);
  --text-head:  var(--color-gray-900);
  --text-muted: var(--color-gray-500);
  --border:     var(--color-gray-200);
}

.dark {
  --bg-page:    var(--surface-base);
  --bg-card:    var(--surface-raised);
  --bg-input:   var(--surface-sunken);
  --text-body:  #cbd5e1;
  --text-head:  #f1f5f9;
  --text-muted: #64748b;
  --border:     rgba(255, 255, 255, 0.08);
}
```

### Dark Mode Rules

```
✅ Luôn dùng CSS custom property, KHÔNG hardcode màu
✅ Dark background: dùng elevation layers (surface-base → raised → overlay)
✅ Text dark mode: KHÔNG dùng pure white (#fff) — dùng #f1f5f9 hoặc #e2e8f0
✅ Shadow dark mode: box-shadow với màu tối hơn, không black
✅ Border dark mode: rgba(255,255,255,0.08) thay vì gray border

❌ KHÔNG dùng filter: invert() để fake dark mode
❌ KHÔNG để ảnh quá sáng trong dark mode (thêm overlay rgba(0,0,0,0.2))
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile first */
--bp-sm:  640px;   /* Phone landscape */
--bp-md:  768px;   /* Tablet */
--bp-lg:  1024px;  /* Laptop */
--bp-xl:  1280px;  /* Desktop */
--bp-2xl: 1536px;  /* Wide */
```

### Layout Patterns

```
Mobile (< 768px):
  - 1 cột phòng
  - Bottom navigation (không sidebar)
  - CTA button full-width
  - Ảnh full-width, no margin

Tablet (768–1024px):
  - 2 cột phòng
  - Sidebar thu gọn / hidden
  - Navigation top bar

Desktop (> 1024px):
  - 3 cột phòng (hoặc sidebar + 2 cột)
  - Sidebar cố định
  - Hover states active
```

### Touch Target Rule

```
✅ Tất cả interactive elements: min 44×44px (Apple HIG)
✅ Spacing giữa các tap targets: min 8px
✅ Input height: min 44px trên mobile
```

---

## 🏠 Page-Specific Patterns

### Dashboard Admin (trang tổng quan)

```
Thứ tự section:
1. Stats row: 4 metric cards (Tổng phòng, Đang thuê, Trống, Doanh thu tháng)
2. Biểu đồ doanh thu (area chart, màu primary gradient)
3. Danh sách hợp đồng sắp hết hạn (bảng + badge cảnh báo)
4. Danh sách công nợ (bảng + sorting)

Metric card pattern:
┌─────────────────┐
│  [Icon]  Label  │
│  Số liệu lớn   │
│  ↑ +X% so kỳ   │
└─────────────────┘
Icon: 40px, rounded-lg, background: primary-100
Số liệu: text-3xl, font-bold, font-mono
Trend: màu xanh nếu tốt, đỏ nếu xấu
```

### Trang Danh Sách Phòng

```
Layout:
- Left sidebar (240px): Bộ lọc (trạng thái, giá, tầng, diện tích)
- Main content: Grid phòng + sort + pagination
- Filter chips nổi bật khi đang filter

Header của trang:
- Breadcrumb
- Tiêu đề + số phòng đang hiển thị
- View toggle: Grid / List
- Sort dropdown
```

### Trang Chi Tiết Phòng

```
Layout 2 cột trên desktop:
Left (60%): Gallery ảnh (carousel) + thông tin chi tiết
Right (40%): Panel thông tin + CTA sticky

Gallery: Lightbox khi click, thumbnail strip phía dưới
Info panel (sticky): Giá, trạng thái, nút CTA, thông tin liên hệ
```

---

## 🔔 Toast & Notification System

```css
/* Toast container */
.toast-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 360px;
}

/* Toast base */
.toast {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-lg);
  box-shadow:
    0 4px 6px rgba(0,0,0,0.07),
    0 10px 30px rgba(0,0,0,0.12);
  border-left: 4px solid;
  animation: slideInRight 300ms ease forwards;
}

/* Types */
.toast-success { border-color: #10b981; background: #f0fdf4; }
.toast-error   { border-color: #ef4444; background: #fef2f2; }
.toast-warning { border-color: #f59e0b; background: #fffbeb; }
.toast-info    { border-color: #3b82f6; background: #eff6ff; }
```

---

## ✅ UI Quality Checklist

Trước khi submit bất kỳ UI nào, kiểm tra:

### Visual
- [ ] Contrast ratio text/bg ≥ 4.5:1 (WCAG AA)
- [ ] Màu sắc nhất quán với color system (không dùng màu tự bịa)
- [ ] Font weight và size đúng type scale
- [ ] Spacing dùng đúng spacing scale (không px tự bịa)
- [ ] Border-radius nhất quán trong cùng component

### Interaction
- [ ] Tất cả interactive elements có hover state
- [ ] Focus state visible (ring cho a11y)
- [ ] Loading state được xử lý (skeleton hoặc spinner)
- [ ] Empty state được thiết kế (không để trống trắng)
- [ ] Error state được thiết kế (message + icon)

### Responsive
- [ ] Test ở 375px (iPhone SE) — nhỏ nhất
- [ ] Test ở 768px (tablet)
- [ ] Test ở 1440px (desktop chuẩn)
- [ ] Text không bị overflow/truncate sai
- [ ] Images có aspect-ratio cố định

### Dark Mode
- [ ] Tất cả màu dùng CSS variable
- [ ] Không có hardcode màu white/black
- [ ] Test full dark mode trước khi submit

### Performance
- [ ] Ảnh dùng lazy loading (`loading="lazy"`)
- [ ] Ảnh có width và height attribute (tránh CLS)
- [ ] Fonts có `font-display: swap`
- [ ] Không import toàn bộ icon library (chỉ import cái dùng)

---

## 🚫 Anti-patterns — TUYỆT ĐỐI TRÁNH

```
❌ Dùng > 3 font-weight khác nhau trên 1 trang
❌ Dùng > 4 màu khác nhau ngoài color system
❌ Mix border-radius (vd: 4px và 20px trong cùng 1 card)
❌ Text trên ảnh không có overlay đủ contrast
❌ Button không có disabled state
❌ Form không có validation inline (chỉ alert khi submit)
❌ Table không có responsive strategy (scroll-x hoặc stacked)
❌ Modal không có close khi click backdrop
❌ Link không phân biệt được với regular text
❌ Color làm phương tiện truyền đạt thông tin duy nhất (không a11y)
❌ Animation chạy lặp vô tận không cần thiết (distraction)
❌ Placeholder text thay thế label (xóa khi gõ → UX tệ)
```

---

## 📦 Recommended Libraries

| Thư viện | Dùng cho | Lý do |
|---|---|---|
| `@radix-ui/react-*` | Dialog, Dropdown, Toast, Tabs | Unstyled, a11y out-of-the-box |
| `framer-motion` | Animation phức tạp | Declarative, performant |
| `lucide-react` | Icons | Lightweight, consistent stroke |
| `recharts` | Biểu đồ doanh thu | React-native, customizable |
| `react-image-gallery` | Gallery ảnh phòng | Feature-rich, mobile |
| `react-hook-form` | Form management | Performance, DX |
| `zod` | Form validation schema | Type-safe |
| `clsx` + `tailwind-merge` | Class merging | Không conflict Tailwind |

---

## 💡 Quy trình tạo UI mới

1. **Sketch trước** — Mô tả layout bằng ASCII hoặc wireframe text
2. **Xác định components** — Cái gì đã có? Cái gì cần tạo mới?
3. **Design tokens first** — Dùng đúng variable, không hardcode
4. **Mobile first** — Code mobile layout trước, rồi mở rộng lên desktop
5. **States** — Default → Hover → Active → Disabled → Loading → Error → Empty
6. **Dark mode** — Test ngay khi code, không để sau
7. **Review checklist** — Chạy qua checklist trên trước khi done

/**
 * Mock data cho phòng trọ — sẽ thay bằng API call khi có backend
 * Filter keys: location, priceRange, category
 */

// Ảnh placeholder dùng picsum — thay bằng ảnh thực khi lên production
const img = (id) => `https://picsum.photos/seed/room${id}/800/600`
const imgThumb = (id) => `https://picsum.photos/seed/room${id}/200/150`

export const LOCATIONS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'quan-1', label: 'Quận 1' },
  { key: 'quan-3', label: 'Quận 3' },
  { key: 'phu-nhuan', label: 'Phú Nhuận' },
  { key: 'binh-thanh', label: 'Bình Thạnh' },
  { key: 'go-vap', label: 'Gò Vấp' },
  { key: 'tan-binh', label: 'Tân Bình' },
  { key: 'thu-duc', label: 'Thủ Đức' },
]

export const PRICE_RANGES = [
  { key: 'all', label: 'Tất cả mức giá' },
  { key: 'under-2m', label: 'Dưới 2 triệu', min: 0, max: 2000000 },
  { key: '2m-3m', label: '2 - 3 triệu', min: 2000000, max: 3000000 },
  { key: '3m-5m', label: '3 - 5 triệu', min: 3000000, max: 5000000 },
  { key: '5m-7m', label: '5 - 7 triệu', min: 5000000, max: 7000000 },
  { key: 'above-7m', label: 'Trên 7 triệu', min: 7000000, max: Infinity },
]

export const CATEGORIES = [
  { key: 'all', label: 'Tất cả' },
  { key: 'phong-tro', label: 'Phòng trọ' },
  { key: 'can-ho-mini', label: 'Căn hộ mini' },
  { key: 'nha-nguyen-can', label: 'Nhà nguyên căn' },
  { key: 'can-ho-dich-vu', label: 'Căn hộ dịch vụ' },
  { key: 'o-ghep', label: 'Ở ghép' },
]

export const AMENITY_ICONS = {
  'wifi': '📶',
  'may-lanh': '❄️',
  'nong-lanh': '🚿',
  'tu-lanh': '🧊',
  'may-giat': '🧺',
  'ban-cong': '🌅',
  'bao-ve': '🛡️',
  'gui-xe': '🏍️',
  'tu-do': '🕐',
  'bep': '🍳',
  'noi-that': '🛋️',
  'thu-cung': '🐾',
}

export const AMENITY_LABELS = {
  'wifi': 'Wifi',
  'may-lanh': 'Máy lạnh',
  'nong-lanh': 'Máy nước nóng',
  'tu-lanh': 'Tủ lạnh',
  'may-giat': 'Máy giặt',
  'ban-cong': 'Ban công',
  'bao-ve': 'Bảo vệ',
  'gui-xe': 'Gửi xe',
  'tu-do': 'Giờ tự do',
  'bep': 'Bếp',
  'noi-that': 'Nội thất',
  'thu-cung': 'Thú cưng',
}

export const rooms = [
  {
    id: 1,
    title: 'Phòng Đẹp Máy Lạnh, Cửa Sổ, Trung Tâm Phú Nhuận',
    slug: 'phong-dep-may-lanh-phu-nhuan',
    category: 'phong-tro',
    price: 2300000,
    deposit: 2300000,
    area: 20,
    floor: 2,
    address: '579 Nguyễn Kiệm, Phường 9, Phú Nhuận, TP.HCM',
    location: 'phu-nhuan',
    lat: 10.8143,
    lng: 106.6811,
    status: 'available',
    furniture: 'Nhà trống',
    images: [img(1), img(11), img(12), img(13), img(14), img(15), img(16), img(17), img(18)],
    thumbnails: [imgThumb(1), imgThumb(11), imgThumb(12), imgThumb(13), imgThumb(14), imgThumb(15), imgThumb(16), imgThumb(17), imgThumb(18)],
    amenities: ['may-lanh', 'ban-cong', 'bao-ve', 'gui-xe'],
    rating: 4.2,
    reviewCount: 15,
    landlord: {
      name: 'ThyThy Quan HCM',
      avatar: 'https://i.pravatar.cc/100?u=thythy',
      phone: '076583****',
      type: 'Môi giới',
      responseRate: 94,
      activeAgo: '2 giờ trước',
      listings: 3,
      joinedYears: 4,
    },
    description: `<h3>Vị trí nhà mình:</h3>
<p>- Địa chỉ: Mặt tiền 579 Nguyễn Kiệm, Phường 9, Phú Nhuận, TP.HCM.</p>
<p>- Từ ngã 4 Phú Nhuận đi thẳng Nguyễn Kiệm qua đường ray xe lửa 200m nhà mình bên tay trái.</p>
<p>- Chỉ 5p để qua Gò Vấp, Bình Thạnh, Tân Bình gần Coopmart Nguyễn Kiệm, Chợ Chợ Nguyễn Đình Chiểu, Đại Học Công Nghiệp...</p>
<p>- Mặt tiền đường Nguyễn Kiệm đi lại rất thuận tiện.</p>

<h3>Thông tin phòng:</h3>
<p>- Phòng rộng 20m², có cửa sổ thoáng mát, ánh sáng tự nhiên.</p>
<p>- Có máy lạnh, WC riêng trong phòng.</p>
<p>- Điện 3.500đ/kWh, nước 100.000đ/người/tháng.</p>
<p>- Giờ giấc tự do, không chung chủ.</p>
<p>- Wifi miễn phí, gửi xe miễn phí.</p>`,
    postedAt: '2025-07-28T10:00:00',
    updatedAt: '2025-07-30T09:00:00',
    reviews: [
      { id: 1, user: 'Ánh Nhi', avatar: null, rating: 5, content: 'Phòng sạch sẽ, chủ nhà thân thiện. Vị trí thuận tiện đi lại.', date: '2025-07-10', replies: [{ user: 'ThyThy Quan HCM', isAuthor: true, content: 'Cảm ơn bạn nhé! 😊', date: '2025-07-11' }] },
      { id: 2, user: 'Vương', avatar: null, rating: 4, content: 'Phòng ok, điện nước hợp lý. Có điều hơi ồn do gần đường lớn.', date: '2025-07-05', replies: [] },
      { id: 3, user: 'Minh Nguyễn', avatar: null, rating: 4, content: 'Gần trường đại học, đi bộ 5 phút. Chủ nhà hỗ trợ nhiệt tình.', date: '2025-06-28', replies: [{ user: 'ThyThy Quan HCM', isAuthor: true, content: 'Cảm ơn bạn đã đánh giá!', date: '2025-06-29' }] },
    ],
  },
  {
    id: 2,
    title: 'Căn Hộ Mini Full Nội Thất Quận 1 - Ngay Trung Tâm',
    slug: 'can-ho-mini-full-noi-that-quan-1',
    category: 'can-ho-mini',
    price: 5500000,
    deposit: 5500000,
    area: 30,
    floor: 5,
    address: '120 Lê Thị Riêng, Phường Bến Thành, Quận 1, TP.HCM',
    location: 'quan-1',
    lat: 10.7712,
    lng: 106.6917,
    status: 'available',
    furniture: 'Đầy đủ nội thất',
    images: [img(2), img(21), img(22), img(23), img(24)],
    thumbnails: [imgThumb(2), imgThumb(21), imgThumb(22), imgThumb(23), imgThumb(24)],
    amenities: ['may-lanh', 'nong-lanh', 'tu-lanh', 'may-giat', 'wifi', 'bao-ve', 'noi-that'],
    rating: 4.8,
    reviewCount: 32,
    landlord: {
      name: 'Hùng Ngô',
      avatar: 'https://i.pravatar.cc/100?u=hung',
      phone: '0901234***',
      type: 'Chính chủ',
      responseRate: 98,
      activeAgo: '30 phút trước',
      listings: 5,
      joinedYears: 2,
    },
    description: `<h3>Căn hộ mini cao cấp ngay trung tâm Quận 1:</h3>
<p>- Full nội thất: giường, tủ, bàn làm việc, máy lạnh, tủ lạnh, máy giặt.</p>
<p>- WC riêng, bếp nhỏ trong phòng.</p>
<p>- Bảo vệ 24/7, thang máy, camera an ninh.</p>
<p>- Gần chợ Bến Thành, Bitexco, các quán ăn nổi tiếng.</p>`,
    postedAt: '2025-07-25T14:00:00',
    updatedAt: '2025-07-29T16:00:00',
    reviews: [
      { id: 1, user: 'Thanh Trúc', avatar: null, rating: 5, content: 'Phòng đẹp, sạch sẽ, view đẹp. Đáng đồng tiền!', date: '2025-07-20', replies: [] },
      { id: 2, user: 'Hải Nam', avatar: null, rating: 5, content: 'Mọi thứ hoàn hảo. Chủ nhà rất tốt và chuyên nghiệp.', date: '2025-07-15', replies: [] },
    ],
  },
  {
    id: 3,
    title: 'Phòng Trọ Giá Rẻ Gò Vấp - Gần Đại Học Công Nghiệp',
    slug: 'phong-tro-gia-re-go-vap',
    category: 'phong-tro',
    price: 1500000,
    deposit: 1500000,
    area: 14,
    floor: 1,
    address: '33 Nguyễn Oanh, Phường 10, Gò Vấp, TP.HCM',
    location: 'go-vap',
    lat: 10.8252,
    lng: 106.6781,
    status: 'available',
    furniture: 'Nhà trống',
    images: [img(3), img(31), img(32), img(33)],
    thumbnails: [imgThumb(3), imgThumb(31), imgThumb(32), imgThumb(33)],
    amenities: ['gui-xe', 'tu-do'],
    rating: 2.5,
    reviewCount: 8,
    landlord: {
      name: 'Chị Lan',
      avatar: 'https://i.pravatar.cc/100?u=lan',
      phone: '0987654***',
      type: 'Chính chủ',
      responseRate: 60,
      activeAgo: '3 ngày trước',
      listings: 1,
      joinedYears: 1,
    },
    description: `<h3>Phòng trọ giá rẻ cho sinh viên:</h3>
<p>- Diện tích 14m², WC chung.</p>
<p>- Gần trường Đại Học Công Nghiệp, chợ Gò Vấp.</p>
<p>- Điện 4.000đ/kWh, nước 120.000đ/người.</p>`,
    postedAt: '2025-07-20T08:00:00',
    updatedAt: '2025-07-20T08:00:00',
    reviews: [
      { id: 1, user: 'Sinh viên A', avatar: null, rating: 2, content: 'Phòng chật, nóng, WC chung bẩn. Chủ nhà ít quan tâm.', date: '2025-07-15', replies: [] },
      { id: 2, user: 'Duy Phong', avatar: null, rating: 3, content: 'Giá rẻ nên cũng chấp nhận được. Vị trí thuận lợi.', date: '2025-07-01', replies: [] },
      { id: 3, user: 'Mai Hoa', avatar: null, rating: 2, content: 'Không nên thuê. Điện nước đắt, phòng xuống cấp.', date: '2025-06-20', replies: [] },
    ],
  },
  {
    id: 4,
    title: 'Nhà Nguyên Căn 3 Phòng Ngủ - Bình Thạnh Yên Tĩnh',
    slug: 'nha-nguyen-can-binh-thanh',
    category: 'nha-nguyen-can',
    price: 8000000,
    deposit: 16000000,
    area: 60,
    floor: null,
    address: '15/2 Nơ Trang Long, Phường 12, Bình Thạnh, TP.HCM',
    location: 'binh-thanh',
    lat: 10.8105,
    lng: 106.6985,
    status: 'available',
    furniture: 'Nội thất cơ bản',
    images: [img(4), img(41), img(42), img(43), img(44), img(45)],
    thumbnails: [imgThumb(4), imgThumb(41), imgThumb(42), imgThumb(43), imgThumb(44), imgThumb(45)],
    amenities: ['may-lanh', 'nong-lanh', 'bep', 'gui-xe', 'thu-cung'],
    rating: 4.5,
    reviewCount: 12,
    landlord: {
      name: 'Anh Tuấn',
      avatar: 'https://i.pravatar.cc/100?u=tuan',
      phone: '0912345***',
      type: 'Chính chủ',
      responseRate: 90,
      activeAgo: '1 giờ trước',
      listings: 2,
      joinedYears: 3,
    },
    description: `<h3>Nhà nguyên căn 3 phòng ngủ, 2 WC:</h3>
<p>- 3 phòng ngủ rộng, 2 WC, 1 phòng khách, 1 bếp riêng.</p>
<p>- Sân trước rộng, có chỗ đậu ô tô.</p>
<p>- Hẻm xe hơi yên tĩnh, an ninh tốt.</p>
<p>- Gần chợ Bà Chiểu, siêu thị Coopmart.</p>`,
    postedAt: '2025-07-22T12:00:00',
    updatedAt: '2025-07-29T08:00:00',
    reviews: [
      { id: 1, user: 'Gia đình Phúc', avatar: null, rating: 5, content: 'Nhà rộng rãi, sạch sẽ. Rất phù hợp cho gia đình nhỏ!', date: '2025-07-18', replies: [] },
      { id: 2, user: 'Linh Chi', avatar: null, rating: 4, content: 'Hẻm hơi nhỏ nhưng yên tĩnh, thoáng mát. Hài lòng!', date: '2025-07-10', replies: [] },
    ],
  },
  {
    id: 5,
    title: 'Căn Hộ Dịch Vụ Cao Cấp Quận 3 - Hồ Bơi + Gym',
    slug: 'can-ho-dich-vu-cao-cap-quan-3',
    category: 'can-ho-dich-vu',
    price: 7500000,
    deposit: 7500000,
    area: 35,
    floor: 8,
    address: '45 Võ Văn Tần, Phường 6, Quận 3, TP.HCM',
    location: 'quan-3',
    lat: 10.7766,
    lng: 106.6896,
    status: 'rented',
    furniture: 'Đầy đủ nội thất cao cấp',
    images: [img(5), img(51), img(52), img(53), img(54)],
    thumbnails: [imgThumb(5), imgThumb(51), imgThumb(52), imgThumb(53), imgThumb(54)],
    amenities: ['may-lanh', 'nong-lanh', 'tu-lanh', 'may-giat', 'wifi', 'bao-ve', 'noi-that', 'ban-cong'],
    rating: 4.9,
    reviewCount: 45,
    landlord: {
      name: 'Premium Living',
      avatar: 'https://i.pravatar.cc/100?u=premium',
      phone: '0282468***',
      type: 'Công ty',
      responseRate: 99,
      activeAgo: '10 phút trước',
      listings: 15,
      joinedYears: 5,
    },
    description: `<h3>Căn hộ dịch vụ 5 sao ngay trung tâm Quận 3:</h3>
<p>- Full nội thất cao cấp import từ Hàn Quốc.</p>
<p>- Hồ bơi tầng thượng, phòng gym miễn phí.</p>
<p>- Dọn phòng 2 lần/tuần, giặt ủi miễn phí.</p>
<p>- Bảo vệ 24/7, thang máy tốc độ cao.</p>`,
    postedAt: '2025-07-15T09:00:00',
    updatedAt: '2025-07-28T14:00:00',
    reviews: [
      { id: 1, user: 'Expat John', avatar: null, rating: 5, content: 'Best serviced apartment I\'ve stayed in Vietnam. Excellent service!', date: '2025-07-25', replies: [] },
    ],
  },
  {
    id: 6,
    title: 'Phòng Trọ Tân Bình - Gần Sân Bay, Giá Sinh Viên',
    slug: 'phong-tro-tan-binh-gan-san-bay',
    category: 'phong-tro',
    price: 1800000,
    deposit: 1800000,
    area: 16,
    floor: 3,
    address: '88 Cộng Hòa, Phường 4, Tân Bình, TP.HCM',
    location: 'tan-binh',
    lat: 10.8016,
    lng: 106.6534,
    status: 'available',
    furniture: 'Giường, tủ, bàn',
    images: [img(6), img(61), img(62)],
    thumbnails: [imgThumb(6), imgThumb(61), imgThumb(62)],
    amenities: ['wifi', 'gui-xe', 'tu-do', 'bao-ve'],
    rating: 3.5,
    reviewCount: 10,
    landlord: {
      name: 'Cô Hồng',
      avatar: 'https://i.pravatar.cc/100?u=hong',
      phone: '0976543***',
      type: 'Chính chủ',
      responseRate: 75,
      activeAgo: '5 giờ trước',
      listings: 3,
      joinedYears: 6,
    },
    description: `<h3>Phòng trọ sinh viên gần sân bay Tân Sơn Nhất:</h3>
<p>- Phòng 16m², có giường, tủ, bàn học.</p>
<p>- WC riêng trong phòng, cửa sổ thoáng.</p>
<p>- Gần sân bay, siêu thị Aeon Mall, bến xe miền Đông mới.</p>`,
    postedAt: '2025-07-26T11:00:00',
    updatedAt: '2025-07-26T11:00:00',
    reviews: [
      { id: 1, user: 'Hoàng Anh', avatar: null, rating: 3, content: 'Tạm được với giá tiền. Hơi ồn do gần đường bay.', date: '2025-07-20', replies: [] },
      { id: 2, user: 'Bảo Trâm', avatar: null, rating: 4, content: 'Cô chủ dễ tính, phòng sạch. Wifi hơi yếu.', date: '2025-07-12', replies: [] },
    ],
  },
  {
    id: 7,
    title: 'Studio Thủ Đức - View Sông, Mới Xây 100%',
    slug: 'studio-thu-duc-view-song',
    category: 'can-ho-mini',
    price: 3200000,
    deposit: 6400000,
    area: 25,
    floor: 7,
    address: '200 Võ Văn Ngân, Thủ Đức, TP.HCM',
    location: 'thu-duc',
    lat: 10.8496,
    lng: 106.7578,
    status: 'available',
    furniture: 'Full nội thất mới',
    images: [img(7), img(71), img(72), img(73), img(74)],
    thumbnails: [imgThumb(7), imgThumb(71), imgThumb(72), imgThumb(73), imgThumb(74)],
    amenities: ['may-lanh', 'nong-lanh', 'tu-lanh', 'wifi', 'ban-cong', 'bao-ve', 'noi-that'],
    rating: 4.6,
    reviewCount: 22,
    landlord: {
      name: 'Anh Khoa',
      avatar: 'https://i.pravatar.cc/100?u=khoa',
      phone: '0938765***',
      type: 'Chính chủ',
      responseRate: 92,
      activeAgo: '45 phút trước',
      listings: 4,
      joinedYears: 1,
    },
    description: `<h3>Studio mới xây 100% — View sông Sài Gòn:</h3>
<p>- Mới hoàn thiện, chưa ai ở.</p>
<p>- Ban công rộng, view sông thoáng mát.</p>
<p>- Gần trạm metro, ĐH Ngân Hàng, ĐH Sư Phạm Kỹ Thuật.</p>`,
    postedAt: '2025-07-27T15:00:00',
    updatedAt: '2025-07-30T07:00:00',
    reviews: [
      { id: 1, user: 'Phương Linh', avatar: null, rating: 5, content: 'Phòng mới đẹp, view sông tuyệt vời! Gần metro rất tiện.', date: '2025-07-29', replies: [] },
    ],
  },
  {
    id: 8,
    title: 'Phòng Ở Ghép Quận 1 - Dành Cho Nữ, An Ninh',
    slug: 'phong-o-ghep-quan-1-nu',
    category: 'o-ghep',
    price: 1900000,
    deposit: 1900000,
    area: 10,
    floor: 4,
    address: '75 Bùi Viện, Phường Phạm Ngũ Lão, Quận 1, TP.HCM',
    location: 'quan-1',
    lat: 10.7671,
    lng: 106.6938,
    status: 'available',
    furniture: 'Giường tầng, tủ cá nhân',
    images: [img(8), img(81), img(82)],
    thumbnails: [imgThumb(8), imgThumb(81), imgThumb(82)],
    amenities: ['wifi', 'may-lanh', 'bao-ve', 'may-giat'],
    rating: 3.8,
    reviewCount: 6,
    landlord: {
      name: 'Ngọc Ánh',
      avatar: 'https://i.pravatar.cc/100?u=ngoc',
      phone: '0965432***',
      type: 'Chính chủ',
      responseRate: 85,
      activeAgo: '2 giờ trước',
      listings: 2,
      joinedYears: 2,
    },
    description: `<h3>Phòng ở ghép dành cho nữ — an ninh, sạch sẽ:</h3>
<p>- Ở ghép 2-3 người/phòng, giường tầng, tủ cá nhân khóa riêng.</p>
<p>- WC chung sạch sẽ, dọn vệ sinh hàng ngày.</p>
<p>- Chỉ nhận nữ, có camera an ninh.</p>
<p>- Giá bao điện nước wifi.</p>`,
    postedAt: '2025-07-29T09:00:00',
    updatedAt: '2025-07-30T10:00:00',
    reviews: [
      { id: 1, user: 'Trà My', avatar: null, rating: 4, content: 'Sạch sẽ, an toàn cho con gái ở một mình. Giá hợp lý.', date: '2025-07-28', replies: [] },
      { id: 2, user: 'Kim Ngân', avatar: null, rating: 3, content: 'Hơi chật vì ở ghép, nhưng vị trí trung tâm nên chấp nhận.', date: '2025-07-22', replies: [] },
    ],
  },
]

/**
 * Format giá VND
 */
export function formatPrice(price) {
  if (price >= 1000000) {
    const millions = price / 1000000
    return `${millions % 1 === 0 ? millions : millions.toFixed(1)} triệu/tháng`
  }
  return `${price.toLocaleString('vi-VN')}đ/tháng`
}

/**
 * Format giá ngắn cho card
 */
export function formatPriceShort(price) {
  if (price >= 1000000) {
    const millions = price / 1000000
    return `${millions % 1 === 0 ? millions : millions.toFixed(1)} tr`
  }
  return `${(price / 1000).toFixed(0)}k`
}

/**
 * Tính thời gian relative
 */
export function timeAgo(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins} phút trước`
  if (diffHours < 24) return `${diffHours} giờ trước`
  if (diffDays < 7) return `${diffDays} ngày trước`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`
  return `${Math.floor(diffDays / 30)} tháng trước`
}

/**
 * Lấy rating badge info
 */
export function getRatingBadge(rating) {
  if (rating >= 4) return { type: 'good', label: 'Đánh giá tốt', icon: '✅' }
  if (rating >= 3) return { type: 'warning', label: 'Cần cân nhắc', icon: '⚠️' }
  return { type: 'danger', label: 'Không nên thuê', icon: '🚫' }
}

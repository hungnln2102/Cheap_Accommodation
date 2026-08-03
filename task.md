# Task: Thi?t k? Admin Dashboard t?i /admin

## M?c ti?u
Thi?t k? v? ho?n thi?n trang qu?n tr? t?i route `/admin` cho d? ?n Cheap_Accommodation, ph?c v? admin/ch? tr? qu?n l? ph?ng, theo d?i KPI, traffic v? tr?ng th?i v?n h?nh.

## Ph?m vi route
- Route ch?nh: `/admin`
- Frontend: `frontend/src/pages/admin/AdminPage.jsx`
- Style: `frontend/src/pages/admin/AdminPage.css`
- ?i?u h??ng: `frontend/src/App.jsx`

## Checklist
- [x] D?ng l?i dashboard T?ng quan m?i theo h??ng SaaS/admin chuy?n nghi?p: sidebar, header, KPI, line chart, source donut v? traffic table.
- [x] Chu?n h?a dashboard T?ng quan b?ng KPI mini chart, donut chart, line chart v? b?ng traffic chuy?n nghi?p.
- [x] Ho?n thi?n module T?ng quan: T?ng ph?ng, Ph?ng ?? thu?, Ph?ng m?i, L??t reach, User m?i, CCU v? B?ng Traffic.
- [x] Lo?i b? CTA `Th?m ph?ng` kh?i T?ng quan; thao t?c th?m ph?ng s? thu?c module `Ph?ng tr?`.
- [x] Kh?i t?o route `/admin` trong React Router.
- [x] T?ch `/admin` kh?i public layout ?? kh?ng d?ng chung Header/Footer web ch?nh.
- [x] B?c trang admin b?ng login gate mock hi?n t?i.
- [x] Chu?n h?a layout admin theo module: T?ng quan, Ph?ng tr?, Kh?ch thu?, H?p ??ng, Tin nh?n, H?a ??n, C?i ??t.
- [ ] T?ch component admin l?n th?nh c?c component nh? d? b?o tr?.
- [ ] Thi?t k? tr?ng th?i d? li?u: loading, empty, error, filtered results.
- [ ] Chu?n b? hook/API layer ?? thay mock data b?ng backend th?t.
- [ ] Ki?m tra responsive desktop/tablet/mobile cho `/admin`.
- [x] Ch?y build v? ki?m tra l?i visual c? b?n. Ghi ch?: `npm run build` frontend ?? th?nh c?ng v? kh?ng c?n warning bundle > 500 kB.

## Definition of Done
- Truy c?p ???c `/admin`.
- Trang admin hi?n th? r? KPI, chart tr?n, line chart v? b?ng traffic.
- T?ng quan kh?ng ch?a action qu?n l? ph?ng nh? `Th?m ph?ng`.
- UI nh?t qu?n v?i private admin shell, kh?ng d?ng chung layout public.
- Kh?ng ph? trang public `/` v? `/phong/:slug`.
- `npm run build` th?nh c?ng v? output kh?ng c?n warning chunk l?n.

## Ghi ch? hi?n tr?ng
- Backend hi?n m?i c? `/api/health`, n?n Admin Dashboard ?ang d?ng mock data t? frontend.
- C?n ?u ti?n t?ch UI th?nh component tr??c khi n?i API th?t.

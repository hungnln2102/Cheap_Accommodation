import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import RoomDetailPage from './pages/RoomDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/phong/:slug" element={<RoomDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

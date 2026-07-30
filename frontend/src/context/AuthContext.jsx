import { createContext, useContext, useState, useEffect, useRef } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('cheap_accom_user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('cheap_accom_favorites')
      return savedFavorites ? JSON.parse(savedFavorites) : []
    } catch {
      return []
    }
  })

  const [showLoginModal, setShowLoginModal] = useState(false)
  const onLoginSuccessCallback = useRef(null)

  useEffect(() => {
    if (user) {
      localStorage.setItem('cheap_accom_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('cheap_accom_user')
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('cheap_accom_favorites', JSON.stringify(favorites))
  }, [favorites])

  const login = (username, password) => {
    // MOCK LOGIN: Chấp nhận mọi tài khoản, tạo profile mock từ username
    const mockUser = {
      name: username.trim() || 'Người dùng ẩn danh',
      email: `${username.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      avatar: `https://i.pravatar.cc/100?u=${encodeURIComponent(username)}`,
    }
    setUser(mockUser)
    setShowLoginModal(false)

    // Nếu có callback đang chờ (ví dụ: đang click Lưu rồi bị chặn bắt login) thì chạy callback đó
    if (onLoginSuccessCallback.current) {
      onLoginSuccessCallback.current(mockUser)
      onLoginSuccessCallback.current = null
    }
    return true
  }

  const logout = () => {
    setUser(null)
    onLoginSuccessCallback.current = null
  }

  const triggerLogin = (callback) => {
    if (callback) {
      onLoginSuccessCallback.current = callback
    }
    setShowLoginModal(true)
  }

  const toggleFavorite = (roomId) => {
    if (!user) {
      triggerLogin(() => {
        setFavorites(prev => {
          if (prev.includes(roomId)) return prev
          return [...prev, roomId]
        })
      })
      return
    }

    setFavorites(prev => {
      if (prev.includes(roomId)) {
        return prev.filter(id => id !== roomId)
      } else {
        return [...prev, roomId]
      }
    })
  }

  const isFavorite = (roomId) => {
    return favorites.includes(roomId)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        favorites,
        showLoginModal,
        setShowLoginModal,
        login,
        logout,
        triggerLogin,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

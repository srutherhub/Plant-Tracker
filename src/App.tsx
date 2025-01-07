import './App.css'
import { useState, useEffect } from 'react'
import { Login } from './authentication/Login'
import { Logout } from './authentication/Logout'
import { Plants } from './db/plants/Plants'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken")
    setIsLoggedIn(!!token)
  }, [])

  return (
    <div>
      {isLoggedIn ? "" : <Login />}
      {isLoggedIn ? <Logout /> : ""}
      {isLoggedIn ? <Plants /> : ""}
    </div>
  )
}

export default App

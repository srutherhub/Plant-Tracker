import './App.css'
import { useState, useEffect } from 'react'
import { Logout } from './authentication/Logout'
import { usePlants } from './db/plants/usePlants'
import { PlantsTable } from './db/plants/PlantsTable'
import { PlantsCardGrid } from './db/plants/PlantsCardGrid'
import { useNavigate } from 'react-router'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { data, plants } = usePlants();
  const redirect = useNavigate()

  /*Redirect to login page if not logged in*/
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      redirect("/auth");
    } else {
      setIsLoggedIn(!!token)
    }
  }, [redirect]);

  /*Load page data if logged in*/
  useEffect(() => {
    if (isLoggedIn) plants()
  }, [plants, isLoggedIn])

  return (
    <div>
      <Logout />
      <PlantsCardGrid data={data} />
      <PlantsTable data={data} />
    </div>
  )
}

export default App

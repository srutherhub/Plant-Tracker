import './App.css'
import { useState, useEffect, createContext } from 'react'
import { Logout } from './authentication/Logout'
import { usePlants } from './db/plants/usePlants'
import { PlantsCardGrid } from './db/plants/PlantsCardGrid'
import { useNavigate } from 'react-router'
import { Plant } from './models/plant'

interface IAppData {
  plantsData: Plant[] | undefined
  setPlantsData: React.Dispatch<React.SetStateAction<Plant[] | undefined>>
}
export const AppDataContext = createContext<IAppData | undefined>(undefined)

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [plantsData, setPlantsData] = useState<Plant[] | undefined>()

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
    if (isLoggedIn) {
      plants()
    }
  }, [plants, isLoggedIn])

  /*Add loaded data to AppDataContext state variable*/
  useEffect(() => { setPlantsData(data) }, [data])

  return (
    <div>
      <Logout />
      <AppDataContext.Provider value={{ plantsData, setPlantsData }}>
        <PlantsCardGrid />
      </AppDataContext.Provider>
    </div >
  )
}

export default App

import "./App.css";
import { useState, useEffect, createContext } from "react";
import { usePlants } from "./components/plants/usePlants";
import { Navbar } from "./components/navbar/Navbar";
import { useNavigate } from "react-router";
import { Plant } from "./models/plant";
import { ManagePlants } from "./pages/ManagePlants";
import { ENavOptions } from "./components/navbar/Navbar";
import { Dashboard } from "./pages/Dashboard";

interface IAppData {
  plantsData: Plant[] | undefined;
  setPlantsData: React.Dispatch<React.SetStateAction<Plant[] | undefined>>;
}
export const AppDataContext = createContext<IAppData | undefined>(undefined);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plantsData, setPlantsData] = useState<Plant[]>();
  const [navSelect, setNavSelect] = useState<string>("Dashboard");
  const { data, plants } = usePlants();
  const redirect = useNavigate();
  const userId = sessionStorage.getItem("userId");
  /*Redirect to login page if not logged in*/
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      redirect("/auth");
    } else {
      setIsLoggedIn(!!token);
    }
  }, [redirect]);

  /*Load page data if logged in*/
  useEffect(() => {
    if (isLoggedIn) {
      plants();
    }
  }, [isLoggedIn, plants, userId]);

  /*Add loaded data to AppDataContext state variable*/
  useEffect(() => {
    setPlantsData(data);
  }, [data]);

  return (
    <div>
      <Navbar navSelect={navSelect} setNavSelect={setNavSelect} />
      <AppDataContext.Provider value={{ plantsData, setPlantsData }}>
        <div className="app-container">
          {navSelect === ENavOptions.dashboard ? <Dashboard /> : ""}
          {navSelect === ENavOptions.manage ? <ManagePlants /> : ""}
        </div>
      </AppDataContext.Provider>
    </div>
  );
}

export default App;

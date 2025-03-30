import "./App.css";
import { useState, useEffect, createContext } from "react";
import { usePlants } from "./components/plants/usePlants";
import { Navbar } from "./components/navbar/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Plant } from "./models/plant";
import { Dashboard } from "./pages/Dashboard";
import { TPlantAudit } from "./components/plants/usePlantsAudit";

interface IAppData {
  plantsData: Plant[] | undefined;
  setPlantsData: React.Dispatch<React.SetStateAction<Plant[] | undefined>>;
  plantsAuditData: TPlantAudit | undefined;
  setPlantsAuditData: React.Dispatch<
    React.SetStateAction<TPlantAudit | undefined>
  >;
}

export const AppDataContext = createContext<IAppData | undefined>(undefined);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plantsData, setPlantsData] = useState<Plant[]>();
  const [plantsAuditData, setPlantsAuditData] = useState<TPlantAudit>();
  const { data, plants } = usePlants();
  const redirect = useNavigate();
  const location = useLocation();
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
    if (isLoggedIn && !plantsData) {
      plants();
    }
  }, [isLoggedIn, plants, plantsData, userId]);

  /*Add loaded data to AppDataContext state variable*/
  useEffect(() => {
    setPlantsData(data);
  }, [data]);

  return (
    <div>
      <Navbar />
      <AppDataContext.Provider
        value={{
          plantsData,
          setPlantsData,
          plantsAuditData,
          setPlantsAuditData,
        }}
      >
        <div className="app-container">
          {location.pathname === "/app" ? <Dashboard /> : <Outlet />}
        </div>
      </AppDataContext.Provider>
    </div>
  );
}

export default App;

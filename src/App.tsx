import "./App.css";
import { useState, useEffect, createContext } from "react";
import { Logout } from "./components/authentication/Logout";
import { usePlants } from "./components/plants/usePlants";
import { Toolbar } from "./components/plants/Toolbar";
import { PlantsCardGrid } from "./components/plants/PlantsCardGrid";
import { useNavigate } from "react-router";
import { Plant } from "./models/plant";

interface IAppData {
  plantsData: Plant[] | undefined;
  setPlantsData: React.Dispatch<React.SetStateAction<Plant[] | undefined>>;
}
export const AppDataContext = createContext<IAppData | undefined>(undefined);


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plantsData, setPlantsData] = useState<Plant[]>();
  const { data, plants } = usePlants();
  const redirect = useNavigate();
  const userId = sessionStorage.getItem("userId")
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
      plants()
    }
  }, [isLoggedIn, plants, userId]);

  /*Add loaded data to AppDataContext state variable*/
  useEffect(() => {
    setPlantsData(data);
  }, [data]);

  return (
    <div>
      <AppDataContext.Provider value={{ plantsData, setPlantsData }}>
        <div
          style={{
            padding: "0 clamp(0.5rem, 8%, 16rem)",
          }}
        >
          <Logout />
          <Toolbar></Toolbar>
          <PlantsCardGrid />
        </div>
      </AppDataContext.Provider>
    </div>
  );
}

export default App;

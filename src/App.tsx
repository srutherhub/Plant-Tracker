import "./App.css";
import { useState, useEffect, createContext } from "react";
import { usePlants } from "./components/plants/usePlants";
import { Navbar } from "./components/navbar/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Plant } from "./models/plant";
import { Dashboard } from "./pages/Dashboard";
import ToastContainer, { TToast } from "./lib/ToastContainer";

interface IAppData {
  plantsData: Plant[] | undefined;
  setPlantsData: React.Dispatch<React.SetStateAction<Plant[] | undefined>>;
  toast: TToast[];
  setToast: React.Dispatch<React.SetStateAction<TToast[]>>;
}

export const AppDataContext = createContext<IAppData | undefined>(undefined);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plantsData, setPlantsData] = useState<Plant[]>();
  const { data, plants } = usePlants();
  const [toast, setToast] = useState<TToast[]>([]);
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
        value={{ plantsData, setPlantsData, toast: toast, setToast }}
      >
        <div className="app-container">
          {location.pathname === "/app" ? <Dashboard /> : <Outlet />}
        </div>
        <ToastContainer />
      </AppDataContext.Provider>
    </div>
  );
}

export default App;

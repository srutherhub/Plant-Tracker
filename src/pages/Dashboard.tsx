import { useState } from "react";
import { PlantsTable } from "../components/plants/PlantsTable";
import EmptyBox from "../lib/EmptyBox";
import { Plant } from "../models/plant";
import { useAppContext } from "../useAppContext";
import { Icon } from "../lib/Icon";
import { TooltipItem } from "../lib/TooltipItem";
import { TooltipText } from "../lib/TooltipText";
import { Box } from "../lib/Box";

interface ICoords {
  lat: number;
  lon: number;
}

export function Dashboard() {
  const [update, setUpdate] = useState(false);
  const context = useAppContext();
  const data = context?.plantsData;
  const today = new Date();
  interface ISortedPlants {
    today: Plant[];
    later: Plant[];
  }

  async function updatePage() {
    await getBrowserLoc();
    setUpdate(!update);
  }
  updatePage();

  const sortedPlants: ISortedPlants = { today: [], later: [] };
  data?.forEach((item) => {
    if (item.isWateringReqToday()) {
      sortedPlants.today.push(item);
    } else {
      sortedPlants.later.push(item);
    }
  });

  return (
    <div
      style={{
        padding: "1rem 0",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div
        style={{
          display: "flex inline",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <h1>Dashboard</h1>
        <Box
          display="flex"
          flexDirection="row"
          gap="1rem"
          alignContent="center"
        >
          {WeatherIcon()}
          <p>{today.toLocaleDateString()}</p>
        </Box>
      </div>
      {sortedPlants.today.length == 0 ? (
        <EmptyBox
          title={"Plants to water today"}
          text={"No plants to water today!"}
        ></EmptyBox>
      ) : (
        <PlantsTable
          title={"Plants to water today"}
          data={sortedPlants.today}
        />
      )}
      {sortedPlants.later.length == 0 ? (
        <EmptyBox
          title={"Hydrated"}
          text={"Go to Manage to add plants."}
        ></EmptyBox>
      ) : (
        <PlantsTable title={"Hydrated"} data={sortedPlants.later} />
      )}
    </div>
  );
}

enum EWeatherIcon {
  "Rain" = "bi bi-cloud-rain-heavy",
  "Thunderstorm" = "bi bi-cloud-lightning",
  "Drizzle" = "bi bi-cloud-drizzle",
  "Snow" = "bi bi-cloud-snow",
  "Atmosphere" = "bi bi-cloud-haze2",
  "Clear" = "bi bi-sun",
}

interface IWeatherInfo {
  main: string;
  desc: string;
  hum: number;
}

function WeatherIcon() {
  const info: string | null = window.sessionStorage.getItem("weather");
  let infoCopy: IWeatherInfo;
  if (info) {
    infoCopy = JSON.parse(info) as IWeatherInfo;
  } else return <div></div>;

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <TooltipItem>
        <p>Humidity: {infoCopy.hum}</p>
        <TooltipText>{humNote(infoCopy.hum)}</TooltipText>
      </TooltipItem>
      <TooltipItem>
        <Icon
          iconName={EWeatherIcon[infoCopy.main as keyof typeof EWeatherIcon]}
        />
        <TooltipText>{infoCopy.desc}</TooltipText>
      </TooltipItem>
    </div>
  );
}

async function getBrowserLoc() {
  let coords: string | null | ICoords = window.sessionStorage.getItem("coords");
  if (!coords) {
    try {
      const location = await new Promise<GeolocationPosition>((res, rej) => {
        navigator.geolocation.getCurrentPosition(
          (loc) => res(loc),
          (err) => {
            rej(err);
          }
        );
      });
      window.sessionStorage.setItem(
        "coords",
        JSON.stringify({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        })
      );
    } catch (err) {
      console.log(err);
    }
    coords = window.sessionStorage.getItem("coords") as string;
    coords = JSON.parse(coords) as ICoords;
    if (coords)
      fetch(
        `${import.meta.env.VITE_WEATHER_URL}lat=${coords.lat}&lon=${
          coords.lon
        }&appid=${import.meta.env.VITE_WEATHER_KEY}`
      )
        .then((res) => res.json())
        .then((data) =>
          window.sessionStorage.setItem(
            "weather",
            JSON.stringify({
              main: data.weather[0].main,
              desc: data.weather[0].description,
              hum: data.main.humidity,
            })
          )
        );
  }
}

function humNote(num: number): string {
  if (num <= 40) return "It is dry, consider misting your plants!";
  if (num > 40 && num <= 60) return "Ideal humidity, your plants are happy!";
  if (num > 60) return "It is wet, give your plants direct sunlight";
  else return "Humidity in your area";
}

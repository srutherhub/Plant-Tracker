import { useEffect, useState } from "react";
import { Icon } from "../../lib/Icon";
import { TooltipItem } from "../../lib/TooltipItem";
import { TooltipText } from "../../lib/TooltipText";
import { useWeather } from "./useWeather";

enum EWeatherIcon {
  "Rain" = "bi bi-cloud-rain-heavy",
  "Thunderstorm" = "bi bi-cloud-lightning",
  "Drizzle" = "bi bi-cloud-drizzle",
  "Snow" = "bi bi-cloud-snow",
  "Atmosphere" = "bi bi-cloud-haze2",
  "Clear" = "bi bi-sun",
  "Clouds" = "bi bi-clouds",
}

interface ICoords {
  lat: number;
  lon: number;
}

export function LocationInfo() {
  const [coords, setCoords] = useState<ICoords>();
  const { data, weather } = useWeather();
  const today = new Date();

  async function getLocation() {
    const location = (await getBrowserLoc()) as ICoords;
    if (typeof location == "string") setCoords(JSON.parse(location));
    else setCoords(location);

    if (coords) weather(coords.lat, coords.lon);
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (coords) weather(coords.lat, coords.lon);
  }, [coords, weather]);

  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      {data?.hum ? (
        <TooltipItem>
          <p>Humidity: {data?.hum}</p>
          <TooltipText>{data ? humNote(data.hum ?? 50) : "50"}</TooltipText>
        </TooltipItem>
      ) : (
        ""
      )}

      <TooltipItem>
        <Icon
          iconName={EWeatherIcon[data?.main as keyof typeof EWeatherIcon]}
        />
        <TooltipText>{data ? data.desc : "Loading"}</TooltipText>
      </TooltipItem>
      <p>{today.toLocaleDateString()}</p>
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
    return coords;
  } else {
    return coords;
  }
}

function humNote(num: number): string {
  if (num <= 40) return "It is dry, consider misting your plants!";
  if (num > 40 && num <= 60) return "Ideal humidity, your plants are happy!";
  if (num > 60) return "It is wet, give your plants direct sunlight";
  else return "Humidity in your area";
}

import { useCallback, useState } from "react";

export interface IWeatherInfo {
  main: string;
  desc: string;
  hum: number;
}

export function useWeather() {
  const [data, setData] = useState<IWeatherInfo | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const weather = useCallback(
    async (lat: number, lon: number) => {
      if (!lat || !lon) return { data, error, loading, weather };
      const cache = window.sessionStorage.getItem("weather");
      if (cache) setData(JSON.parse(cache));
      else {
        setLoading(true);
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_SERVER_URL
            }utils/getweather?lat=${lat}&lon=${lon}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer: ${sessionStorage.getItem(
                  "accessToken"
                )}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed load plant data");
          }
          const result = await response.json();
          setData({
            main: result.weather[0].main,
            desc: result.weather[0].description,
            hum: result.main.humidity,
          });
          window.sessionStorage.setItem(
            "weather",
            JSON.stringify({
              main: result.weather[0].main,
              desc: result.weather[0].description,
              hum: result.main.humidity,
            })
          );
        } catch (err) {
          if (err instanceof Error)
            setError(err.message || "An error occurred");
          else if (typeof err == "string") setError("Error occured");
        } finally {
          setLoading(false);
        }
      }
    },
    [data, error, loading]
  );

  return { data, loading, error, weather };
}

import { useCallback, useState } from "react";

export interface IWeatherInfo {
  main: string;
  desc: string;
  hum: number;
}

export function useWeather() {
  const [data, setData] = useState<IWeatherInfo | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const weather = useCallback(async (lat: number, lon: number) => {
    if (!lat || !lon) return { data, error, loading, weather };
    const cache = window.sessionStorage.getItem("weather");
    if (cache) setData(JSON.parse(cache));
    else {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_WEATHER_URL}lat=${lat}&lon=${lon}&appid=${
            import.meta.env.VITE_WEATHER_KEY
          }`
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
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return { data, loading, error, weather };
}

import { useCallback, useState } from "react";
import { Plant } from "../../models/plant";

export function usePlants() {
  const base_url = import.meta.env.VITE_SERVER_URL;
  const endpoint = "db/getplants";
  const fetch_url = base_url + endpoint;

  const [data, setData] = useState<Plant[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem("userId");

  const plants = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(fetch_url + `?id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${sessionStorage.getItem("accessToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed load plant data");
      }
      const result = await response.json();
      const plantInstances = result.map(
        ({
          id,
          name,
          type,
          species,
          last_watered,
          next_watering,
          location,
          watering_frequency,
        }: Plant) =>
          new Plant(
            id,
            name,
            type,
            species,
            last_watered,
            next_watering,
            location,
            watering_frequency
          )
      );
      setData(plantInstances);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An error occured");
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, data, plants };
}

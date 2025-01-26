import { useCallback, useState } from "react";
import { Plant } from "../../models/plant";

export function useUpdatePlant() {
  const base_url = import.meta.env.VITE_SERVER_URL;
  const endpoint = "db/updateplant";
  const fetch_url = base_url + endpoint;

  const [data, setData] = useState<null | Plant>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem("userId");

  const updateplant = useCallback(
    async (id: string, input: Plant) => {
      setLoading(true);
      try {
        const response = await fetch(fetch_url + `?id=${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${sessionStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ id: id, input: input }),
        });
        if (!response.ok) {
          throw new Error("Failed update plant data");
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
        setData(plantInstances[0]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "An error occured");
      } finally {
        setLoading(false);
      }
    },
    [fetch_url, userId]
  );

  return { loading, error, data, updateplant };
}

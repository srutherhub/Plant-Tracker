import { useCallback, useState } from "react";
import { Plant } from "../../models/plant";

export function useWaterPlant() {
  const base_url = import.meta.env.VITE_SERVER_URL;
  const endpoint = "db/waterplant";
  const fetch_url = base_url + endpoint;

  const [data, setData] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem("userId");

  const waterplant = useCallback(
    async (plant: Plant) => {
      setLoading(true);
      try {
        const response = await fetch(fetch_url + `?id=${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${sessionStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ plant: plant, userId: userId }),
        });
        if (!response.ok) {
          throw new Error("Failed to water plant");
        }
        const result = await response.json();
        setData(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [fetch_url, userId]
  );

  return { data, loading, error, waterplant };
}

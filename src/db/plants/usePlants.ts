import { useCallback, useState } from "react";
import { Plant } from "../../models/plant";

export function usePlants() {
  const base_url = import.meta.env.VITE_SERVER_URL;
  const endpoint = "db/getplants";
  const fetch_url = base_url + endpoint;

  const [data, setData] = useState<null | Plant[]>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const plants = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(fetch_url, { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed load plant data");
      }
      const result = await response.json();
      setData(result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An error occured");
    } finally {
      setLoading(false);
    }
  }, [fetch_url]);
  return { loading, error, data, plants };
}

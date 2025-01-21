import { useCallback, useState } from "react";
import { Plant } from "../../models/plant";

export function useUpdatePlant() {
  const base_url = import.meta.env.VITE_SERVER_URL;
  const endpoint = "db/updateplant";
  const fetch_url = base_url + endpoint;

  const [data, setData] = useState<null | Plant>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateplant = useCallback(
    async (id: string, input: Plant) => {
      setLoading(true);
      try {
        const response = await fetch(fetch_url, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id, input: input }),
        });
        if (!response.ok) {
          throw new Error("Failed update plant data");
        }
        const result = await response.json();
        setData(result[0]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "An error occured");
      } finally {
        setLoading(false);
      }
    },
    [fetch_url]
  );
  return { loading, error, data , updateplant };
}

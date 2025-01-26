import { useCallback, useState } from "react";
import { Plant } from "../../models/plant";

export function useAddPlant() {
  const base_url = import.meta.env.VITE_SERVER_URL;
  const endpoint = "db/addplant";
  const fetch_url = base_url + endpoint;

  const [data, setData] = useState<null | Plant>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem("userId");

  const addplant = useCallback(
    async (input: Plant) => {
      setLoading(true);
      try {
        const response = await fetch(fetch_url + `?id=${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${sessionStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ input: input }),
        });
        if (!response.ok) {
          throw new Error("Failed update plant data");
        }
        const result = await response.json();
        setData(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "An error occured");
      } finally {
        setLoading(false);
      }
    },
    [fetch_url, userId]
  );

  return { loading, error, data, addplant };
}

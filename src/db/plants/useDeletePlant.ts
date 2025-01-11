import { useCallback, useState } from "react";

export function useDeletePlant() {
  const base_url = import.meta.env.VITE_SERVER_URL;
  const endpoint = "db/deleteplant";
  const fetch_url = base_url + endpoint;

  const [data, setData] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteplant = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const response = await fetch(fetch_url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id }),
        });
        if (!response.ok) {
          throw new Error("Failed delete plant");
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
    [fetch_url]
  );

  return { data, loading, error, deleteplant };
}

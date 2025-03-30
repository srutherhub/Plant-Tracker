import { useCallback, useState } from "react";

export type TPlantAudit = {
  [date: string]: string[];
};

export function usePlantsAudit() {
  const base_url = import.meta.env.VITE_SERVER_URL;
  const endpoint = "db/getplantaudit";
  const fetch_url = base_url + endpoint;

  const [data, setData] = useState<TPlantAudit | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem("userId");

  const plantsaudit = useCallback(
    async (plantIds: string[]) => {
      setLoading(true);
      try {
        const response = await fetch(fetch_url + `?id=${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${sessionStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(plantIds),
        });
        if (!response.ok) {
          throw new Error("Failed load plants audit");
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
  return { loading, error, data, plantsaudit };
}

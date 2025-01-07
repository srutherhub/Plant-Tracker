import { useCallback, useState } from "react";

export function useAuth() {
  const base_url = import.meta.env.VITE_SERVER_URL;
  const endpoint = "authentication/signin";
  const fetch_url = base_url + endpoint;

  const [session, setSession] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(fetch_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to signup/sign in");
      }
      const result = await response.json();
      setSession(result);
    } catch (err: any) {
      setError(err.message || "an error occured");
    } finally {
      setLoading(false);
    }
  }, []);
  return { loading, error, session, auth };
}

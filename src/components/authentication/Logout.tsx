import { Button } from "../../lib/Button";
import { useAuth } from "./useAuth";

export function Logout() {
  const { auth } = useAuth({ endpoint: "authentication/signout" });

  const handleOnClick = () => {
    auth();
  };

  return <Button name={"Log out"} onclick={handleOnClick} />;
}

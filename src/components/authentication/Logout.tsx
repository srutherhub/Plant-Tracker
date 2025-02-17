import { Button, EButtonTypes } from "../../lib/Button";
import { useAuth } from "./useAuth";

export function Logout() {
  const { auth } = useAuth({ endpoint: "authentication/signout" });

  const handleOnClick = () => {
    auth();
  };

  return (
    <Button
      type={EButtonTypes.secondary}
      name={"Log out"}
      onclick={handleOnClick}
    />
  );
}

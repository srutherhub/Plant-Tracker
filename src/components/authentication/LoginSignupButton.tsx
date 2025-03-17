import { Button, EButtonTypes } from "../../lib/Button";
import { useNavigate } from "react-router";

export const LoginSignupButton = () => {
  const redirect = useNavigate();

  const handleclick = () => {
    redirect("/auth");
  };

  return (
    <Button
      type={EButtonTypes.secondary}
      name="Login / Sign up"
      onclick={() => handleclick()}
    />
  );
};

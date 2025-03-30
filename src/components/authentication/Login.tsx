import { useEffect, useState } from "react";
import { Box } from "../../lib/Box";
import { TextInput } from "../../lib/TextInput";
import { Button, EButtonTypes } from "../../lib/Button";
import { Navbar } from "../navbar/Navbar";
import { useAuth } from "./useAuth";
import { Link } from "react-router";
import { useNavigate } from "react-router";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, auth } = useAuth({ endpoint: "authentication/signin" });
  const navigate = useNavigate();

  const handleOnClick = () => {
    auth(email, password);
  };

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) navigate("/app");
  }, []);

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "4rem",
        }}
      >
        <Box
          width="22rem"
          alignItems="center"
          display="flex"
          gap="2rem"
          padding="4rem 0"
        >
          <h2>Welcome back</h2>
          <div
            style={{ display: "inherit", flexDirection: "column", gap: "1rem" }}
          >
            <TextInput placeholder="Email" setData={setEmail} />
            <TextInput
              placeholder="Password"
              type="password"
              setData={setPassword}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "0.75rem",
                width: "16.5rem",
              }}
            >
              <Link to="/passwordreset">Forgot password?</Link>
              <Link to="/signup">Signup</Link>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "16.5rem",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ width: "16.5rem" }}>
              <Button
                type={EButtonTypes.tertiary}
                name="Login"
                onclick={handleOnClick}
              />
            </div>
          </div>
        </Box>
        <>{error}</>
      </div>
    </div>
  );
}

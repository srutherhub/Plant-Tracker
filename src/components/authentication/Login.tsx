import { useState } from "react";
import { Box } from "../../lib/Box";
import { TextInput } from "../../lib/TextInput";
import { Button, EButtonTypes } from "../../lib/Button";
import { Navbar } from "../navbar/Navbar";
import { useAuth } from "./useAuth";
import { Link } from "react-router";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, auth } = useAuth({ endpoint: "authentication/signin" });

  const handleOnClick = () => {
    auth(email, password);
  };

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
          width="24rem"
          alignItems="center"
          display="flex"
          gap="1rem"
          padding="4rem 0"
        >
          <p>Sign in or Sign up</p>
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

import { useState } from "react";
import { Box } from "../../lib/Box";
import { TextInput } from "../../lib/TextInput";
import { Button, EButtonTypes } from "../../lib/Button";
import { Navbar } from "../navbar/Navbar";
import { useAuth } from "./useAuth";
import { Link } from "react-router";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const { error, auth } = useAuth({ endpoint: "authentication/signup" });

  const handleOnClick = () => {
    if (password != confPassword) console.log("hello");
    else auth(email, password);
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
          gap="2rem"
          padding="4rem 0"
        >
          <h3>Create an account</h3>
          <div
            style={{
              display: "inherit",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <TextInput
              placeholder="Email"
              setData={setEmail}
              autocomplete="off"
            />
            <TextInput
              placeholder="Password"
              type="password"
              setData={setPassword}
              autocomplete="new-password"
            />
            <TextInput
              placeholder="Confirm password"
              type="password"
              setData={setConfPassword}
              autocomplete="new-password"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "0.75rem",
                width: "16.5rem",
              }}
            >
              <Link to="/auth">Sign in</Link>
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
                name="Sign up"
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

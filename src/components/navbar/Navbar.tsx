import { Logout } from "../authentication/Logout";

export enum ENavOptions {
  dashboard = "Dashboard",
  manage = "Manage",
}

export function Navbar(props) {
  const { navSelect, setNavSelect } = props;

  const navStyle = {
    padding: "1rem",
    height: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const navOptions = [
    { path: "/app", label: ENavOptions.dashboard },
    { path: "/manage", label: ENavOptions.manage },
  ];

  const navMap = navOptions.map((option, key) => {
    return (
      <p
        key={key}
        style={{
          padding: "0.5rem",
          margin: "0.25rem",
          borderRadius: "0.5rem",
          backgroundColor:
            navSelect == option.label ? "var(--secondary-accent)" : "",
        }}
        onClick={() => setNavSelect(option.label)}
      >
        {option.label}
      </p>
    );
  });

  const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "4rem auto 4rem",
        backgroundColor: "var(--primary-accent)",
      }}
    >
      <div></div>
      <div style={navStyle}>{navMap}</div>
      <div>{isLoggedIn ? <Logout /> : "Login"}</div>
    </div>
  );
}

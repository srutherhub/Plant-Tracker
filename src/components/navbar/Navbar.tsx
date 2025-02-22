import { Logout } from "../authentication/Logout";
import { LoginSignupButton } from "../authentication/LoginSignupButton";

export enum ENavOptions {
  dashboard = "Dashboard",
  manage = "Manage",
}

interface INavbarProps {
  navSelect?: string;
  setNavSelect?: React.Dispatch<React.SetStateAction<string>>;
}

export function Navbar(props: INavbarProps) {
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
        className="nav-option"
        key={key}
        style={{
          padding: "0.5rem",
          margin: "0.25rem",
          borderRadius: "0.5rem",
          backgroundColor:
            navSelect == option.label ? "var(--secondary-accent)" : "",
        }}
        onClick={() => {
          if (setNavSelect) setNavSelect(option.label);
        }}
      >
        {option.label}
      </p>
    );
  });

  const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;

  if (isLoggedIn) {
    return (
      <div
        style={{
          display: "grid",
          padding:"0 1rem",
          gridTemplateColumns: "8rem auto 8rem",
          backgroundColor: "var(--primary-accent)",
        }}
      >
        <div></div>
        <div style={navStyle}>{navMap}</div>
        <div style={{ alignContent: "center"}}>
          <Logout />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        padding:"0 1rem",
        gridTemplateColumns: "8rem auto 8rem",
        backgroundColor: "var(--primary-accent)",
      }}
    >
      <div></div>
      <div style={navStyle}></div>
      <div style={{ alignContent: "center"}}>
        <LoginSignupButton />
      </div>
    </div>
  );
}

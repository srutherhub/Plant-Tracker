export function Button({ ...props }) {
  return (
    <div>
      {" "}
      <button
        onClick={props.onclick}
        style={{
          border: "1px solid var(--border)",
          width: "100%",
          padding: "0.5rem",
          borderRadius: "0.5rem",
        }}
      >
        <i className={props.iconName || ""}></i>
        {` ${props.name}`}
      </button>
    </div>
  );
}

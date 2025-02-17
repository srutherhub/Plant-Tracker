interface IButtonProps {
  type: EButtonTypes;
  name: string;
  iconName?: string;
  onclick: () => void;
}

export enum EButtonTypes {
  primary = "lib-button-primary",
  secondary = "lib-button-secondary",
}

export function Button(props: IButtonProps) {
  return (
    <div>
      <button
        className={props.type}
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

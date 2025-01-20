interface IIcon {
  iconName: string;
  loading?: boolean;
  loadingIconName?: string
  onclick?: () => void;
}

export function Icon(props: IIcon) {
  const { iconName, loading, loadingIconName, onclick } = props;
  if (loading === true) {
    return <i
      id="Icon"
      className={loadingIconName || iconName}
      onClick={onclick}
      style={{ paddingLeft: "0.5rem", color: "var(--border)", cursor: "pointer" }}
    ></i>;
  } else {
    return (
      <i
        id="Icon"
        className={iconName}
        onClick={onclick}
        style={{ paddingLeft: "0.5rem", color: "var(--border)" }}
      ></i>
    );
  }
}

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
      className={loadingIconName || iconName}
      onClick={onclick}
      style={{ paddingLeft: "0.5rem", color: "var(--border)" }}
    ></i>;
  } else {
    return (
      <i
        className={iconName}
        onClick={onclick}
        style={{ paddingLeft: "0.5rem", color: "var(--border)" }}
      ></i>
    );
  }
}

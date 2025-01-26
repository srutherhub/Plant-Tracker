interface IIcon {
  iconName: string;
  loading?: boolean;
  loadingIconName?: string;
  onclick?: () => void;
  iconColor?: string;
}

export function Icon(props: IIcon) {
  const { iconName, loading, loadingIconName, iconColor, onclick } = props;
  if (loading === true) {
    return (
      <i
        id="Icon"
        className={loadingIconName || iconName}
        onClick={onclick}
        style={{ color: iconColor || "var(--border)", cursor: "pointer" }}
      ></i>
    );
  } else {
    return (
      <i
        id="Icon"
        className={iconName}
        onClick={onclick}
        style={{ color: iconColor || "var(--border)" }}
      ></i>
    );
  }
}

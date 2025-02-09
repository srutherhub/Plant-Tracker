interface IIcon {
  iconName: string;
  loading?: boolean;
  loadingIconName?: string;
  onclick?: () => void;
  iconColor?: string;
}

export function Icon(props: IIcon) {
  const { iconName, loading, loadingIconName, onclick } = props;
  if (loading === true) {
    return (
      <i
        id="Icon"
        className={loadingIconName || iconName}
        onClick={onclick}
      ></i>
    );
  } else {
    return (
      <i
        id="Icon"
        className={iconName}
        onClick={onclick}
      ></i>
    );
  }
}

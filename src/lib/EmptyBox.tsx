import { Box } from "./Box";

interface IEmptyBoxProps {
  title: string;
  text: string;
}

export default function EmptyBox(props: IEmptyBoxProps) {
  const { title, text } = props;
  return (
    <Box padding="1rem" height="4rem">
      <h3>{title}</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <p>{text}</p>
      </div>
    </Box>
  );
}

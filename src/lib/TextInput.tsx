import { useEffect, useState } from "react";

interface ITextInputProps {
  setData: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string | null;
  type?: string;
}

export function TextInput(props: ITextInputProps) {
  const { placeholder, type, setData } = props;
  const [val, setVal] = useState("");

  useEffect(() => {
    setData(val);
  }, [val]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  return (
    <div style={{ paddingBottom: "1rem" }}>
      <input
        type={type}
        value={val}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          background: "transparent",
          outline: "none",
          width: "16rem",
          height: "2rem",
          border: "1px solid gray",
          fontFamily: "Inter, serif",
          fontSize: "1rem",
          padding: "0.25rem",
        }}
      />
    </div>
  );
}

import { useEffect, useState } from "react";

interface ITextInputProps {
  setData: React.Dispatch<React.SetStateAction<any>>;
  placeholder?: string | null | undefined;
  type?: string;
  value?: string
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
    <div>
      <input
        type={type}
        value={val}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}

import { TextFieldTypes } from "@ionic/core";
import { useState } from "react";
const useInputValue = (label: string, type: TextFieldTypes = "text") => {
  const [value, setValue] = useState("");
  return {
    dispatch: setValue,
    label,
    type,
    value,
  };
};

export default useInputValue;

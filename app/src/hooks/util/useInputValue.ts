import { TextFieldTypes } from "@ionic/core";
import { useState } from "react";
const useInputValue = (label: string, type: TextFieldTypes = "text") => {
  const [value, setValue] = useState("");
  return {
    label: label,
    value,
    dispatch: setValue,
    type,
  };
};

export default useInputValue;

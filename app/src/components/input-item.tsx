import { TextFieldTypes } from "@ionic/core";
import { IonInput, IonItem, IonLabel } from "@ionic/react";
import React from "react";

const InputItem = React.memo(
  ({
    label,
    value,
    dispatch,
    type = "text",
  }: {
    label: string;
    value: string;
    dispatch: React.Dispatch<React.SetStateAction<string>>;
    type: TextFieldTypes;
  }) => (
    <IonItem>
      <IonLabel position="floating">{label}</IonLabel>
      <IonInput
        value={value}
        onIonChange={(event) => dispatch(event.detail.value!)}
        placeholder={`${label}を入力`}
        type={type}
      ></IonInput>
    </IonItem>
  )
);

export default InputItem;

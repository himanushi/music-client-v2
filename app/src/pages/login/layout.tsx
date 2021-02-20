import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonList,
  IonText,
} from "@ionic/react";
import InputItem from "components/input-item";
import useInputValue from "hooks/util/use-input-value";
import { LoginProps } from "pages/login/use-controller";
import React from "react";

type Props = {
  login: (props: LoginProps) => void;
  error?: string;
};

export const Layout: React.FC<Props> = ({ login, error }) => {
  const username = useInputValue("ユーザーID");
  const password = useInputValue("パスワード", "password");
  const input = {
    password: password.value,
    username: username.value,
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>ログイン</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <InputItem {...username} />
          <InputItem {...password} />
          <IonItem lines="none">
            <IonButton
              onClick={(event) => {
                login({ event, input });
              }}
              size="default"
            >
              ログイン
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonText style={{ fontSize: 16 }} color="danger">
              {error}
            </IonText>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

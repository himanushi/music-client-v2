import { IonSearchbar, IonToolbar } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";

const Component = React.memo(() => {
  const [value, setValue] = useState("");
  const history = useHistory();

  const onKeyDown = (event: React.KeyboardEvent<HTMLIonSearchbarElement>) => {
    if (event.key === "Enter") {
      history.push(`/albums?bq=${value}`);
    }
  };

  return (
    <IonToolbar>
      <IonSearchbar
        type="search"
        slot="start"
        onIonChange={(e) => setValue(e.detail.value!)}
        placeholder="アルバム検索"
        animated
        {...{ value, onKeyDown }}
      />
    </IonToolbar>
  );
});

export default Component;

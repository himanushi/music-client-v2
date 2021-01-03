import { IonToast } from "@ionic/react";
import React, { useMemo, useState } from "react";

export const Loading = () => {
  return useMemo(() => <>loading...</>, []);
};

export const Error = ({ message }: { message: string }) => {
  const [open, setOpen] = useState(true);

  return useMemo(
    () => (
      <IonToast
        color="danger"
        isOpen={open}
        onDidDismiss={() => setOpen(false)}
        message={message}
        duration={10000}
        position="bottom"
      />
    ),
    [message, open]
  );
};

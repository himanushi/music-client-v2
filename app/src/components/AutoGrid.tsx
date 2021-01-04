import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { useWindowWidth } from "@react-hook/window-size";
import React, { useMemo } from "react";

export const AutoGrid = ({ items, width }: { items: any[]; width: number }) => {
  const windowWidth = useWindowWidth();
  const columnsLength = useMemo(() => {
    return Math.floor(windowWidth / width);
  }, [width, windowWidth]);

  let rows: JSX.Element[] = [];
  for (var i = 0, l = items.length; i < l; i += columnsLength) {
    const columnItems = items.slice(i, i + columnsLength);

    const row = (
      <IonRow key={i} className="ion-justify-content-center ion-no-padding">
        {columnItems.map((item, index) => (
          <IonCol
            key={index}
            className="ion-justify-content-center ion-no-padding"
          >
            {item}
          </IonCol>
        ))}
      </IonRow>
    );

    rows.push(row);
  }

  return <IonGrid>{rows}</IonGrid>;
};

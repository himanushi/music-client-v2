import { IonRow } from "@ionic/react";
import { useWindowWidth } from "@react-hook/window-size";
import React from "react";

const useAutoFixedRows = ({
  items,
  itemWidth,
}: {
  items: any[];
  itemWidth: number;
}) => {
  const windowWidth = useWindowWidth();
  const columnsLength = Math.floor(windowWidth / itemWidth);

  let rows: JSX.Element[] = [];
  for (var i = 0, l = items.length; i < l; i += columnsLength) {
    const columnItems = items.slice(i, i + columnsLength);

    const row = (
      <IonRow key={i} className="ion-justify-content-center ion-no-padding">
        {columnItems.map((item, index) => (
          <IonRow
            key={index}
            className="ion-justify-content-center ion-no-padding"
          >
            {item}
          </IonRow>
        ))}
      </IonRow>
    );

    rows.push(row);
  }

  return rows;
};

export default useAutoFixedRows;

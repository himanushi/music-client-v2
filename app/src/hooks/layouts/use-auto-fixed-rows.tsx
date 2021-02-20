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

  const rows: JSX.Element[] = [];
  for (
    let index = 0, { length } = items;
    index < length;
    index += columnsLength
  ) {
    const columnItems = items.slice(index, index + columnsLength);
    rows.push(<Row columnItems={columnItems} />);
  }

  return rows;
};

export default useAutoFixedRows;

const Row: React.FC<{ columnItems: JSX.Element[] }> = ({ columnItems }) => (
  <IonRow className="ion-justify-content-center ion-no-padding">
    {columnItems.map((item, index) => (
      <InnerRow key={index} item={item} />
    ))}
  </IonRow>
);

const InnerRow: React.FC<{ item: JSX.Element }> = ({ item }) => (
  <IonRow className="ion-justify-content-center ion-no-padding">{item}</IonRow>
);

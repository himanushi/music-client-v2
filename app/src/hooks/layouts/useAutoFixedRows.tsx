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
    rows.push(<Row columnItems={columnItems} />);
  }

  return rows;
};

export default useAutoFixedRows;

const Row: React.FC<{ columnItems: JSX.Element[] }> = ({ columnItems }) => {
  return (
    <IonRow className="ion-justify-content-center ion-no-padding">
      {columnItems.map((item, index) => (
        <InnerRow key={index} item={item} />
      ))}
    </IonRow>
  );
};

const InnerRow: React.FC<{ item: JSX.Element }> = ({ item }) => {
  return (
    <IonRow className="ion-justify-content-center ion-no-padding">
      {item}
    </IonRow>
  );
};

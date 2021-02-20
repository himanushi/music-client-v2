import { IonIcon, IonSkeletonText } from "@ionic/react";
import Slot from "components/slot";
import { image } from "ionicons/icons";
import React from "react";

const SquareImage = ({
  name,
  src,
  width,
}: {
  name: string;
  src?: string | null;
  width: number;
}) => {
  if (src) {
    return (
      <img
        alt={name}
        style={{ height: width, objectFit: "cover", width }}
        src={src}
      />
    );
  }
  return (
    <Slot
      item={<IonIcon size="large" icon={image} />}
      layout={<IonSkeletonText style={{ height: width, width }} />}
      center={true}
      itemWidth={32}
      itemHeight={32}
    />
  );
};

export default SquareImage;

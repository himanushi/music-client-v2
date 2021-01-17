import { IonIcon, IonSkeletonText } from "@ionic/react";
import Slot from "components/Slot";
import { image } from "ionicons/icons";
import React from "react";

const SquareImage = ({
  name,
  src,
  width,
}: {
  name: string;
  src?: string;
  width: number;
}) => {
  if (src) {
    return (
      <img
        alt={name}
        style={{ width, height: width, objectFit: "cover" }}
        src={src}
      />
    );
  } else {
    return (
      <Slot
        put={<IonIcon size="large" icon={image} />}
        layout={<IonSkeletonText style={{ width, height: width }} />}
        x="center"
        y="center"
      />
    );
  }
};

export default SquareImage;

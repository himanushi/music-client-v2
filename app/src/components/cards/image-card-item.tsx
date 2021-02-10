import CardTitle from "components/cards/card-title";
import SquareImage from "components/square-image";
import React from "react";

const ImageCardItem = ({
  name,
  src,
  width,
}: {
  name: string;
  src?: string;
  width: number;
}) => {
  return (
    <>
      <SquareImage name={name} src={src} width={width} />
      <CardTitle title={name} />
    </>
  );
};

export default ImageCardItem;

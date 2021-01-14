import React from "react";

const SquareImage = ({
  name,
  src,
  width,
}: {
  name: string;
  src?: string;
  width: number;
}) => <img alt={name} style={{ width, height: width }} src={src || ""} />;

export default SquareImage;

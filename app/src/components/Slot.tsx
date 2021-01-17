import React from "react";

const Slot = ({
  put,
  layout,
  x,
  y,
}: {
  put: React.ReactNode;
  layout: React.ReactNode;
  x: string;
  y: string;
}) => {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute" }}>{put}</div>
      <div>{layout}</div>
    </div>
  );
};

export default Slot;

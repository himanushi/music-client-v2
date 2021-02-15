import React, { CSSProperties } from "react";

const Slot = ({
  item,
  layout,
  center = false,
  itemWidth,
  itemHeight,
}: {
  item: React.ReactNode;
  layout: React.ReactNode;
  center: boolean;
  itemWidth?: number;
  itemHeight?: number;
}) => {
  let style: CSSProperties = { position: "absolute" };

  if (center && itemWidth && itemHeight) {
    style = {
      ...style,
      margin: "auto",
      inset: 0,
      width: itemWidth,
      height: itemHeight,
    };
  }

  return (
    <div style={{ position: "relative" }}>
      <div style={style}>{item}</div>
      <div>{layout}</div>
    </div>
  );
};

export default Slot;

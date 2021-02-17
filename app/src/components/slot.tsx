import React, { CSSProperties } from "react";

const Slot = ({
  item,
  layout,
  center = false,
  itemWidth,
  itemHeight,
  top,
  bottom,
  left,
  right,
}: {
  item: React.ReactNode;
  layout: React.ReactNode;
  center?: boolean;
  itemWidth?: number;
  itemHeight?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
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

  if (top !== undefined) style = { ...style, top };
  if (bottom !== undefined) style = { ...style, bottom };
  if (left !== undefined) style = { ...style, left };
  if (right !== undefined) style = { ...style, right };

  return (
    <div style={{ position: "relative" }}>
      <div>{layout}</div>
      <div style={style}>{item}</div>
    </div>
  );
};

export default Slot;

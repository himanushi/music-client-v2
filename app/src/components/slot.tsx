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
  let style: CSSProperties = { lineHeight: "0px", position: "absolute" };

  if (center) {
    style = {
      ...style,
      inset: 0,
      margin: "auto",
    };
  }

  if (itemHeight !== undefined) style = { ...style, height: itemHeight };
  if (itemWidth !== undefined) style = { ...style, width: itemWidth };
  if (top !== undefined) style = { ...style, top };
  if (bottom !== undefined) style = { ...style, bottom };
  if (left !== undefined) style = { ...style, left };
  if (right !== undefined) style = { ...style, right };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ lineHeight: "0px" }}>{layout}</div>
      <div style={style}>{item}</div>
    </div>
  );
};

export default Slot;

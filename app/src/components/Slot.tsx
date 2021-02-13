import React, { CSSProperties, useCallback, useRef, useState } from "react";

// Shadow CSS により div が強制的に block 要素になるため仕方なくサイズを指定する
const Slot = ({
  put,
  layout,
  center,
}: {
  put: React.ReactNode;
  layout: React.ReactNode;
  center: boolean;
}) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const div = useCallback((node) => {
    if (node !== null && node.children[0]) {
      setHeight(node.children[0].clientHeight);
      setWidth(node.children[0].clientWidth);
    }
  }, []);

  let defaultStyle: CSSProperties = {
    position: "absolute",
    height,
    width,
    display: "inline",
  };

  if (center) {
    defaultStyle["margin"] = "auto";
    defaultStyle["inset"] = 0;
  }

  return (
    <div style={{ position: "relative" }}>
      <div style={defaultStyle} ref={div}>
        {put}
      </div>
      <div>{layout}</div>
    </div>
  );
};

export default Slot;

import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import useAutoFixedRows from "./useAutoFixedRows";

const InfiniteList = ({
  items,
  itemWidth,
  itemHeight,
}: {
  items: any[];
  itemWidth: number;
  itemHeight: number;
}) => {
  const rows = useAutoFixedRows({ items, itemWidth });

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          itemCount={rows.length}
          itemSize={itemHeight}
          width={width}
        >
          {({ index, style }) => (
            <div key={index} style={style}>
              {rows[index]}
            </div>
          )}
        </List>
      )}
    </AutoSizer>
  );
};

export default InfiniteList;

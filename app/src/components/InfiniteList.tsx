import useAutoFixedRows from "hooks/layouts/useAutoFixedRows";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
// import InfiniteLoader from "react-window-infinite-loader";

const InfiniteList = ({
  items,
  itemWidth,
  itemHeight,
  loadMore,
}: {
  items: any[];
  itemWidth: number;
  itemHeight: number;
  loadMore: (startIndex: number, stopIndex: number) => Promise<any>;
}) => {
  const rows = useAutoFixedRows({ items, itemWidth });

  return (
    <AutoSizer>
      {({ height, width }) => (
        // <InfiniteLoader
        //   isItemLoaded={(index: number) => false}
        //   itemCount={rows.length + 1}
        //   loadMoreItems={loadMore}
        //   threshold={40}
        //   minimumBatchSize={50}
        // >
        //   {({ onItemsRendered, ref }) => (
        <List
          // onItemsRendered={onItemsRendered}
          // ref={ref}
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
        //   )}
        // </InfiniteLoader>
      )}
    </AutoSizer>
  );
};

export default InfiniteList;

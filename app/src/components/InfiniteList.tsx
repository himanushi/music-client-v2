import useAutoFixedRows from "hooks/layouts/useAutoFixedRows";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

type LoadMore = (
  rowIndex: number,
  rowCount: number,
  itemCount: number
) => Promise<any>;

const InfiniteList = ({
  items,
  itemWidth,
  itemHeight,
  loadMore,
}: {
  items: any[];
  itemWidth: number;
  itemHeight: number;
  loadMore: LoadMore;
}) => {
  const rows = useAutoFixedRows({ items, itemWidth });

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={(index) => false}
          itemCount={rows.length + 1}
          loadMoreItems={(_startIndex: number, stopIndex: number) =>
            loadMore(stopIndex, rows.length, items.length)
          }
          threshold={1}
          minimumBatchSize={10}
        >
          {({ ref, onItemsRendered }) => {
            return (
              <List
                ref={ref}
                onItemsRendered={onItemsRendered}
                height={height}
                width={width}
                itemCount={rows.length}
                itemSize={itemHeight}
              >
                {({ index, style }) => {
                  return (
                    <div key={index} style={style}>
                      {rows[index]}
                    </div>
                  );
                }}
              </List>
            );
          }}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};

export default InfiniteList;

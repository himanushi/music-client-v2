import useAutoFixedRows from "hooks/layouts/use-auto-fixed-rows";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

export type loadMore = (
  rowIndex: number,
  rowCount: number,
  itemCount: number
) => Promise<any>;

export type hasNext = () => boolean;

const InfiniteList = ({
  items,
  itemWidth,
  itemHeight,
  loadMore,
  hasNext,
}: {
  items: any[];
  itemWidth: number;
  itemHeight: number;
  loadMore: loadMore;
  hasNext: hasNext;
}) => {
  const rows = useAutoFixedRows({ itemWidth, items });

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={() => !hasNext()}
          itemCount={rows.length + 1}
          loadMoreItems={(_startIndex: number, stopIndex: number) =>
            loadMore(stopIndex, rows.length, items.length)
          }
          threshold={1}
          minimumBatchSize={10}
        >
          {({ ref, onItemsRendered }) => (
            <List
              ref={ref}
              onItemsRendered={onItemsRendered}
              height={height}
              width={width}
              itemCount={rows.length}
              itemSize={itemHeight}
              itemData={rows}
            >
              {({ data, index, style }) => (
                <div key={index} style={style}>
                  {data[index]}
                </div>
              )}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};

export default InfiniteList;

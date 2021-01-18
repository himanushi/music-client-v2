import { IonSearchbar, IonToolbar } from "@ionic/react";
import ImageCardLink from "components/cards/ImageCardLink";
import InfiniteList, { hasNext, loadMore } from "components/InfiniteList";
import { Album } from "graphql/types";
import useCardImageItemSize from "hooks/layouts/useCardImageItemSize";
import React, { useState } from "react";

type Props = {
  albums: Album[];
  loadMore: loadMore;
  hasNext: hasNext;
};

export const Layout: React.FC<Props> = ({ albums, loadMore, hasNext }) => {
  const { cardWidth, cardHeight, parentWidth } = useCardImageItemSize();

  const items = albums.map((album) => <Item album={album} width={cardWidth} />);

  return (
    <InfiniteList
      items={items}
      itemWidth={parentWidth}
      itemHeight={cardHeight}
      loadMore={loadMore}
      hasNext={hasNext}
    />
  );
};

export const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <IonToolbar>
      <IonSearchbar
        value={searchText}
        onIonChange={(e) => setSearchText(e.detail.value!)}
        cancelButtonText="キャンセル"
        placeholder="アルバム検索"
      ></IonSearchbar>
    </IonToolbar>
  );
};

type ItemProps = {
  album: Album;
  width: number;
};

const Item = React.memo((props: ItemProps) => {
  return (
    <ImageCardLink
      name={props.album.name}
      src={props.album.artworkM.url as string | undefined}
      width={props.width}
      link={`/albums/${props.album.id}`}
    />
  );
});

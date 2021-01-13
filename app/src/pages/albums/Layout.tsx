import { IonContent } from "@ionic/react";
import ImageCardLink from "components/cards/ImageCardLink";
import InfiniteList, { isLoaded, loadMore } from "components/InfiniteList";
import { Album } from "graphql/types";
import useCardItemSize from "hooks/layouts/useCardItemSize";
import React from "react";

type Props = {
  albums: Album[];
  loadMore: loadMore;
  isLoaded: isLoaded;
};

export const Layout: React.FC<Props> = ({ albums, loadMore, isLoaded }) => {
  const { cardWidth, cardHeight, parentWidth } = useCardItemSize();

  const items = albums.map((album) => <Item album={album} width={cardWidth} />);

  return (
    <IonContent className="ion-no-padding">
      <InfiniteList
        items={items}
        itemWidth={parentWidth}
        itemHeight={cardHeight}
        loadMore={loadMore}
        isLoaded={isLoaded}
      />
    </IonContent>
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
      src={props.album.artworkM.url}
      width={props.width}
      link={`/albums/${props.album.id}`}
    />
  );
});

import { IonButton, IonIcon, IonSearchbar, IonToolbar } from "@ionic/react";
import ImageCardLink from "components/cards/ImageCardLink";
import InfiniteList, { hasNext, loadMore } from "components/InfiniteList";
import { Album } from "graphql/types";
import useCardImageItemSize from "hooks/layouts/useCardImageItemSize";
import { ellipsisVertical } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";

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
  const history = useHistory();
  const [searchText, setSearchText] = useState("");

  const onKeyUp = (event: React.KeyboardEvent<HTMLIonSearchbarElement>) => {
    if (event.key === "Enter") {
      history.push(`/albums?bq=${searchText}`);
    }
  };

  return (
    <IonToolbar>
      <IonSearchbar
        value={searchText}
        onIonChange={(e) => setSearchText(e.detail.value!)}
        onKeyUp={onKeyUp}
        placeholder="アルバム検索"
        enterkeyhint="enter"
        slot="start"
      />
      <IonButton fill="clear" slot="end">
        <IonIcon icon={ellipsisVertical} />
      </IonButton>
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

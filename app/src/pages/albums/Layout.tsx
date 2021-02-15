import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonRippleEffect,
  IonRow,
  IonSearchbar,
  IonToolbar,
} from "@ionic/react";
import ImageCardItem from "components/cards/image-card-item";
import InfiniteList, { hasNext, loadMore } from "components/infinite-list";
import Slot from "components/slot";
import { Album, AlbumsQueryVariables } from "graphql/types";
import * as H from "history";
import useCardImageItemSize from "hooks/layouts/use-card-image-item-size";
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

export const SearchBar = ({
  history,
  params,
}: {
  history: H.History;
  params: AlbumsQueryVariables;
}) => {
  const [searchText, setSearchText] = useState(params.conditions?.name ?? "");

  const onKeyUp = (event: React.KeyboardEvent<HTMLIonSearchbarElement>) => {
    if (event.key === "Enter") {
      const link = searchText === "" ? "/albums" : `/albums?bq=${searchText}`;
      history.push(link);
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
  const history = useHistory();

  const item = (
    <IonGrid className="ion-no-padding">
      <IonRow>
        {props.album.appleMusicAlbum && <AppleMusic />}
        {props.album.itunesAlbum && <ItunesMusic />}
        {props.album.spotifyAlbum && <Spotify />}
      </IonRow>
    </IonGrid>
  );

  return (
    <IonCard
      className="ion-activatable ripple-parent"
      onClick={() => history.push(`/albums/${props.album.id}`)}
      style={{ width: props.width, cursor: "pointer" }}
    >
      <Slot
        layout={
          <ImageCardItem
            name={props.album.name}
            src={props.album.artworkM.url ?? ""}
            width={props.width}
          />
        }
        item={item}
      />
      <IonRippleEffect></IonRippleEffect>
    </IonCard>
  );
});

const AppleMusic = () => (
  <IonCol>
    <MusicService alphabet="A" color="#ff2f56" />
  </IonCol>
);
const ItunesMusic = () => (
  <IonCol>
    <MusicService alphabet="iT" color="#0070c9" />
  </IonCol>
);
const Spotify = () => (
  <IonCol>
    <MusicService alphabet="S" color="#1DB954" />
  </IonCol>
);

const musicServiceIconStyle = {
  width: "15px",
  height: "15px",
  borderRadius: "50%",
  fontSize: "10px",
  color: "#fff",
  lineHeight: "15px",
  textAlign: "center" as "center",
  background: "#000",
};

const MusicService = (props: { alphabet: string; color: string }) => {
  return (
    <div style={{ ...musicServiceIconStyle, backgroundColor: props.color }}>
      {props.alphabet}
    </div>
  );
};

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
import CardTitle from "components/cards/card-title";
import FavoriteComponent from "components/favorite-icon/component";
import InfiniteList, { hasNext, loadMore } from "components/infinite-list";
import Slot from "components/slot";
import SquareImage from "components/square-image";
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

export const Layout: React.FC<Props> = (props) => {
  const { cardWidth, cardHeight, parentWidth } = useCardImageItemSize();

  const items = props.albums.map((album) => (
    <Item album={album} width={cardWidth} />
  ));

  return (
    <InfiniteList
      items={items}
      itemWidth={parentWidth}
      itemHeight={cardHeight}
      loadMore={props.loadMore}
      hasNext={props.hasNext}
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
        onIonChange={(event) => setSearchText(event.detail.value!)}
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

const Item = (props: ItemProps) => {
  const history = useHistory();

  const services = (
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
      style={{ cursor: "pointer", width: props.width }}
    >
      <Slot
        item={<FavoriteComponent id={props.album.id} model={"album"} />}
        top={5}
        right={5}
        layout={
          <Slot
            item={services}
            bottom={5}
            left={5}
            layout={
              <SquareImage
                onClick={() => history.push(`/albums/${props.album.id}`)}
                name={props.album.name}
                src={props.album.artworkM.url}
                width={props.width}
              />
            }
          />
        }
      />
      <CardTitle title={props.album.name} />
      <IonRippleEffect></IonRippleEffect>
    </IonCard>
  );
};

const MusicServiceCol = ({ children }: { children: JSX.Element }) => (
  <IonCol style={{ padding: "1px" }}>{children}</IonCol>
);

const AppleMusic = () => (
  <MusicServiceCol>
    <MusicService alphabet="A" color="#ff2f56" />
  </MusicServiceCol>
);

const ItunesMusic = () => (
  <MusicServiceCol>
    <MusicService alphabet="iT" color="#0070c9" />
  </MusicServiceCol>
);
const Spotify = () => (
  <MusicServiceCol>
    <MusicService alphabet="S" color="#1DB954" />
  </MusicServiceCol>
);

const musicServiceIconStyle = {
  background: "#000",
  borderRadius: "50%",
  color: "#fff",
  fontSize: "10px",
  height: "15px",
  lineHeight: "15px",
  textAlign: "center" as "center",
  width: "15px",
};

const MusicService = (props: { alphabet: string; color: string }) => (
  <div style={{ ...musicServiceIconStyle, backgroundColor: props.color }}>
    {props.alphabet}
  </div>
);

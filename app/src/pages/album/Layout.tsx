import {
  IonButton,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
} from "@ionic/react";
import { useWindowWidth } from "@react-hook/window-size";
import ImageCard from "components/cards/ImageCard";
import { Album, Track } from "graphql/types";
import { ellipsisVertical, play } from "ionicons/icons";
import React from "react";

type Props = {
  album: Album;
};

export const Layout: React.FC<Props> = ({ album }) => {
  const windowWidth = useWindowWidth();
  const maxWidth = windowWidth > 700 ? 700 : windowWidth;
  const image = <Image album={album} width={300} />;
  const tracks = album.tracks.map((track, i) => (
    <TrackItem key={i} track={track} />
  ));

  return (
    <IonGrid>
      <IonRow className="ion-justify-content-center ion-no-padding">
        {image}
      </IonRow>

      <IonRow className="ion-align-items-end ion-justify-content-center">
        <IonLabel>{album.name}</IonLabel>
      </IonRow>

      <IonRow className="ion-justify-content-center">
        <IonLabel color="medium" style={{ fontSize: "12px" }}>
          {album.copyright}
        </IonLabel>
      </IonRow>

      <IonRow className="ion-justify-content-center ion-no-padding">
        <IonList style={{ width: maxWidth }}>{tracks}</IonList>
      </IonRow>
    </IonGrid>
  );
};

const Image = (props: { album: Album; width: number }) => {
  return (
    <ImageCard
      name={props.album.name}
      src={props.album.artworkL.url as string | undefined}
      width={props.width}
    />
  );
};

const TrackItem = (props: { track: Track }) => {
  return (
    <IonItem>
      <IonButton fill="clear">
        <IonIcon slot="icon-only" size="small" icon={play} />
      </IonButton>

      <IonLabel>{props.track.name}</IonLabel>

      <IonButton slot="end" fill="clear">
        <IonIcon slot="icon-only" size="small" icon={ellipsisVertical} />
      </IonButton>
    </IonItem>
  );
};

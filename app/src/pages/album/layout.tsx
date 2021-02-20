import {
  IonButton,
  IonCard,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSkeletonText,
} from "@ionic/react";
import ImageCard from "components/cards/image-card";
import { Album, Track } from "graphql/types";
import useDetailPageSize from "hooks/layouts/use-detail-page-size";
import { ellipsisVertical, play } from "ionicons/icons";
import { PlayerContext } from "machines/jukebox-machine";
import React, { useContext } from "react";

type Props = {
  album: Album;
};

export const Layout: React.FC<Props> = ({ album }) => {
  const { contentMaxWidth, imageCardWidth } = useDetailPageSize();
  const service = useContext(PlayerContext);

  return (
    <IonGrid>
      {/* Album image */}
      <IonRow className="ion-justify-content-center ion-no-padding">
        <Image album={album} width={imageCardWidth} />
      </IonRow>

      {/* Album info */}
      <IonRow className="ion-align-items-end ion-justify-content-center">
        <IonLabel>{album.name}</IonLabel>
      </IonRow>

      <IonRow className="ion-justify-content-center">
        <IonLabel color="medium" style={{ fontSize: "12px" }}>
          {album.copyright}
        </IonLabel>
      </IonRow>

      {/* Tracks */}
      <IonRow className="ion-justify-content-center ion-no-padding">
        <IonList style={{ width: contentMaxWidth }}>
          {album.tracks.map((track, index) => (
            <TrackItem
              key={index}
              track={track}
              onClick={() =>
                service.send([
                  {
                    name: album.name,
                    type: "SET_NAME",
                  },
                  {
                    currentPlaybackNo: index,
                    tracks: album.tracks as Track[],
                    type: "REPLACE_AND_PLAY",
                  },
                ])
              }
            />
          ))}
        </IonList>
      </IonRow>
    </IonGrid>
  );
};

export const Loading: React.FC = () => {
  const { contentMaxWidth, imageCardWidth } = useDetailPageSize();
  const animated = false;

  return (
    <IonGrid>
      {/* Album image */}
      <IonRow className="ion-justify-content-center ion-no-padding">
        <IonCard>
          <IonSkeletonText
            animated={animated}
            style={{ height: imageCardWidth, width: imageCardWidth }}
          />
        </IonCard>
      </IonRow>

      {/* Album info */}
      <IonRow className="ion-align-items-end ion-justify-content-center">
        <IonSkeletonText
          animated={animated}
          style={{ width: imageCardWidth }}
        />
      </IonRow>

      <IonRow className="ion-justify-content-center">
        <IonSkeletonText
          animated={animated}
          style={{ width: imageCardWidth }}
        />
      </IonRow>

      {/* Tracks */}
      <IonRow className="ion-justify-content-center ion-no-padding">
        <IonList style={{ width: contentMaxWidth }}>
          {[...Array(10)].map((_, index) => (
            <IonItem key={index}>
              <IonSkeletonText animated={animated} />
            </IonItem>
          ))}
        </IonList>
      </IonRow>
    </IonGrid>
  );
};

const Image = (props: { album: Album; width: number }) => (
  <ImageCard
    name={props.album.name}
    src={props.album.artworkL.url as string | undefined}
    width={props.width}
  />
);

const TrackItem = (props: { track: Track; onClick: any }) => (
  <IonItem>
    <IonButton fill="clear" onClick={props.onClick}>
      <IonIcon slot="icon-only" size="small" icon={play} />
    </IonButton>

    <IonLabel>{props.track.name}</IonLabel>

    <IonButton slot="end" fill="clear">
      <IonIcon slot="icon-only" size="small" icon={ellipsisVertical} />
    </IonButton>
  </IonItem>
);

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
import { useService } from "@xstate/react";
import ImageCard from "components/cards/ImageCard";
import { Album, Track } from "graphql/types";
import useDetailPageSize from "hooks/layouts/useDetailPageSize";
import { ellipsisVertical, play } from "ionicons/icons";
import { playerService } from "machines/JukeboxMachine";
import React from "react";

type Props = {
  album: Album;
};

export const Layout: React.FC<Props> = ({ album }) => {
  const { contentMaxWidth, imageCardWidth } = useDetailPageSize();
  const [, send] = useService(playerService);

  return (
    <IonGrid>
      {/* album image */}
      <IonRow className="ion-justify-content-center ion-no-padding">
        <Image album={album} width={imageCardWidth} />
      </IonRow>

      {/* album info */}
      <IonRow className="ion-align-items-end ion-justify-content-center">
        <IonLabel>{album.name}</IonLabel>
      </IonRow>

      <IonRow className="ion-justify-content-center">
        <IonLabel color="medium" style={{ fontSize: "12px" }}>
          {album.copyright}
        </IonLabel>
      </IonRow>

      {/* tracks */}
      <IonRow className="ion-justify-content-center ion-no-padding">
        <IonList style={{ width: contentMaxWidth }}>
          {album.tracks.map((track, i) => (
            <TrackItem
              key={i}
              track={track}
              onClick={() =>
                send({
                  type: "REPLACE_AND_PLAY",
                  tracks: album.tracks as Track[],
                  currentPlaybackNo: i,
                })
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
      {/* album image */}
      <IonRow className="ion-justify-content-center ion-no-padding">
        <IonCard>
          <IonSkeletonText
            animated={animated}
            style={{ width: imageCardWidth, height: imageCardWidth }}
          />
        </IonCard>
      </IonRow>

      {/* album info */}
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

      {/* tracks */}
      <IonRow className="ion-justify-content-center ion-no-padding">
        <IonList style={{ width: contentMaxWidth }}>
          {[...Array(10)].map((_, i) => (
            <IonItem key={i}>
              <IonSkeletonText animated={animated} />
            </IonItem>
          ))}
        </IonList>
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

const TrackItem = (props: { track: Track; onClick: any }) => {
  return (
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
};

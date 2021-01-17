import { IonGrid, IonLabel, IonRow } from "@ionic/react";
import ImageCard from "components/cards/ImageCard";
import { Artist } from "graphql/types";
import React from "react";

type Props = {
  artist: Artist;
};

export const Layout: React.FC<Props> = ({ artist }) => {
  return (
    <IonGrid>
      {/* album image */}
      <IonRow className="ion-justify-content-center ion-no-padding">
        <Image artist={artist} width={300} />
      </IonRow>

      {/* album info */}
      <IonRow className="ion-align-items-end ion-justify-content-center">
        <IonLabel>{artist.name}</IonLabel>
      </IonRow>
    </IonGrid>
  );
};

const Image = (props: { artist: Artist; width: number }) => {
  return (
    <ImageCard
      name={props.artist.name}
      src={props.artist.artworkL.url as string | undefined}
      width={props.width}
    />
  );
};

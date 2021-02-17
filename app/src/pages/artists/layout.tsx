import ImageCardLink from "components/cards/image-card-link";
import InfiniteList, { hasNext, loadMore } from "components/infinite-list";
import { Artist } from "graphql/types";
import useCardImageItemSize from "hooks/layouts/use-card-image-item-size";
import React from "react";

type Props = {
  artists: Artist[];
  loadMore: loadMore;
  hasNext: hasNext;
};

export const Layout: React.FC<Props> = ({ artists, loadMore, hasNext }) => {
  const { cardWidth, cardHeight, parentWidth } = useCardImageItemSize();

  const items = artists.map((artist) => (
    <Item artist={artist} width={cardWidth} />
  ));

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

type ItemProps = {
  artist: Artist;
  width: number;
};

const Item = React.memo((props: ItemProps) => {
  return (
    <ImageCardLink
      name={props.artist.name}
      src={props.artist.artworkM.url as string | undefined}
      width={props.width}
      link={`/artists/${props.artist.id}`}
    />
  );
});

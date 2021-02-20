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

export const Layout: React.FC<Props> = (props) => {
  const { cardWidth, cardHeight, parentWidth } = useCardImageItemSize();

  const items = props.artists.map((artist) => (
    <Item artist={artist} width={cardWidth} />
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

type ItemProps = {
  artist: Artist;
  width: number;
};

const Item = React.memo((props: ItemProps) => (
  <ImageCardLink
    name={props.artist.name}
    src={props.artist.artworkM.url as string | undefined}
    width={props.width}
    link={`/artists/${props.artist.id}`}
  />
));

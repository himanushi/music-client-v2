import { useWindowWidth } from "@react-hook/window-size";

const useCardImageItemSize = () => {
  const windowWidth = useWindowWidth();
  const cardWidth = windowWidth > 360 ? 150 : 120;
  const parentWidth = cardWidth + 23;
  const cardHeight = 200;

  return { cardHeight, cardWidth, parentWidth };
};

export default useCardImageItemSize;

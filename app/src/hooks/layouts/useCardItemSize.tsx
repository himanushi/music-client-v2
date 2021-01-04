import { useWindowWidth } from "@react-hook/window-size";

const useCardItemSize = () => {
  const windowWidth = useWindowWidth();
  const cardWidth = windowWidth > 360 ? 150 : 120;
  const parentWidth = cardWidth + 23;
  const cardHeight = 200;

  return { cardWidth, parentWidth, cardHeight };
};

export default useCardItemSize;

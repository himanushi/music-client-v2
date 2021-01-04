import { useWindowWidth } from "@react-hook/window-size";

const useCardWidth = () => {
  const windowWidth = useWindowWidth();
  const cardWidth = windowWidth > 360 ? 150 : 120;
  const parentWidth = cardWidth + 23;

  return { cardWidth, parentWidth };
};

export default useCardWidth;

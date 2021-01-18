import { useWindowWidth } from "@react-hook/window-size";

const useDetailPageSize = () => {
  const windowWidth = useWindowWidth();
  const contentMaxWidth = windowWidth > 700 ? 700 : windowWidth;
  // 32(16 * 2) は IonCard の padding
  const imageCardWidth = windowWidth <= 332 ? windowWidth - 32 : 300;

  return { contentMaxWidth, imageCardWidth };
};

export default useDetailPageSize;

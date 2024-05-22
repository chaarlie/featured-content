import { useEffect, useState } from "react";

export const useLoadedImages = (urls: string[]) => {
  const [hasLoadedImages, setHasLoadedImages] = useState<boolean>(false);

  async function loadImage(url: string) {
    return new Promise((resolve, _reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  useEffect(() => {
    Promise.all(urls.map(loadImage)).then((loadedImages) => {
      if (loadedImages.length > 0) {
        setHasLoadedImages(true);
      }
    });
  }, [urls]);

  return {
    hasLoadedImages,
  };
};

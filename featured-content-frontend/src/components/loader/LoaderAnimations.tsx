import { stagger, useAnimate, useInView } from "framer-motion";
import { useState, useEffect } from "react";
import LoadingDots from "./LoadingDots";

function LoaderAnimations() {
  const [exitDotsAnimation, setExitDotsAnimation] = useState(false);
  const [scope, animate] = useAnimate();
  const dotsInView = useInView(scope);

  function showDotsHorizontally() {
    return animate(
      ".dots",
      {
        x: [-50, 0],
        opacity: [0.6, 1],
      },
      {
        repeat: 0,
        duration: 0.3,
      }
    );
  }

  function waveDotsAnimation() {
    return animate(
      "li",
      {
        y: [0, -15, 0],
      },
      {
        repeat: Infinity,
        duration: 1.5,
        delay: stagger(0.1, {
          startDelay: 0.2,
          ease: [0.32, 0.23, 0.4, 0.9],
        }),
      }
    );
  }

  async function startDotsAnimation() {
    await showDotsHorizontally();
    await waveDotsAnimation();
  }

  function removeDotsHorizontally() {
    return animate(".dots", {
      x: [0],
      opacity: [1, 0.5],
      y: [0],
    });
  }

  function fadeDotsAnimation() {
    return animate(".dots", {
      opacity: [0.5, 0],
    });
  }

  async function removeDotsAnimation() {
    await removeDotsHorizontally();
    await fadeDotsAnimation();
  }

  useEffect(() => {
    if (dotsInView) {
      startDotsAnimation();

      if (exitDotsAnimation) {
        removeDotsAnimation();
      }
    }
  }, [dotsInView, exitDotsAnimation]);

  return (
    <div ref={scope} className=" max-h-11 p-0 flex justify-center">
      <LoadingDots>
        <li className="block">.</li>
        <li className="block">.</li>
        <li className="block">.</li>
        <li className="block">.</li>
      </LoadingDots>
    </div>
  );
}

export default LoaderAnimations;

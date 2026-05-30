import { useEffect }
from "react";

function ShakeDetector({

  onShake

}) {

  useEffect(() => {

    let lastX = 0;

    let lastY = 0;

    let lastZ = 0;

    let lastTime = 0;

    const threshold = 18;

    const handleMotion =
      (event) => {

      const acceleration =

        event.accelerationIncludingGravity;

      if (!acceleration) return;

      const currentTime =
        Date.now();

      if (
        currentTime - lastTime > 100
      ) {

        const diffTime =
          currentTime - lastTime;

        lastTime = currentTime;

        const x =
          acceleration.x;

        const y =
          acceleration.y;

        const z =
          acceleration.z;

        const speed =

          Math.abs(

            x + y + z -

            lastX -
            lastY -
            lastZ

          ) / diffTime * 10000;
        if (speed > threshold) {

          console.log(
            "SHAKE DETECTED 🚨"
          );

          onShake();
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    };

    window.addEventListener(

      "devicemotion",

      handleMotion
    );

    return () => {

      window.removeEventListener(

        "devicemotion",

        handleMotion
      );
    };

  }, [onShake]);

  return null;
}

export default ShakeDetector;
import { useEffect } from "react";

function ShakeDetector({ onShake, onMotionChange }) {

  useEffect(() => {

    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;
    let lastTime = 0;
        let motionCount = 0;

    const threshold = 18;

    const handleMotion = (event) => {
      const acceleration =
        event.accelerationIncludingGravity;
console.log(event.accelerationIncludingGravity);
      if (!acceleration) return;

      const currentTime = Date.now();

      if (currentTime - lastTime > 100) {

        const diffTime =
          currentTime - lastTime;

        lastTime = currentTime;

        const x = acceleration.x || 0;
        const y = acceleration.y || 0;
        const z = acceleration.z || 0;

        const speed =
          Math.abs(
            x + y + z -
            lastX - lastY - lastZ
          ) / diffTime * 10000;

        // Motion percentage (0-100)
        const motionLevel =
          Math.min(
            Math.round((speed / threshold) * 100),
            100
          );
console.log("Motion Level:", motionLevel);
        onMotionChange?.(motionLevel);


if (motionLevel >= 70) {
  motionCount++;
  console.log(
    "High Motion Count:",
    motionCount
  );
} else {
  motionCount = 0;
}

if (motionCount >= 3) {
  console.log("SOS Triggered 🚨");
  onShake();
  motionCount = 0;
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

  }, [onShake, onMotionChange]);

  return null;
}

export default ShakeDetector;
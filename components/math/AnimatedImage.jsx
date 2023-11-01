import React, { useState, useEffect } from "react";

function AnimatedImage() {
  const [style, setStyle] = useState({
    opacity: 0.5,
    transform: "scale(0.5)",
    transition: "all 2s ease",
  });

  useEffect(() => {
    setStyle({
      opacity: 1,
      transform: "scale(1)",
      transition: "all 2s ease",
    });
  }, []);

  return (
    // <div className="flex justify-center items-center h-screen relative">
    <img
      src="/trophy.png" // replace with your image path
      alt="Animated"
      className="absolute"
      style={style}
    />
    // </div>
  );
}

export default AnimatedImage;

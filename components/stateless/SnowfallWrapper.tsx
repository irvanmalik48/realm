import Snowfall from "react-snowfall";
import React from "react";

export default function SnowfallWrapper() {
  React.useLayoutEffect = React.useEffect;

  return (
    <Snowfall
      color="#e5e7eb"
      speed={[0.5, 1.0]}
      snowflakeCount={100}
      wind={[-0.5, 0.5]}
      style={{
        zIndex: -1,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        opacity: 0.25,
      }}
    />
  );
}

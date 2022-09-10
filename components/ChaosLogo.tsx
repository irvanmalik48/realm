import { tw } from "@utils/twind.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";

export function ChaosLogo(props: { className: string }) {
  return (
    <svg
      width="500"
      height="500"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <circle
        cx="250"
        cy="250"
        r="194"
        className={tw`group-hover:stroke-current group-hover:text-transparent transition-all duration-1000 ease-in-out`}
        stroke={colorScheme[currentColorScheme].dark.nav}
        stroke-width="12"
      />
      <rect
        x="243"
        y="100"
        width="15"
        height="300"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M250 70L275.981 115H224.019L250 70Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M250 430L224.019 385H275.981L250 430Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <rect
        x="100"
        y="257"
        width="15"
        height="300"
        transform="rotate(-90 100 257)"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M70 250L115 224.019V275.981L70 250Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M430 250L385 275.981V224.019L430 250Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <rect
        x="139.477"
        y="148.95"
        width="15"
        height="300"
        transform="rotate(-45 139.477 148.95)"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M123.213 122.787L173.404 136.235L136.662 172.978L123.213 122.787Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M377.772 377.345L327.581 363.897L364.323 327.154L377.772 377.345Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <rect
        x="148.95"
        y="361.523"
        width="15"
        height="300"
        transform="rotate(-135 148.95 361.523)"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M122.787 377.787L136.235 327.596L172.978 364.338L122.787 377.787Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M377.345 123.228L363.897 173.419L327.154 136.677L377.345 123.228Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <rect
        x="151.393"
        y="250"
        width="140"
        height="140"
        transform="rotate(-45 151.393 250)"
        className={tw`group-hover:stroke-current group-hover:text-transparent transition-all duration-1000 ease-in-out`}
        stroke={colorScheme[currentColorScheme].dark.nav}
        stroke-width="15"
      />
    </svg>
  );
}

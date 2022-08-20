import { Handlers } from "$fresh/server.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";

export const handler: Handlers = {
  GET(req, _ctx) {
    const themeParams = new URL(req.url).searchParams.get("theme");
    if (themeParams !== null) {
      const bg = new BackgroundContext(themeParams);
      return bg.render();
    } else {
      const bg = new BackgroundContext();
      return bg.render();
    }
  },
};

export class BackgroundContext {
  private theme?: string;
  private themeSelection: string;

  constructor(theme?: string) {
    this.theme = theme;
    if (this.theme) {
      this.themeSelection = this.theme;
    } else {
      this.themeSelection = currentColorScheme;
    }
  }

  generate() {
    return /* html */ `<svg
    width="2800"
    height="2800"
    viewBox="0 0 2800 2800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="1400"
      height="1400"
      transform="translate(0 1400)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark
        .superdark
    }"
    />
    <circle
      cx="350"
      cy="1750"
      r="200"
      transform="rotate(45 350 1750)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }"
    />
    <rect
      x="518.291"
      y="1564.74"
      width="25"
      height="500"
      transform="rotate(45 518.291 1564.74)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M555.061 1544.94L543.253 1617.98L482.016 1556.75L555.061 1544.94Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M144.939 1955.06L156.747 1882.02L217.984 1943.25L144.939 1955.06Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <circle
      cx="1050"
      cy="1750"
      r="200"
      transform="rotate(45 1050 1750)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }"
    />
    <rect
      x="1218.29"
      y="1564.74"
      width="25"
      height="500"
      transform="rotate(45 1218.29 1564.74)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M1255.06 1544.94L1243.25 1617.98L1182.02 1556.75L1255.06 1544.94Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M844.939 1955.06L856.747 1882.02L917.984 1943.25L844.939 1955.06Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <circle
      cx="1050"
      cy="2450"
      r="200"
      transform="rotate(-45 1050 2450)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }"
    />
    <rect
      x="864.738"
      y="2281.71"
      width="25"
      height="500"
      transform="rotate(-45 864.738 2281.71)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M844.939 2244.94L917.984 2256.75L856.747 2317.98L844.939 2244.94Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M1255.06 2655.06L1182.02 2643.25L1243.25 2582.02L1255.06 2655.06Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <circle
      cx="350"
      cy="2450"
      r="200"
      transform="rotate(-45 350 2450)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }"
    />
    <rect
      x="164.738"
      y="2281.71"
      width="25"
      height="500"
      transform="rotate(-45 164.738 2281.71)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M144.939 2244.94L217.984 2256.75L156.747 2317.98L144.939 2244.94Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M555.061 2655.06L482.016 2643.25L543.253 2582.02L555.061 2655.06Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <rect
      x="559"
      y="2100"
      width="200"
      height="200"
      transform="rotate(-45 559 2100)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <rect width="1400" height="1400" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark
        .superdark
    }" />
    <circle
      cx="350"
      cy="350"
      r="200"
      transform="rotate(45 350 350)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }"
    />
    <rect
      x="518.291"
      y="164.738"
      width="25"
      height="500"
      transform="rotate(45 518.291 164.738)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M555.061 144.939L543.253 217.984L482.016 156.747L555.061 144.939Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M144.939 555.061L156.747 482.016L217.984 543.253L144.939 555.061Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <circle
      cx="1050"
      cy="350"
      r="200"
      transform="rotate(45 1050 350)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }"
    />
    <rect
      x="1218.29"
      y="164.738"
      width="25"
      height="500"
      transform="rotate(45 1218.29 164.738)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M1255.06 144.939L1243.25 217.984L1182.02 156.747L1255.06 144.939Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M844.939 555.061L856.747 482.016L917.984 543.253L844.939 555.061Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <circle
      cx="1050"
      cy="1050"
      r="200"
      transform="rotate(-45 1050 1050)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }"
    />
    <rect
      x="864.738"
      y="881.709"
      width="25"
      height="500"
      transform="rotate(-45 864.738 881.709)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M844.939 844.939L917.984 856.747L856.747 917.984L844.939 844.939Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M1255.06 1255.06L1182.02 1243.25L1243.25 1182.02L1255.06 1255.06Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <circle
      cx="350"
      cy="1050"
      r="200"
      transform="rotate(-45 350 1050)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }"
    />
    <rect
      x="164.738"
      y="881.709"
      width="25"
      height="500"
      transform="rotate(-45 164.738 881.709)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M144.939 844.939L217.984 856.747L156.747 917.984L144.939 844.939Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path
      d="M555.061 1255.06L482.016 1243.25L543.253 1182.02L555.061 1255.06Z"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <rect
      x="559"
      y="700"
      width="200"
      height="200"
      transform="rotate(-45 559 700)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <rect
      width="1400"
      height="1400"
      transform="translate(1400 1400)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark
        .superdark
    }"
    />
    <circle cx="1750" cy="1750" r="200" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }" />
    <rect x="1738" y="1500" width="25" height="500" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <path d="M1750 1460L1793.3 1520H1706.7L1750 1460Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <path d="M1750 2040L1706.7 1980H1793.3L1750 2040Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <circle
      cx="2450"
      cy="1750"
      r="200"
      transform="rotate(-90 2450 1750)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }"
    />
    <rect
      x="2200"
      y="1762"
      width="25"
      height="500"
      transform="rotate(-90 2200 1762)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path d="M2160 1750L2220 1706.7V1793.3L2160 1750Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <path d="M2740 1750L2680 1793.3V1706.7L2740 1750Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <circle cx="2450" cy="2450" r="200" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }" />
    <rect x="2438" y="2200" width="25" height="500" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <path d="M2450 2160L2493.3 2220H2406.7L2450 2160Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <path d="M2450 2740L2406.7 2680H2493.3L2450 2740Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <circle
      cx="1750"
      cy="2450"
      r="200"
      transform="rotate(-90 1750 2450)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }"
    />
    <rect
      x="1500"
      y="2462"
      width="25"
      height="500"
      transform="rotate(-90 1500 2462)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path d="M1460 2450L1520 2406.7V2493.3L1460 2450Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <path d="M2040 2450L1980 2493.3V2406.7L2040 2450Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <rect
      x="1959"
      y="2100"
      width="200"
      height="200"
      transform="rotate(-45 1959 2100)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <rect width="1400" height="1400" transform="translate(1400)" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark
        .superdark
    }" />
    <circle cx="1750" cy="350" r="200" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }" />
    <rect x="1738" y="100" width="25" height="500" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <path d="M1750 60L1793.3 120H1706.7L1750 60Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <path d="M1750 640L1706.7 580H1793.3L1750 640Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <circle
      cx="2450"
      cy="350"
      r="200"
      transform="rotate(-90 2450 350)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }"
    />
    <rect
      x="2200"
      y="362"
      width="25"
      height="500"
      transform="rotate(-90 2200 362)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path d="M2160 350L2220 306.699V393.301L2160 350Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <path d="M2740 350L2680 393.301V306.699L2740 350Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <circle cx="2450" cy="1050" r="200" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }" />
    <rect x="2438" y="800" width="25" height="500" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <path d="M2450 760L2493.3 820H2406.7L2450 760Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <path d="M2450 1340L2406.7 1280H2493.3L2450 1340Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <circle
      cx="1750"
      cy="1050"
      r="200"
      transform="rotate(-90 1750 1050)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.bg
    }"
    />
    <rect
      x="1500"
      y="1062"
      width="25"
      height="500"
      transform="rotate(-90 1500 1062)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <path d="M1460 1050L1520 1006.7V1093.3L1460 1050Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <path d="M2040 1050L1980 1093.3V1006.7L2040 1050Z" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }" />
    <rect
      x="1959"
      y="700"
      width="200"
      height="200"
      transform="rotate(-45 1959 700)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <rect
      x="1259"
      y="1400"
      width="200"
      height="200"
      transform="rotate(-45 1259 1400)"
      fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.nav
    }"
    />
    <circle cx="1400" cy="1400" r="50" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.accent
        .solid
    }" fill-opacity="0.3" />
    <circle cx="700" cy="700" r="50" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.accent
        .solid
    }" fill-opacity="0.3" />
    <circle cx="700" cy="2100" r="50" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.accent
        .solid
    }" fill-opacity="0.3" />
    <circle cx="2100" cy="2100" r="50" fill="${
      colorScheme[this.themeSelection as keyof typeof colorScheme].dark.accent
        .solid
    }" fill-opacity="0.3" />
  </svg>`;
  }

  render() {
    return new Response(this.generate(), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}

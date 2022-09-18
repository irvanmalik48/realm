import { css, tw } from "@utils/twind.ts";
import { Button } from "./Button.tsx";

function CoffeeIcon() {
  return (
    <svg style="width:88px;height:88px" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z"
      />
    </svg>
  );
}

export default function DonateCard() {
  return (
    <div
      className={tw`flex flex-row justify-between items-center w-full px-5 py-3 bg-dark-accent-quartertrans rounded-xl text-dark-text box-border mb-10 ${
        css(
          {
            "-webkit-backdrop-filter": "blur(.5rem)",
            "backdrop-filter": "blur(.5rem)",
          },
        )
      }`}
    >
      <div>
        <div>
          <p className={tw`text-dark-accent-solid font-semibold font-heading`}>
            So, a cup of coffee for me?
          </p>
          <p className={tw`text-dark-text text-sm`}>
            Every bit of your donation helps me create better content, ease my
            pain away, avoid asteroid mass extinction, and repel the upcoming
            alien invasion!
          </p>
          <p className={tw`text-dark-text text-sm`}>
            You can donate through Trakteer or Saweria with the buttons below:
          </p>
        </div>
        <div className={tw`flex flex-row gap-5 mt-5`}>
          <Button type="anchor" href="https://saweria.co/irvanmalik48">
            Saweria
          </Button>
          <Button type="anchor" href="https://trakteer.id/lapprealm/tip">
            Trakteer
          </Button>
        </div>
      </div>
      <div
        className={tw`hidden lg:flex justify-center items-center w-[fit-content] h-full p-3 rounded-xl bg-dark-accent-semitrans text-dark-accent-solid`}
      >
        <CoffeeIcon />
      </div>
    </div>
  );
}

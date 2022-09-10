import { css, tw } from "@utils/twind.ts";

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
      className={tw`flex flex-row justify-between items-center w-full px-5 py-3 bg-light-accent-quartertrans dark:bg-dark-accent-quartertrans rounded-xl text-light-text dark:text-dark-text box-border mb-10 ${
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
          <p
            className={tw`text-light-accent-solid dark:text-dark-accent-solid font-semibold font-heading`}
          >
            So, a cup of coffee for me?
          </p>
          <p className={tw`text-light-text dark:text-dark-text text-sm`}>
            Every bit of your donation helps me create better content, ease my
            pain away, avoid asteroid mass extinction, and repel the upcoming
            alien invasion!
          </p>
          <p className={tw`text-light-text dark:text-dark-text text-sm`}>
            You can donate through Trakteer or Saweria with the buttons below:
          </p>
        </div>
        <div className={tw`flex flex-row gap-5`}>
          <a
            href="https://saweria.co/irvanmalik48"
            className={tw`bg-light-accent-quartertrans dark:bg-dark-accent-quartertrans px-4 py-2 inline-block text-sm text-uppercase text-light-text dark:text-dark-text rounded-3xl transition-all duration-200 ease-out hover:bg-dark-accent-semitrans hover:text-light-accent-solid hover:dark:text-dark-accent-solid ring ring-transparent hover:ring-light-accent-solid hover:dark:ring-dark-accent-solid font-bold w-[fit-content] mt-5`}
          >
            Saweria
          </a>
          <a
            href="https://trakteer.id/lapprealm/tip"
            className={tw`bg-light-accent-quartertrans dark:bg-dark-accent-quartertrans px-4 py-2 inline-block text-sm text-uppercase text-light-text dark:text-dark-text rounded-3xl transition-all duration-200 ease-out hover:bg-dark-accent-semitrans hover:text-light-accent-solid hover:dark:text-dark-accent-solid ring ring-transparent hover:ring-light-accent-solid hover:dark:ring-dark-accent-solid font-bold w-[fit-content] mt-5`}
          >
            Trakteer
          </a>
        </div>
      </div>
      <div
        className={tw`hidden lg:flex justify-center items-center w-[fit-content] h-full p-3 rounded-xl bg-light-accent-semitrans dark:bg-dark-accent-semitrans text-light-accent-solid dark:text-dark-accent-solid`}
      >
        <CoffeeIcon />
      </div>
    </div>
  );
}

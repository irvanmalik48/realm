/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

function CoffeeIcon() {
  return (
    <svg style="width:88px;height:88px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z" />
    </svg>
  );
}

export default function DonateCard() {
  return (
    <div
      class={tw`flex flex-row justify-between items-center block w-full px-5 py-3 bg-dark-accent-quartertrans rounded-xl text-dark-text box-border mb-10`}
    >
      <div>
        <div>
          <p class={tw`text-dark-accent-solid font-semibold`}>
            So, a cup of coffee for me?
          </p>
          <p class={tw`text-dark-text text-sm`}>
            Every bit of your donation helps me create better content, ease my pain away, avoid asteroid mass extinction, and repel the upcoming alien invasion!
          </p>
          <p class={tw`text-dark-text text-sm`}>You can donate through Trakteer or Saweria with the buttons below:</p>
        </div>
        <div class={tw`flex flex-row gap-5`}>
          <a href="https://saweria.co/irvanmalik48" class={tw`bg-transparent px-4 py-2 inline-block text-sm text-uppercase text-dark-text rounded-3xl transition-all duration-200 ease-linear hover:bg-dark-accent-semitrans hover:text-dark-accent-solid ring ring-dark-accent-quartertrans hover:ring-dark-accent-solid font-bold w-[fit-content] mt-5`}>Saweria</a>
          <a href="https://trakteer.id/lapprealm/tip" class={tw`bg-transparent px-4 py-2 inline-block text-sm text-uppercase text-dark-text rounded-3xl transition-all duration-200 ease-linear hover:bg-dark-accent-semitrans hover:text-dark-accent-solid ring ring-dark-accent-quartertrans hover:ring-dark-accent-solid font-bold w-[fit-content] mt-5`}>Trakteer</a>
        </div>
      </div>
      <div class={tw`flex justify-center items-center w-[fit-content] h-full p-3 rounded-xl bg-dark-accent-semitrans text-dark-accent-solid`}>
        <CoffeeIcon />
      </div>
    </div>
  );
}
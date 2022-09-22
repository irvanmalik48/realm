import { tw } from "@utils/twind.ts";
import { lineClamp } from "twind/line-clamp";
import { asset } from "$fresh/runtime.ts";

export default function ProjectCard(props: {
  path?: string;
  img?: string;
  title?: string;
  desc?: string;
}) {
  return (
    <a
      href={props.path}
      className={tw`ring ring-transparent overflow-hidden flex flex-col justify-between block w-full bg-dark-accent-quartertrans rounded-xl hover:bg-dark-accent-semitrans hover:ring-dark-accent-solid transition-all duration-200 ease-out text-dark-text box-border`}
    >
      <img src={asset(props.img as string)} alt="project image" className={tw`w-full h-auto`} />
      <div className={tw`pb-3`}>
        <p className={tw`text-dark-accent-solid text-lg pt-3 px-5 font-semibold font-heading`}>
          {props.title}
        </p>
        <p className={tw`text-dark-text px-5 text-sm mb-1 overflow-clip max-h-[1.25rem] ${lineClamp(1)}`}>{props.desc}</p>
      </div>
    </a>
  );
}

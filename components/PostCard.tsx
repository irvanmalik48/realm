import { tw } from "@utils/twind.ts";

export default function PostCard(props: {
  path?: string;
  title?: string;
  date?: string;
  desc?: string;
  tag?: string[];
  timeToRead?: string;
}) {
  return (
    <a
      href={props.path}
      className={tw`ring ring-transparent flex flex-col justify-between block w-full px-5 py-3 bg-light-accent-quartertrans dark:bg-dark-accent-quartertrans rounded-xl hover:bg-light-accent-semitrans hover:dark:bg-dark-accent-semitrans hover:ring-light-accent-solid hover:dark:ring-dark-accent-solid transition-all duration-200 ease-out text-light-text dark:text-dark-text box-border`}
    >
      <div>
        <p
          className={tw`text-light-accent-solid dark:text-dark-accent-solid font-semibold font-heading`}
        >
          {props.title}
        </p>
        <p className={tw`text-light-text dark:text-dark-text text-xs mb-2`}>
          {props.date}
          {(props.timeToRead) ? ` - ${props.timeToRead}` : ""}
        </p>
        <p className={tw`text-light-text dark:text-dark-text text-sm mb-1`}>
          {props.desc}
        </p>
      </div>
      <div className={tw`box-border flex-wrap flex flex-row`}>
        {props?.tag?.map((el: string, index: number) => (
          <p
            key={index}
            className={tw`font-mono bg-light-accent-solid dark:bg-dark-accent-solid text-xs text-light-side dark:text-dark-side uppercase font-semibold px-2.5 py-0.5 mt-1 mb-1 rounded-3xl mr-2`}
          >
            {el}
          </p>
        ))}
      </div>
    </a>
  );
}

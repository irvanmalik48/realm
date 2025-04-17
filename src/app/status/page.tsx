import { Metadata } from "next";
import Container from "@/components/container";
import { ImageComponent } from "@/components/image";
import GoodLord from "@/assets/img/goodlord.jpg";
import { TextScroll } from "@/components/ui/text-scroll";
import { ServerStatus } from "@/components/server-status";

export const metadata: Metadata = {
  title: "Server Status",
  description: "See the server status!",
  openGraph: {
    title: "Server Status",
    description: "See the server status!",
  },
};

export default function Status() {
  return (
    <>
      <Container>
        <ImageComponent
          img={GoodLord}
          alt="Good lord~"
          className="w-full max-h-96 rounded-lg z-10"
          innerClassName="w-full md:-translate-y-24"
          height={720}
        />
        <p className="w-fit relative -mt-12 z-20 mx-auto text-xl md:text-2xl dark:font-semibold font-medium text-center px-7 py-3 bg-primary text-primary-foreground rounded-full border-6 border-background">
          my server status info.
        </p>
        <ServerStatus />
      </Container>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3"
        default_velocity={0.66}
        text="i need more ram, probably.  "
      />
    </>
  );
}

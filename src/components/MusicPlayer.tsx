import { createSignal, createEffect } from "solid-js";
import { Play, Pause, Square } from "lucide-solid";

export default function MusicPlayer(props: {
  src: string;
  title: string;
  artist: string;
  album: string;
}) {
  const [playing, setPlaying] = createSignal(false);
  const [currentTime, setCurrentTime] = createSignal(0);
  const [duration, setDuration] = createSignal(0);
  const [volume, setVolume] = createSignal(1);
  const [muted, setMuted] = createSignal(false);
  const [loop, setLoop] = createSignal(false);
  const [audio, setAudio] = createSignal<HTMLAudioElement>();

  createEffect(() => {
    const audio = new Audio(props.src);
    audio.volume = volume();
    audio.loop = loop();
    audio.muted = muted();
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.onended = () => {
      setPlaying(false);
    };
    setAudio(audio);
  });

  return (
    <div class="flex not-prose flex-col w-full bg-neutral-800 rounded border border-neutral-700 items-center justify-center h-full">
      <div class="flex w-full bg-neutral-900 px-5 py-3">
        <div class="w-full flex justify-between items-center">
          <div class="flex w-full flex-col">
            <p class="text-neutral-200 font-heading">{props.title}</p>
            <p class="text-neutral-200 text-sm">{props.artist}</p>
            <p class="text-neutral-200 text-sm">{props.album}</p>
          </div>
          <div class="flex items-center gap-3">
            {playing() ? (
              <button
                class="hover:bg-opacity-50 transition bg-neutral-800 border-neutral-700 rounded-full border p-4"
                onClick={() => {
                  audio()?.pause();
                  setPlaying(false);
                }}
              >
                <Pause size={20} />
              </button>
            ) : (
              <button
                class="hover:bg-opacity-50 transition bg-neutral-800 border-neutral-700 rounded-full border p-4"
                onClick={() => {
                  audio()?.play();
                  setPlaying(true);
                }}
              >
                <Play size={20} />
              </button>
            )}
            <button
              class="hover:bg-opacity-50 transition bg-neutral-800 border-neutral-700 rounded-full border p-4"
              onClick={() => {
                audio()?.pause();
                audio()!.currentTime = 0;
                setPlaying(false);
              }}
            >
              <Square size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
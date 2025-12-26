import { createSignal, onCleanup, For } from "solid-js";

export default function Stopwatch() {
  const [time, setTime] = createSignal(0);
  const [running, setRunning] = createSignal(false);
  const [laps, setLaps] = createSignal([]);

  let timerInterval;

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  const startStop = () => {
    if (running()) {
      clearInterval(timerInterval);
      setRunning(false);
    } else {
      const startTime = Date.now() - time();
      timerInterval = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
      setRunning(true);
    }
  };

  const reset = () => {
    clearInterval(timerInterval);
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    if (!running()) return;
    setLaps((prev) => [{ time: time(), id: Date.now() }, ...prev]);
  };

  onCleanup(() => clearInterval(timerInterval));

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Stopwatch</h1>

      <div class="flex flex-col items-center gap-12">
        <div class="relative size-80 flex items-center justify-center">
          {/* Circle track */}
          <div class="absolute inset-0 border-8 border-border-subtle rounded-full border-dashed opacity-50"></div>
          {/* Active glow */}
          {running() && (
            <div class="absolute inset-0 border-8 border-primary rounded-full animate-ping opacity-20"></div>
          )}
          <div class="absolute inset-0 border-8 border-primary rounded-full ring-4 ring-primary/20"></div>

          <div class="text-6xl font-black font-mono tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(19,109,236,0.3)]">
            {formatTime(time())}
          </div>
        </div>

        <div class="flex gap-4 w-full max-w-sm">
          <button
            onClick={startStop}
            class={`flex-1 py-4 rounded-2xl font-black text-xl transition-all shadow-lg active:scale-95 ${
              running()
                ? "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                : "bg-green-500 hover:bg-green-600 shadow-green-500/20"
            }`}
          >
            {running() ? "Stop" : "Start"}
          </button>
          <button
            onClick={running() ? lap : reset}
            class="flex-1 py-4 rounded-2xl bg-surface border border-border-subtle font-black text-xl hover:bg-white/5 transition-all shadow-lg active:scale-95"
          >
            {running() ? "Lap" : "Reset"}
          </button>
        </div>

        {laps().length > 0 && (
          <div class="w-full max-w-sm bg-surface rounded-2xl border border-border-subtle overflow-hidden flex flex-col">
            <div class="p-4 border-b border-border-subtle bg-background/50 font-bold uppercase text-xs tracking-widest text-gray-500">
              Lap History
            </div>
            <div class="max-h-64 overflow-auto scrollbar-thin scrollbar-thumb-primary/20">
              <For each={laps()}>
                {(l, i) => (
                  <div class="flex justify-between p-4 border-b border-white/5 hover:bg-white/5 font-mono text-lg transition-colors">
                    <span class="text-gray-500">Lap {laps().length - i()}</span>
                    <span class="font-bold text-primary">
                      {formatTime(l.time)}
                    </span>
                  </div>
                )}
              </For>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

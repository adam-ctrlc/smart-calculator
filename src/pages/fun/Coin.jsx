import { createSignal, For } from "solid-js";

export default function CoinFlipper() {
  const [result, setResult] = createSignal(null);
  const [flipping, setFlipping] = createSignal(false);
  const [history, setHistory] = createSignal([]);

  const flip = () => {
    if (flipping()) return;
    setFlipping(true);
    setResult(null);

    setTimeout(() => {
      const side = Math.random() < 0.5 ? "Heads" : "Tails";
      setResult(side);
      setHistory((prev) => [side, ...prev].slice(0, 10));
      setFlipping(false);
    }, 600);
  };

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Coin Flipper</h1>

      <div class="grid md:grid-cols-2 gap-8 items-stretch">
        <div class="bg-surface p-12 rounded-xl border border-border-subtle shadow-md flex flex-col items-center justify-center text-center gap-8">
          <div
            class={`size-48 rounded-full bg-yellow-500 border-8 border-yellow-600 shadow-2xl flex items-center justify-center transition-all duration-500 ${
              flipping() ? "animate-bounce scale-90 rotate-180" : ""
            }`}
          >
            <span class="text-6xl font-black text-yellow-900 drop-shadow-md">
              {result() ? result()[0] : "?"}
            </span>
          </div>

          <div class="flex flex-col gap-2">
            <div class="text-4xl font-black h-10">
              {flipping() ? "Flipping..." : result()}
            </div>
            <p class="text-gray-400 text-sm">Provably fair random flip</p>
          </div>

          <button
            onClick={flip}
            disabled={flipping()}
            class="w-full py-4 bg-primary rounded-xl font-bold text-xl hover:bg-primary/80 transition-all disabled:opacity-50"
          >
            Flip Coin
          </button>
        </div>

        <div class="bg-surface p-6 rounded-xl border border-border-subtle shadow-md flex flex-col gap-4">
          <h2 class="text-lg font-bold border-b border-border-subtle pb-2">
            Recent Flips
          </h2>
          <div class="flex flex-col gap-2">
            <For each={history()}>
              {(h, i) => (
                <div class="flex justify-between items-center p-3 bg-background rounded-lg border border-border-subtle">
                  <span class="text-gray-400"># {history().length - i()}</span>
                  <span
                    class={`font-bold ${
                      h === "Heads" ? "text-primary" : "text-yellow-400"
                    }`}
                  >
                    {h}
                  </span>
                </div>
              )}
            </For>
            {history().length === 0 && (
              <div class="text-center py-12 text-gray-600 italic">
                No flips yet...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

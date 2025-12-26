import { createSignal, createMemo } from "solid-js";
import Input from "../../components/Input";

export default function RandomNumber() {
  const [min, setMin] = createSignal(1);
  const [max, setMax] = createSignal(100);
  const [result, setResult] = createSignal(null);
  const [count, setCount] = createSignal(1);

  const generate = () => {
    const results = [];
    for (let i = 0; i < count(); i++) {
      results.push(Math.floor(Math.random() * (max() - min() + 1)) + min());
    }
    setResult(results);
  };

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Random Number Generator</h1>

      <div class="grid md:grid-cols-2 gap-8 items-start">
        <div class="flex flex-col gap-6 bg-surface p-6 rounded-xl border border-border-subtle shadow-md">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label class="block text-sm font-medium text-gray-300">
                Min Value
              </label>
              <Input
                type="number"
                value={min()}
                onInput={(e) => setMin(parseInt(e.currentTarget.value) || 0)}
                inputClass="p-3"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="block text-sm font-medium text-gray-300">
                Max Value
              </label>
              <Input
                type="number"
                value={max()}
                onInput={(e) => setMax(parseInt(e.currentTarget.value) || 0)}
                inputClass="p-3"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="block text-sm font-medium text-gray-300">
              How many numbers?
            </label>
            <Input
              type="number"
              min="1"
              max="100"
              value={count()}
              onInput={(e) => setCount(parseInt(e.currentTarget.value) || 1)}
              inputClass="p-3"
            />
          </div>

          <button
            onClick={generate}
            class="w-full py-4 bg-primary rounded-xl font-bold text-xl hover:bg-primary/80 transition-all shadow-lg mt-2"
          >
            Generate
          </button>
        </div>

        <div class="bg-surface p-8 rounded-xl border border-border-subtle shadow-md h-full min-h-[300px] flex flex-col gap-6">
          <div class="text-sm text-gray-500 uppercase font-bold">
            Generated Results
          </div>
          <div class="flex flex-wrap gap-4 justify-center">
            <For each={result() || []}>
              {(num) => (
                <div class="size-20 bg-primary/20 border-2 border-primary rounded-2xl flex items-center justify-center text-3xl font-black text-primary animate-in fade-in zoom-in duration-300">
                  {num}
                </div>
              )}
            </For>
            {!result() && (
              <div class="my-auto text-gray-600 text-center w-full flex flex-col gap-2">
                <span class="material-symbols-outlined text-6xl block opacity-20">
                  shuffle
                </span>
                <p>Set your range and click generate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

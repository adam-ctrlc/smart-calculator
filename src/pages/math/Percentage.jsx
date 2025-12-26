import { createSignal, createMemo } from "solid-js";
import Input from "../../components/Input";

export default function PercentageCalculator() {
  const [val1, setVal1] = createSignal(10);
  const [val2, setVal2] = createSignal(100);

  const whatIs = createMemo(() => (val1() / 100) * val2());

  const [isVal1, setIsVal1] = createSignal(20);
  const [isVal2, setIsVal2] = createSignal(200);
  const percentOf = createMemo(() => (isVal1() / isVal2()) * 100);

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Percentage Calculator</h1>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-surface p-6 rounded-xl border border-border-subtle shadow-md flex flex-col gap-6">
          <h2 class="text-sm font-bold text-gray-500 uppercase tracking-widest">
            What is % of X
          </h2>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-2xl font-bold">
            <span class="whitespace-nowrap">What is</span>
            <Input
              label="Percentage value"
              labelClass="sr-only"
              type="number"
              value={val1()}
              onInput={(e) => setVal1(parseFloat(e.currentTarget.value) || 0)}
              inputClass="w-24 text-center text-primary p-2"
              class="w-auto"
            />
            <span class="whitespace-nowrap">% of</span>
            <Input
              label="Total value"
              labelClass="sr-only"
              type="number"
              value={val2()}
              onInput={(e) => setVal2(parseFloat(e.currentTarget.value) || 0)}
              inputClass="w-32 text-center text-primary p-2"
              class="w-auto"
            />
          </div>
          <div class="pt-6 border-t border-border-subtle flex flex-col gap-1">
            <div class="text-sm text-gray-400">Result</div>
            <div class="text-5xl font-black text-white">
              {whatIs().toFixed(2)}
            </div>
          </div>
        </div>

        <div class="bg-surface p-6 rounded-xl border border-border-subtle shadow-md flex flex-col gap-6">
          <h2 class="text-sm font-bold text-gray-500 uppercase tracking-widest">
            X is what % of Y
          </h2>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-2xl font-bold">
            <Input
              label="Part value"
              labelClass="sr-only"
              type="number"
              value={isVal1()}
              onInput={(e) => setIsVal1(parseFloat(e.currentTarget.value) || 0)}
              inputClass="w-24 text-center text-primary p-2"
              class="w-auto"
            />
            <span class="whitespace-nowrap">is what % of</span>
            <Input
              label="Total value"
              labelClass="sr-only"
              type="number"
              value={isVal2()}
              onInput={(e) => setIsVal2(parseFloat(e.currentTarget.value) || 0)}
              inputClass="w-32 text-center text-primary p-2"
              class="w-auto"
            />
          </div>
          <div class="pt-6 border-t border-border-subtle flex flex-col gap-1">
            <div class="text-sm text-gray-400">Result</div>
            <div class="text-5xl font-black text-white">
              {percentOf().toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

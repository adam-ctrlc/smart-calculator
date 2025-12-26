import { createSignal, createMemo, For } from "solid-js";
import Select from "../../components/Select";
import Input from "../../components/Input";

export default function CurrencyConverter() {
  const [amount, setAmount] = createSignal(100);
  const [from, setFrom] = createSignal("USD");
  const [to, setTo] = createSignal("EUR");

  const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 151.45,
    AUD: 1.53,
    CAD: 1.35,
    CNY: 7.23,
    INR: 83.34,
    PHP: 55.82,
  };

  const converted = createMemo(() => {
    const fromRate = rates[from()];
    const toRate = rates[to()];
    return ((amount() / fromRate) * toRate).toFixed(2);
  });

  const swap = () => {
    const temp = from();
    setFrom(to());
    setTo(temp);
  };

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Currency Converter</h1>

      <div class="bg-surface p-8 rounded-xl border border-border-subtle shadow-md">
        <div class="grid lg:grid-cols-[1fr_auto_1fr] items-end gap-6">
          <div class="flex flex-col gap-4">
            <Input
              label="Amount"
              type="number"
              value={amount()}
              onInput={(e) => setAmount(parseFloat(e.currentTarget.value) || 0)}
              inputClass="text-2xl font-bold"
            />
            <Select
              label="From Currency"
              value={from()}
              onChange={(e) => setFrom(e.currentTarget.value)}
              selectClass="p-2"
            >
              <For each={Object.keys(rates)}>
                {(code) => <option value={code}>{code}</option>}
              </For>
            </Select>
          </div>

          <button
            onClick={swap}
            class="size-12 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-lg mb-2 mx-auto lg:mb-12"
          >
            <span class="material-symbols-outlined">swap_horiz</span>
          </button>

          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2 w-full">
              <label class="block text-sm font-medium text-gray-300 px-1">
                Converted Amount
              </label>
              <div class="w-full bg-background border border-border-subtle rounded-xl p-4 text-2xl font-bold text-primary">
                {converted()}
              </div>
            </div>
            <Select
              label="To Currency"
              value={to()}
              onChange={(e) => setTo(e.currentTarget.value)}
              selectClass="p-2"
            >
              <For each={Object.keys(rates)}>
                {(code) => <option value={code}>{code}</option>}
              </For>
            </Select>
          </div>
        </div>

        <div class="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-lg text-center font-bold">
          <p class="text-sm text-primary">
            1 {from()} = {(rates[to()] / rates[from()]).toFixed(4)} {to()}
          </p>
        </div>
        <p class="mt-4 text-[10px] text-gray-500 text-center uppercase tracking-widest">
          Exchanged rates are illustrative and updated daily
        </p>
      </div>
    </div>
  );
}

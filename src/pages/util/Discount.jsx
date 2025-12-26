import { createSignal, createMemo } from "solid-js";
import Input from "../../components/Input";
import { currencySymbol } from "../../store/settings";

export default function DiscountCalculator() {
  const [price, setPrice] = createSignal(100);
  const [discount, setDiscount] = createSignal(20);
  const [tax, setTax] = createSignal(0);

  const savings = createMemo(() => (price() * discount()) / 100);
  const subtotal = createMemo(() => price() - savings());
  const taxAmount = createMemo(() => (subtotal() * tax()) / 100);
  const total = createMemo(() => subtotal() + taxAmount());

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Discount Calculator</h1>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-6 bg-surface p-6 rounded-xl border border-border-subtle shadow-md">
          <Input
            label={`Original Price (${currencySymbol()})`}
            type="number"
            value={price()}
            onInput={(e) => setPrice(parseFloat(e.currentTarget.value) || 0)}
            inputClass="text-2xl font-bold"
          />

          <div class="flex flex-col gap-2">
            <Input
              label="Discount Percent (%)"
              type="number"
              id="discount-input"
              value={discount()}
              onInput={(e) =>
                setDiscount(parseFloat(e.currentTarget.value) || 0)
              }
              inputClass="text-2xl font-bold"
            />
            <input
              type="range"
              id="discount-range"
              name="discount-range"
              min="0"
              max="100"
              value={discount()}
              onInput={(e) => setDiscount(parseInt(e.currentTarget.value))}
              class="w-full h-2 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-primary mt-2"
            />
          </div>

          <Input
            label="Sales Tax (%) - Optional"
            type="number"
            value={tax()}
            onInput={(e) => setTax(parseFloat(e.currentTarget.value) || 0)}
            inputClass="text-lg"
          />
        </div>

        <div class="bg-surface p-8 rounded-xl border border-border-subtle shadow-md flex flex-col justify-between">
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center text-gray-400">
              <span>Savings</span>
              <span class="text-green-400 font-bold ml-auto">
                -{currencySymbol()}
                {savings().toFixed(2)}
              </span>
            </div>
            <div class="flex justify-between items-center text-gray-400">
              <span>Subtotal</span>
              <span class="font-bold">
                {currencySymbol()}
                {subtotal().toFixed(2)}
              </span>
            </div>
            <div class="flex justify-between items-center text-gray-400">
              <span>Tax ({tax()}%)</span>
              <span class="font-bold">
                {currencySymbol()}
                {taxAmount().toFixed(2)}
              </span>
            </div>
          </div>

          <div class="mt-8 pt-8 border-t border-border-subtle text-center flex flex-col gap-2">
            <div class="text-xs text-gray-400 uppercase tracking-widest font-bold">
              Final Price
            </div>
            <div class="text-7xl font-black text-primary">
              {currencySymbol()}
              {total().toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

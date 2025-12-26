import { createSignal, createMemo } from "solid-js";
import Input from "../../components/Input";
import { currencySymbol } from "../../store/settings";

export default function FuelCost() {
  const [distance, setDistance] = createSignal(100);
  const [efficiency, setEfficiency] = createSignal(8); // L/100km
  const [price, setPrice] = createSignal(1.5);

  const totalFuel = createMemo(() => (distance() / 100) * efficiency());
  const totalCost = createMemo(() => totalFuel() * price());

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Fuel Cost Calculator</h1>

      <div class="grid md:grid-cols-2 gap-8 items-stretch">
        <div class="flex flex-col gap-6 bg-surface p-6 rounded-xl border border-border-subtle shadow-md">
          <Input
            label="Distance (km)"
            type="number"
            value={distance()}
            onInput={(e) => setDistance(parseFloat(e.currentTarget.value) || 0)}
            inputClass="text-2xl font-bold"
          />
          <Input
            label="Fuel Efficiency (L/100km)"
            type="number"
            value={efficiency()}
            onInput={(e) =>
              setEfficiency(parseFloat(e.currentTarget.value) || 0)
            }
            inputClass="text-2xl font-bold"
          />
          <Input
            label={`Price per Liter (${currencySymbol()})`}
            type="number"
            step="0.01"
            value={price()}
            onInput={(e) => setPrice(parseFloat(e.currentTarget.value) || 0)}
            inputClass="text-2xl font-bold"
          />
        </div>

        <div class="bg-primary p-8 rounded-xl flex flex-col justify-center text-center shadow-2xl relative overflow-hidden group">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10 flex flex-col gap-2">
            <div class="text-sm uppercase font-bold text-white/70">
              Estimated Fuel Cost
            </div>
            <div class="text-7xl font-black text-white mb-4">
              {currencySymbol()}
              {totalCost().toFixed(2)}
            </div>

            <div class="pt-6 border-t border-white/20 flex flex-col gap-1">
              <div class="text-white/60 text-sm">Fuel Needed</div>
              <div class="text-2xl font-bold text-white">
                {totalFuel().toFixed(1)} Liters
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

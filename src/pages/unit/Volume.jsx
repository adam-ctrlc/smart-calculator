import { createSignal, createMemo, For } from "solid-js";
import Select from "../../components/Select";
import Input from "../../components/Input";

export default function VolumeConverter() {
  const [val, setVal] = createSignal(1);
  const [unit, setUnit] = createSignal("L");

  const units = {
    L: { label: "Liters", factor: 1 },
    ml: { label: "Milliliters", factor: 0.001 },
    m3: { label: "Cubic Meters", factor: 1000 },
    gal: { label: "Gallons (US)", factor: 3.78541 },
    cup: { label: "Cups (US)", factor: 0.236588 },
    fl_oz: { label: "Fluid Ounces (US)", factor: 0.0295735 },
  };

  const conversions = createMemo(() => {
    const baseValue = val() * units[unit()].factor; // Everything to Liters
    return Object.keys(units).map((key) => ({
      key,
      label: units[key].label,
      value: (baseValue / units[key].factor).toLocaleString(undefined, {
        maximumFractionDigits: 6,
      }),
    }));
  });

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Volume Converter</h1>

      <div class="bg-surface p-8 rounded-xl border border-border-subtle shadow-md">
        <div class="flex flex-col md:flex-row gap-6 items-end">
          <Input
            label="Value"
            labelClass="text-xs font-bold text-gray-400 uppercase"
            type="number"
            value={val()}
            onInput={(e) => setVal(parseFloat(e.currentTarget.value) || 0)}
            inputClass="text-3xl font-bold"
            class="flex-1"
          />
          <Select
            label="From Unit"
            labelClass="text-xs font-bold text-gray-400 uppercase"
            value={unit()}
            onChange={(e) => setUnit(e.currentTarget.value)}
            selectClass="text-xl"
            class="w-full md:w-64"
          >
            <For each={Object.keys(units)}>
              {(k) => <option value={k}>{units[k].label}</option>}
            </For>
          </Select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          <For each={conversions()}>
            {(c) => (
              <div
                class={`p-6 rounded-2xl border transition-all ${
                  c.key === unit()
                    ? "bg-primary/20 border-primary"
                    : "bg-background border-border-subtle hover:bg-white/5"
                }`}
              >
                <div class="text-xs text-gray-500 font-bold uppercase mb-2">
                  {c.label}
                </div>
                <div class="text-xl font-black truncate">{c.value}</div>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}

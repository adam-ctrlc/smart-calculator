import { createSignal, createMemo } from "solid-js";
import Select from "../../components/Select";
import Input from "../../components/Input";

export default function TempConverter() {
  const [val, setVal] = createSignal(0);
  const [unit, setUnit] = createSignal("C");

  const results = createMemo(() => {
    let c, f, k;
    const v = val();

    if (unit() === "C") {
      c = v;
      f = (v * 9) / 5 + 32;
      k = v + 273.15;
    } else if (unit() === "F") {
      f = v;
      c = ((v - 32) * 5) / 9;
      k = c + 273.15;
    } else {
      k = v;
      c = v - 273.15;
      f = (c * 9) / 5 + 32;
    }

    return {
      C: c.toFixed(2),
      F: f.toFixed(2),
      K: k.toFixed(2),
    };
  });

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Temperature Converter</h1>

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
            label="Unit"
            labelClass="text-xs font-bold text-gray-400 uppercase"
            value={unit()}
            onChange={(e) => setUnit(e.currentTarget.value)}
            selectClass="text-xl"
            class="w-full md:w-48"
          >
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
            <option value="K">Kelvin (K)</option>
          </Select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div
            class={`p-6 rounded-2xl border ${
              unit() === "C"
                ? "bg-primary/20 border-primary"
                : "bg-background border-border-subtle"
            }`}
          >
            <div class="text-xs text-gray-500 font-bold uppercase mb-2">
              Celsius
            </div>
            <div class="text-3xl font-black">{results().C}°C</div>
          </div>
          <div
            class={`p-6 rounded-2xl border ${
              unit() === "F"
                ? "bg-primary/20 border-primary"
                : "bg-background border-border-subtle"
            }`}
          >
            <div class="text-xs text-gray-500 font-bold uppercase mb-2">
              Fahrenheit
            </div>
            <div class="text-3xl font-black">{results().F}°F</div>
          </div>
          <div
            class={`p-6 rounded-2xl border ${
              unit() === "K"
                ? "bg-primary/20 border-primary"
                : "bg-background border-border-subtle"
            }`}
          >
            <div class="text-xs text-gray-500 font-bold uppercase mb-2">
              Kelvin
            </div>
            <div class="text-3xl font-black">{results().K}K</div>
          </div>
        </div>
      </div>
    </div>
  );
}

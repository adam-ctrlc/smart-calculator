import { createSignal, createMemo } from "solid-js";
import MathDisplay from "../../components/MathDisplay";

export default function BMICalculator() {
  const [weight, setWeight] = createSignal(70); // kg
  const [height, setHeight] = createSignal(175); // cm

  // BMI Formula: weight (kg) / (height (m))^2
  const bmi = createMemo(() => {
    const hInMeters = height() / 100;
    return (weight() / (hInMeters * hInMeters)).toFixed(1);
  });

  const category = createMemo(() => {
    const val = parseFloat(bmi());
    if (val < 18.5) return { label: "Underweight", color: "text-blue-400" };
    if (val < 25) return { label: "Normal weight", color: "text-green-400" };
    if (val < 30) return { label: "Overweight", color: "text-yellow-400" };
    return { label: "Obese", color: "text-red-400" };
  });

  const latexFormula = `\\text{BMI} = \\frac{\\text{weight}_{kg}}{(\\text{height}_{m})^2}`;
  const latexCalc = createMemo(
    () => `\\text{BMI} = \\frac{${weight()}}{((${height()}/100))^2} = ${bmi()}`
  );

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white px-4 sm:px-0">
      <h1 class="text-2xl md:text-3xl font-bold">BMI Calculator</h1>

      <div class="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
        <div class="flex flex-col gap-6 bg-surface p-6 rounded-xl border border-border-subtle shadow-md">
          <div class="flex flex-col gap-2">
            <label
              for="bmi-weight"
              class="block text-sm font-medium text-gray-300"
            >
              Weight (kg)
            </label>
            <input
              id="bmi-weight"
              name="bmi-weight"
              type="range"
              min="30"
              max="200"
              value={weight()}
              onInput={(e) => setWeight(parseFloat(e.currentTarget.value))}
              class="w-full h-2 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="text-right font-bold text-primary">{weight()} kg</div>
          </div>

          <div class="flex flex-col gap-2">
            <label
              for="bmi-height"
              class="block text-sm font-medium text-gray-300"
            >
              Height (cm)
            </label>
            <input
              id="bmi-height"
              name="bmi-height"
              type="range"
              min="100"
              max="250"
              value={height()}
              onInput={(e) => setHeight(parseFloat(e.currentTarget.value))}
              class="w-full h-2 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="text-right font-bold text-primary">{height()} cm</div>
          </div>
        </div>

        <div class="bg-surface p-6 rounded-xl border border-border-subtle flex flex-col items-center justify-center text-center gap-2 min-h-[180px]">
          <div class="text-xs text-gray-500 uppercase font-bold">Your BMI</div>
          <div class="text-5xl md:text-7xl font-black text-primary">
            {bmi()}
          </div>
          <div class={`text-xl font-medium ${category().color}`}>
            {category().label}
          </div>
        </div>
      </div>

      <div class="bg-surface p-6 rounded-xl border border-border-subtle shadow-md flex flex-col gap-4">
        <h2 class="text-xl font-bold border-b border-border-subtle pb-2">
          The Math Behind It
        </h2>
        <div class="flex flex-col gap-4">
          <p class="text-gray-300">
            The Body Mass Index (BMI) is calculated using the following formula:
          </p>
          <div class="flex justify-center py-4 bg-background rounded-lg overflow-x-auto border border-border-subtle">
            <MathDisplay latex={latexFormula} display={true} class="text-xl" />
          </div>
          <p class="text-gray-300">Substituting your values:</p>
          <div class="flex justify-center py-4 bg-background rounded-lg overflow-x-auto border border-border-subtle">
            <MathDisplay latex={latexCalc()} display={true} class="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

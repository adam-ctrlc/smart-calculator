import { createSignal, createMemo } from "solid-js";
import MathDisplay from "../../components/MathDisplay";

export default function WaterIntake() {
  const [weight, setWeight] = createSignal(70); // kg
  const [exercise, setExercise] = createSignal(30); // minutes

  // Water Intake Formula: Weight (kg) * 0.033 + (Exercise / 30) * 0.35
  const waterGoal = createMemo(() => {
    const base = weight() * 0.033;
    const extra = (exercise() / 30) * 0.35;
    return (base + extra).toFixed(1);
  });

  const latexFormula = `\\text{Water (L)} = (W \\times 0.033) + (\\frac{E}{30} \\times 0.35)`;

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Water Intake Tracker</h1>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-6 bg-surface p-6 rounded-xl border border-border-subtle shadow-md">
          <div class="flex flex-col gap-2">
            <label class="block text-sm font-medium text-gray-300">
              Weight (kg)
            </label>
            <input
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
            <label class="block text-sm font-medium text-gray-300">
              Daily Exercise (minutes)
            </label>
            <input
              type="range"
              min="0"
              max="180"
              step="15"
              value={exercise()}
              onInput={(e) => setExercise(parseFloat(e.currentTarget.value))}
              class="w-full h-2 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="text-right font-bold text-primary">
              {exercise()} min
            </div>
          </div>
        </div>

        <div class="bg-surface p-6 rounded-xl border border-border-subtle flex flex-col justify-center items-center text-center gap-2">
          <div class="text-sm text-gray-400 uppercase tracking-wide">
            Daily Water Target
          </div>
          <div class="text-7xl font-black text-primary">{waterGoal()}</div>
          <div class="text-lg text-gray-400 font-medium">Liters / day</div>
          <p class="mt-4 text-xs text-gray-500 italic">
            Approx. {Math.round(parseFloat(waterGoal()) * 4)} glasses (250ml
            each)
          </p>
        </div>
      </div>

      <div class="bg-surface p-6 rounded-xl border border-border-subtle shadow-md flex flex-col gap-4">
        <h2 class="text-xl font-bold border-b border-border-subtle pb-2">
          The Formula
        </h2>
        <div class="flex flex-col gap-4">
          <p class="text-gray-300">
            Staying hydrated is crucial. The general recommendation is about
            33ml per kg of body weight, with extra for activity.
          </p>
          <div class="flex justify-center py-4 bg-background rounded-lg border border-border-subtle overflow-x-auto">
            <MathDisplay latex={latexFormula} display={true} />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-center font-bold">
            <div class="p-3 bg-background rounded-lg border border-border-subtle">
              <div class="text-xs text-gray-500 uppercase">
                W = Weight in kg
              </div>
            </div>
            <div class="p-3 bg-background rounded-lg border border-border-subtle">
              <div class="text-xs text-gray-500 uppercase">
                E = Exercise minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

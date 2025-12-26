import { createSignal, createMemo, For } from "solid-js";
import MathDisplay from "../../components/MathDisplay";

export default function HeartRate() {
  const [age, setAge] = createSignal(25);

  const maxHR = createMemo(() => 220 - age());

  const zones = createMemo(() => [
    {
      name: "Zone 1 (Very Light)",
      range: "50-60%",
      activity: "Warm-up, recovery",
      color: "bg-blue-400",
    },
    {
      name: "Zone 2 (Light)",
      range: "60-70%",
      activity: "Fat burn, endurance",
      color: "bg-green-400",
    },
    {
      name: "Zone 3 (Moderate)",
      range: "70-80%",
      activity: "Aerobic, fitness",
      color: "bg-yellow-400",
    },
    {
      name: "Zone 4 (Hard)",
      range: "80-90%",
      activity: "Anaerobic, speed",
      color: "bg-orange-400",
    },
    {
      name: "Zone 5 (Maximum)",
      range: "90-100%",
      activity: "V02 max, sprint",
      color: "bg-red-400",
    },
  ]);

  const calculateRange = (percent) => {
    const factor = parseInt(percent) / 100;
    return Math.round(maxHR() * factor);
  };

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Heart Rate Zones</h1>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-6 bg-surface p-6 rounded-xl border border-border-subtle shadow-md">
          <div class="flex flex-col gap-2">
            <label class="block text-sm font-medium text-gray-300">
              Your Age
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={age()}
              onInput={(e) => setAge(parseInt(e.currentTarget.value))}
              class="w-full h-2 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="text-right font-bold text-primary">
              {age()} years old
            </div>
          </div>

          <div class="pt-6 border-t border-border-subtle flex flex-col gap-1">
            <div class="text-sm text-gray-400 uppercase tracking-wide">
              Estimated Max Heart Rate
            </div>
            <div class="text-5xl font-black text-white">
              {maxHR()}{" "}
              <span class="text-lg font-normal text-gray-500">bpm</span>
            </div>
          </div>
        </div>

        <div class="bg-surface p-6 rounded-xl border border-border-subtle shadow-md overflow-hidden flex flex-col gap-4">
          <h2 class="text-lg font-bold">Training Zones</h2>
          <div class="flex flex-col gap-4">
            <For each={zones()}>
              {(zone) => (
                <div class="flex items-center gap-4">
                  <div class={`w-2 h-10 rounded-full ${zone.color}`}></div>
                  <div class="flex-1">
                    <div class="flex justify-between items-center">
                      <span class="font-bold text-sm">{zone.name}</span>
                      <span class="text-primary font-black">
                        {calculateRange(zone.range.split("-")[0])} -{" "}
                        {calculateRange(zone.range.split("-")[1])}
                      </span>
                    </div>
                    <div class="text-xs text-gray-500 font-medium">
                      {zone.activity} ({zone.range})
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>

      <div class="bg-surface p-6 rounded-xl border border-border-subtle shadow-md flex flex-col gap-4">
        <h2 class="text-xl font-bold border-b border-border-subtle pb-2">
          Haskell & Fox Formula
        </h2>
        <div class="flex flex-col gap-4">
          <p class="text-gray-300">
            The most common formula for predicting maximum heart rate is the
            simple subtraction method.
          </p>
          <div class="flex justify-center py-4 bg-background rounded-lg border border-border-subtle font-bold">
            <MathDisplay
              latex="\text{Max HR} = 220 - \text{Age}"
              display={true}
            />
          </div>
          <p class="text-xs text-gray-500 italic text-center">
            Note: This is an estimate. Individual results may vary based on
            fitness level and genetics.
          </p>
        </div>
      </div>
    </div>
  );
}

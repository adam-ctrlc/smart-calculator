import { createSignal, createMemo } from "solid-js";
import MathDisplay from "../../components/MathDisplay";
import Select from "../../components/Select";
import Input from "../../components/Input";

export default function CalorieCounter() {
  const [age, setAge] = createSignal(25);
  const [gender, setGender] = createSignal("male");
  const [weight, setWeight] = createSignal(70); // kg
  const [height, setHeight] = createSignal(175); // cm
  const [activity, setActivity] = createSignal(1.2); // Sedentary

  const activities = [
    { label: "Sedentary (Office job)", value: "1.2" },
    { label: "Light Exercise (1-2 days/week)", value: "1.375" },
    { label: "Moderate Exercise (3-5 days/week)", value: "1.55" },
    { label: "Heavy Exercise (6-7 days/week)", value: "1.725" },
    { label: "Athlete (2x per day)", value: "1.9" },
  ];

  const bmr = createMemo(() => {
    // Mifflin-St Jeor Equation
    const base = 10 * weight() + 6.25 * height() - 5 * age();
    return gender() === "male" ? base + 5 : base - 161;
  });

  const tdee = createMemo(() => Math.round(bmr() * parseFloat(activity())));

  const bmrFormula = createMemo(() =>
    gender() === "male"
      ? "BMR = 10W + 6.25H - 5A + 5"
      : "BMR = 10W + 6.25H - 5A - 161"
  );

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Calorie Counter (TDEE)</h1>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-6 bg-surface p-6 rounded-xl border border-border-subtle shadow-md">
          <div class="grid grid-cols-2 gap-4">
            <Input
              label="Age"
              type="number"
              value={age()}
              onInput={(e) => setAge(parseInt(e.currentTarget.value) || 0)}
              inputClass="p-2"
            />
            <Select
              label="Gender"
              value={gender()}
              onChange={(e) => setGender(e.currentTarget.value)}
              selectClass="p-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <Input
              label="Weight (kg)"
              type="number"
              value={weight()}
              onInput={(e) => setWeight(parseFloat(e.currentTarget.value) || 0)}
              inputClass="p-2"
            />
            <Input
              label="Height (cm)"
              type="number"
              value={height()}
              onInput={(e) => setHeight(parseFloat(e.currentTarget.value) || 0)}
              inputClass="p-2"
            />
          </div>

          <Select
            label="Activity Level"
            value={activity()}
            onChange={(e) => setActivity(e.currentTarget.value)}
            selectClass="p-2"
          >
            {activities.map((act) => (
              <option value={act.value}>{act.label}</option>
            ))}
          </Select>
        </div>

        <div class="bg-surface p-6 rounded-xl border border-border-subtle flex flex-col justify-center items-center text-center gap-6">
          <div>
            <div class="text-sm text-gray-400 uppercase tracking-wide">
              Daily Maintenance Calories
            </div>
            <div class="text-6xl font-black text-primary my-2">{tdee()}</div>
            <div class="text-sm text-gray-500">kcal / day</div>
          </div>

          <div class="w-full grid grid-cols-2 gap-4 pt-6 border-t border-border-subtle">
            <div class="flex flex-col gap-1">
              <div class="text-xs text-gray-400 uppercase">BMR</div>
              <div class="text-xl font-bold">{Math.round(bmr())}</div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="text-xs text-gray-400 uppercase">
                Goal (Lose Weight)
              </div>
              <div class="text-xl font-bold text-green-400">{tdee() - 500}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-surface p-6 rounded-xl border border-border-subtle shadow-md flex flex-col gap-4">
        <h2 class="text-xl font-bold border-b border-border-subtle pb-2">
          The Science: Mifflin-St Jeor
        </h2>
        <div class="flex flex-col gap-4">
          <p class="text-gray-300">
            Your TDEE (Total Daily Energy Expenditure) is calculated by
            multiplying your BMR by your activity factor.
          </p>
          <div class="flex justify-center py-4 bg-background rounded-lg border border-border-subtle">
            <MathDisplay latex={bmrFormula()} display={true} />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div class="p-3 bg-background rounded-lg border border-border-subtle">
              <div class="text-xs text-gray-500 uppercase">W = Weight (kg)</div>
            </div>
            <div class="p-3 bg-background rounded-lg border border-border-subtle">
              <div class="text-xs text-gray-500 uppercase">H = Height (cm)</div>
            </div>
            <div class="p-3 bg-background rounded-lg border border-border-subtle">
              <div class="text-xs text-gray-500 uppercase">A = Age (years)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

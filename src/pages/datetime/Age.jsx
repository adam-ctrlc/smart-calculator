import { createSignal, createMemo } from "solid-js";
import Input from "../../components/Input";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = createSignal("1995-01-01");

  const age = createMemo(() => {
    if (!birthDate()) return null;
    const now = new Date();
    const birth = new Date(birthDate());

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  });

  const nextBirthday = createMemo(() => {
    const now = new Date();
    const birth = new Date(birthDate());
    const currentYearBirthday = new Date(
      now.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );

    if (currentYearBirthday < now) {
      currentYearBirthday.setFullYear(now.getFullYear() + 1);
    }

    const diff = currentYearBirthday - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  });

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white px-2 sm:px-0">
      <h1 class="text-2xl md:text-3xl font-bold">Age Calculator</h1>

      <div class="grid md:grid-cols-2 gap-8 items-start">
        <div class="flex flex-col gap-6 bg-surface p-8 rounded-2xl border border-border-subtle shadow-lg">
          <div class="flex flex-col gap-2">
            <label class="block text-sm font-medium text-gray-300">
              When were you born?
            </label>
            <Input
              type="date"
              value={birthDate()}
              onInput={(e) => setBirthDate(e.currentTarget.value)}
              inputClass="text-xl font-bold"
            />
          </div>

          <div class="p-6 bg-primary/10 rounded-2xl border border-primary/20 text-center flex flex-col gap-2">
            <div class="text-sm text-primary uppercase font-bold">
              Next Birthday In
            </div>
            <div class="text-4xl font-black text-primary">
              {nextBirthday()} <span class="text-lg font-normal">Days</span>
            </div>
          </div>
        </div>

        <div class="bg-surface p-8 rounded-2xl border border-border-subtle shadow-md flex flex-col gap-6">
          <div class="flex flex-col gap-1">
            <div class="text-xs uppercase font-bold text-gray-500">
              Current Age
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-7xl font-black text-white">{age().years}</span>
              <span class="text-xl text-gray-400">Years Old</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 pt-6 border-t border-border-subtle text-center">
            <div class="flex flex-col gap-1">
              <div class="text-xs text-gray-400 uppercase">Months</div>
              <div class="text-3xl font-bold">{age().months}</div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="text-xs text-gray-400 uppercase">Days</div>
              <div class="text-3xl font-bold">{age().days}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

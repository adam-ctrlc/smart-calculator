import { createSignal, createMemo } from "solid-js";
import Input from "../../components/Input";

export default function DateDifference() {
  const [date1, setDate1] = createSignal(
    new Date().toISOString().split("T")[0]
  );
  const [date2, setDate2] = createSignal(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );

  const diff = createMemo(() => {
    const d1 = new Date(date1());
    const d2 = new Date(date2());
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Detailed breakdown
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = (diffDays % 365) % 30;

    return { totalDays: diffDays, years, months, days };
  });

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Date Difference</h1>

      <div class="bg-surface p-8 rounded-xl border border-border-subtle shadow-md">
        <div class="grid md:grid-cols-[1fr_auto_1fr] items-center gap-8">
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-gray-500 uppercase">
              Start Date
            </label>
            <Input
              type="date"
              value={date1()}
              onInput={(e) => setDate1(e.currentTarget.value)}
              inputClass="text-xl"
            />
          </div>

          <span class="material-symbols-outlined text-4xl text-gray-600 hidden md:block">
            event_repeat
          </span>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-gray-500 uppercase">
              End Date
            </label>
            <Input
              type="date"
              value={date2()}
              onInput={(e) => setDate2(e.currentTarget.value)}
              inputClass="text-xl"
            />
          </div>
        </div>

        <div class="mt-12 flex flex-col items-center text-center">
          <div class="text-sm text-gray-400 uppercase tracking-widest font-bold">
            The difference is
          </div>
          <div class="text-7xl font-black text-primary my-4">
            {diff().totalDays}{" "}
            <span class="text-2xl font-normal text-gray-500">Days</span>
          </div>

          <div class="flex gap-8 mt-4 p-6 bg-background rounded-2xl border border-border-subtle">
            <div class="flex flex-col gap-1">
              <div class="text-2xl font-bold">{diff().years}</div>
              <div class="text-xs text-gray-500 uppercase">Years</div>
            </div>
            <div class="w-px h-10 bg-border-subtle"></div>
            <div class="flex flex-col gap-1">
              <div class="text-2xl font-bold">{diff().months}</div>
              <div class="text-xs text-gray-500 uppercase">Months</div>
            </div>
            <div class="w-px h-10 bg-border-subtle"></div>
            <div class="flex flex-col gap-1">
              <div class="text-2xl font-bold">{diff().days}</div>
              <div class="text-xs text-gray-500 uppercase">Days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

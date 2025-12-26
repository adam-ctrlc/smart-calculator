import { createSignal, onMount, onCleanup, For } from "solid-js";

export default function TimezoneMap() {
  const [now, setNow] = createSignal(new Date());

  onMount(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    onCleanup(() => clearInterval(timer));
  });

  const timezones = [
    {
      name: "Local Time",
      zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    { name: "UTC / GMT", zone: "UTC" },
    { name: "New York (EST)", zone: "America/New_York" },
    { name: "London (GMT)", zone: "Europe/London" },
    { name: "Tokyo (JST)", zone: "Asia/Tokyo" },
    { name: "Los Angeles (PST)", zone: "America/Los_Angeles" },
    { name: "Singapore / HK", zone: "Asia/Singapore" },
  ];

  const format = (date, zone) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date, zone) => {
    return date.toLocaleDateString("en-US", {
      timeZone: zone,
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">World Time Converter</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <For each={timezones}>
          {(tz) => (
            <div
              class={`p-6 rounded-2xl border bg-surface flex flex-col items-center justify-center text-center transition-all hover:scale-105 hover:border-primary shadow-lg ${
                tz.name === "Local Time"
                  ? "border-primary ring-1 ring-primary/30"
                  : "border-border-subtle"
              }`}
            >
              <span class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                {tz.name}
              </span>
              <div class="text-3xl font-black font-mono tracking-tighter tabular-nums mb-1">
                {format(now(), tz.zone)}
              </div>
              <div class="text-[10px] text-gray-400 font-medium">
                {formatDate(now(), tz.zone)}
              </div>
            </div>
          )}
        </For>
      </div>

      <div class="bg-surface p-8 rounded-2xl border border-border-subtle shadow-md text-center flex flex-col gap-4">
        <span class="material-symbols-outlined text-4xl text-primary">
          public
        </span>
        <p class="text-gray-400 max-w-lg mx-auto italic">
          "Time is relative, its only worth depends upon what we do as it is
          passing."
        </p>
      </div>
    </div>
  );
}

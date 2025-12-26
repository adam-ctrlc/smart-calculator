import { A } from "@solidjs/router";
import { currency, setCurrency, currencies } from "../store/settings";
import Select from "./Select";

export default function Header() {
  return (
    <header class="sticky top-0 z-50 flex h-20 w-full items-center justify-between border-b border-solid border-border-subtle bg-surface px-6 md:px-12 py-4 shadow-sm">
      <div class="flex items-center gap-4 md:gap-8">
        <A href="/" class="flex items-center gap-4 text-white">
          <div class="size-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
            <span class="material-symbols-outlined text-2xl">calculate</span>
          </div>
          <h2 class="text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block text-nowrap">
            Smart Calc
          </h2>
        </A>
      </div>

      <div class="flex items-center gap-2">
        <Select
          label="Region Focus"
          labelClass="text-[10px] text-gray-500 font-bold uppercase tracking-widest hidden md:block"
          value={currency()}
          onChange={(e) => setCurrency(e.currentTarget.value)}
          class="w-24 md:w-32"
          selectClass="py-2.5 px-4 text-xs font-bold"
        >
          {Object.entries(currencies).map(([code, { symbol }]) => (
            <option value={code}>
              {code} ({symbol})
            </option>
          ))}
        </Select>
      </div>
    </header>
  );
}

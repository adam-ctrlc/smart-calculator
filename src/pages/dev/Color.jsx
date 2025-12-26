import { createSignal, createMemo } from "solid-js";
import Input from "../../components/Input";

export default function ColorTools() {
  const [hex, setHex] = createSignal("#136dec");

  const rgb = createMemo(() => {
    let h = hex().replace("#", "");
    if (h.length === 3)
      h = h
        .split("")
        .map((x) => x + x)
        .join("");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
  });

  const hsl = createMemo(() => {
    const res = rgb();
    if (!res) return null;
    let { r, g, b } = res;
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  });

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Color Converter</h1>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-6 bg-surface p-6 rounded-xl border border-border-subtle shadow-md">
          <div class="flex flex-col gap-2">
            <label class="block text-sm font-medium text-gray-300">
              HEX Color
            </label>
            <div class="flex gap-4">
              <input
                type="color"
                value={hex()}
                onInput={(e) => setHex(e.currentTarget.value)}
                class="size-16 bg-transparent outline-none cursor-pointer rounded-lg border border-border-subtle overflow-hidden shrink-0"
              />
              <Input
                type="text"
                value={hex()}
                onInput={(e) => setHex(e.currentTarget.value)}
                inputClass="text-xl md:text-2xl font-mono"
              />
            </div>
          </div>

          <div
            class="p-12 rounded-xl border border-border-subtle shadow-inner transition-all duration-300"
            style={{ "background-color": hex() }}
          >
            {/* Preview Area */}
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div class="bg-surface p-6 rounded-xl border border-border-subtle shadow-md flex flex-col gap-4">
            <div class="text-xs uppercase font-bold text-gray-500">
              RGB Value
            </div>
            <div class="flex justify-between items-center text-xl md:text-3xl font-black font-mono gap-4">
              <span class="truncate">
                {rgb()
                  ? `rgb(${rgb().r}, ${rgb().g}, ${rgb().b})`
                  : "Invalid Color"}
              </span>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `rgb(${rgb().r}, ${rgb().g}, ${rgb().b})`
                  )
                }
                class="material-symbols-outlined text-xl text-primary hover:text-white transition-colors shrink-0"
              >
                content_copy
              </button>
            </div>
          </div>

          <div class="bg-surface p-6 rounded-xl border border-border-subtle shadow-md flex flex-col gap-4">
            <div class="text-xs uppercase font-bold text-gray-500">
              HSL Value
            </div>
            <div class="flex justify-between items-center text-xl md:text-3xl font-black font-mono gap-4">
              <span class="truncate">
                {hsl() ? `hsl(${hsl().h}, ${hsl().s}%, ${hsl().l}%)` : "---"}
              </span>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `hsl(${hsl().h}, ${hsl().s}%, ${hsl().l}%)`
                  )
                }
                class="material-symbols-outlined text-xl text-primary hover:text-white transition-colors shrink-0"
              >
                content_copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

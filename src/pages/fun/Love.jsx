import { createSignal, createMemo } from "solid-js";
import Input from "../../components/Input";

export default function LoveCalculator() {
  const [name1, setName1] = createSignal("");
  const [name2, setName2] = createSignal("");
  const [score, setScore] = createSignal(null);
  const [calculating, setCalculating] = createSignal(false);

  const calculate = () => {
    if (!name1() || !name2()) return;
    setCalculating(true);
    setScore(null);

    setTimeout(() => {
      // Deterministic but feels random: sum char codes
      const seed = (name1() + name2())
        .toLowerCase()
        .split("")
        .reduce((a, b) => a + b.charCodeAt(0), 0);
      const res = seed % 101; // 0-100
      setScore(res);
      setCalculating(false);
    }, 1500);
  };

  const message = createMemo(() => {
    const s = score();
    if (s === null) return "";
    if (s > 90) return "Destiny! You are perfect for each other. ❤️";
    if (s > 70) return "Great Match! Sparks are flying! 🔥";
    if (s > 50) return "There's Potential. Why not give it a try? ✨";
    if (s > 30) return "It might be complicated... 😅";
    return "Maybe just friends for now? 🧊";
  });

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white px-2 sm:px-0">
      <h1 class="text-2xl md:text-3xl font-bold">Love Calculator</h1>

      <div class="bg-surface p-6 md:p-12 rounded-3xl border border-border-subtle shadow-2xl relative overflow-hidden text-center flex flex-col gap-8 md:gap-12">
        <div class="absolute inset-0 bg-pink-500/5 pointer-events-none"></div>

        <div class="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-8 relative z-10">
          <Input
            type="text"
            placeholder="Your Name"
            value={name1()}
            onInput={(e) => setName1(e.currentTarget.value)}
            inputClass="p-4 md:p-6 text-xl md:text-2xl font-bold text-center"
          />

          <div
            class={`size-20 md:size-24 rounded-full bg-pink-500 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all ${
              calculating() ? "animate-pulse scale-125" : ""
            }`}
          >
            <span class="material-symbols-outlined text-3xl md:text-4xl text-white font-black">
              favorite
            </span>
          </div>

          <Input
            type="text"
            placeholder="Their Name"
            value={name2()}
            onInput={(e) => setName2(e.currentTarget.value)}
            inputClass="p-4 md:p-6 text-xl md:text-2xl font-bold text-center"
          />
        </div>

        <div class="h-40 md:h-48 flex flex-col items-center justify-center relative z-10">
          {calculating() ? (
            <div class="text-pink-400 font-bold uppercase tracking-[0.2em] animate-bounce text-sm md:text-base text-center">
              Analyzing Compatibility...
            </div>
          ) : score() !== null ? (
            <div class="animate-in zoom-in duration-500 w-full flex flex-col gap-4">
              <div class="text-5xl md:text-[120px] leading-none font-black text-pink-500 drop-shadow-lg md:-mb-4">
                {score()}%
              </div>
              <div class="text-lg md:text-xl font-medium text-gray-300 italic max-w-sm mx-auto">
                {message()}
              </div>
            </div>
          ) : (
            <button
              onClick={calculate}
              class="bg-pink-500 px-8 md:px-12 py-4 md:py-5 rounded-full text-xl md:text-2xl font-black hover:bg-pink-600 transition-all shadow-xl hover:scale-105"
            >
              Calculate Love
            </button>
          )}
        </div>

        <p class="text-[10px] text-gray-600 uppercase tracking-widest px-4 relative z-10">
          For Entertainment Purposes Only
        </p>
      </div>
    </div>
  );
}

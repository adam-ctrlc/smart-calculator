import { createSignal, createMemo } from "solid-js";
import MathDisplay from "../../components/MathDisplay";
import Input from "../../components/Input";

export default function HeightConverter() {
  const [cm, setCm] = createSignal(170);

  const feet = createMemo(() => Math.floor(cm() / 30.48));
  const inches = createMemo(() => ((cm() / 2.54) % 12).toFixed(1));

  const latexFormula = `1 \\text{ ft} = 30.48 \\text{ cm}`;
  const latexFormula2 = `1 \\text{ inch} = 2.54 \\text{ cm}`;

  const step1 = createMemo(
    () =>
      `\\text{Total Inches} = \\frac{${cm()}}{2.54} \\approx ${(
        cm() / 2.54
      ).toFixed(2)}`
  );

  const step2 = createMemo(
    () =>
      `\\text{Feet} = \\lfloor \\frac{${(cm() / 2.54).toFixed(
        2
      )}}{12} \\rfloor = ${feet()}'`
  );

  const step3 = createMemo(
    () =>
      `\\text{Remaining Inches} = ${(cm() / 2.54).toFixed(
        2
      )} \\pmod{12} \\approx ${inches()}`
  );

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white px-2 sm:px-0">
      <h1 class="text-2xl md:text-3xl font-bold">Height Converter</h1>

      <div class="bg-surface p-6 md:p-8 rounded-2xl border border-border-subtle shadow-xl">
        <div class="flex flex-col gap-8">
          {/* Input Section */}
          <div class="max-w-md mx-auto flex flex-col gap-4">
            <div class="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
              <span>Height in Centimeters</span>
              <span class="text-primary font-mono">{cm()} cm</span>
            </div>

            <input
              type="range"
              min="50"
              max="250"
              value={cm()}
              onInput={(e) => setCm(parseFloat(e.currentTarget.value))}
              class="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary border border-border-subtle"
            />

            <div class="flex items-center gap-4 bg-background border border-border-subtle rounded-xl p-3 focus-within:border-primary transition-colors">
              <Input
                type="number"
                value={cm()}
                onInput={(e) => setCm(parseFloat(e.currentTarget.value) || 0)}
                inputClass="flex-1 bg-transparent border-none text-2xl md:text-3xl font-bold text-center p-0"
              />
              <span class="text-gray-500 font-bold pr-2">CM</span>
            </div>
          </div>

          {/* Result Section */}
          <div class="pt-10 border-t border-border-subtle">
            <div class="grid grid-cols-1 gap-6 max-w-md mx-auto">
              <div class="bg-primary/10 border border-primary/30 p-8 rounded-2xl text-center relative overflow-hidden group transition-all hover:bg-primary/20 flex flex-col gap-4">
                <div class="text-xs text-primary font-black uppercase tracking-[0.2em]">
                  Imperial Height
                </div>

                <div class="flex items-baseline justify-center gap-2 md:gap-4 flex-wrap">
                  <div class="flex items-baseline gap-1">
                    <span class="text-4xl md:text-8xl font-black text-white leading-none">
                      {feet()}
                    </span>
                    <span class="text-xl md:text-2xl font-bold text-primary/60">
                      ft
                    </span>
                  </div>
                  <div class="flex items-baseline gap-1">
                    <span class="text-4xl md:text-8xl font-black text-white leading-none">
                      {Math.floor(parseFloat(inches()))}
                    </span>
                    <span class="text-xl md:text-2xl font-bold text-primary/60">
                      in
                    </span>
                  </div>
                </div>

                <div class="font-mono text-xl text-gray-400">
                  {feet()}' {inches()}"
                </div>

                {/* Decoration */}
                <div class="absolute top-0 right-0 size-16 bg-primary/20 blur-2xl rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-surface p-6 rounded-xl border border-border-subtle shadow-md overflow-hidden flex flex-col gap-6">
        <h2 class="text-xl font-bold border-b border-border-subtle pb-2">
          Calculation Steps
        </h2>
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-3">
            <p class="text-xs font-bold text-gray-500 uppercase">
              Conversion Logic
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-background p-4 rounded-lg border border-border-subtle overflow-x-auto text-center font-bold">
                <MathDisplay latex={latexFormula} />
              </div>
              <div class="bg-background p-4 rounded-lg border border-border-subtle overflow-x-auto text-center font-bold">
                <MathDisplay latex={latexFormula2} />
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-6">
            {[
              { title: "1. Convert to Total Inches", latex: step1() },
              { title: "2. Extract Feet", latex: step2() },
              { title: "3. Remaining Inches", latex: step3() },
            ].map((step) => (
              <div class="flex flex-col gap-2">
                <p class="text-xs font-bold text-gray-500 uppercase">
                  {step.title}
                </p>
                <div class="bg-background p-4 rounded-lg border border-border-subtle overflow-x-auto">
                  <div class="min-w-max flex justify-center py-2">
                    <MathDisplay latex={step.latex} display={true} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

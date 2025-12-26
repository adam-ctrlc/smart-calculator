import { createSignal, createMemo } from "solid-js";
import Select from "../../components/Select";
import Input from "../../components/Input";

export default function FractionSolver() {
  const [num1, setNum1] = createSignal(1);
  const [den1, setDen1] = createSignal(2);
  const [num2, setNum2] = createSignal(1);
  const [den2, setDen2] = createSignal(4);
  const [operator, setOperator] = createSignal("+");

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  const result = createMemo(() => {
    let rNum, rDen;
    const n1 = num1(),
      d1 = den1();
    const n2 = num2(),
      d2 = den2();

    if (operator() === "+") {
      rNum = n1 * d2 + n2 * d1;
      rDen = d1 * d2;
    } else if (operator() === "-") {
      rNum = n1 * d2 - n2 * d1;
      rDen = d1 * d2;
    } else if (operator() === "*") {
      rNum = n1 * n2;
      rDen = d1 * d2;
    } else {
      rNum = n1 * d2;
      rDen = d1 * n2;
    }

    if (rDen === 0) return { error: "Division by zero" };

    const common = Math.abs(gcd(rNum, rDen));
    const simplifiedNum = rNum / common;
    const simplifiedDen = rDen / common;

    return {
      num: simplifiedNum,
      den: simplifiedDen,
      mixed:
        Math.abs(simplifiedNum) >= simplifiedDen
          ? {
              whole:
                Math.floor(Math.abs(simplifiedNum) / simplifiedDen) *
                (simplifiedNum < 0 ? -1 : 1),
              rem: Math.abs(simplifiedNum) % simplifiedDen,
            }
          : null,
    };
  });

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Fraction Solver</h1>

      <div class="grid md:grid-cols-2 gap-8 items-start">
        <div class="flex flex-col gap-6">
          <div class="bg-surface p-6 rounded-2xl border border-border-subtle shadow-lg flex flex-col gap-6">
            <h2 class="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Input Fractions
            </h2>

            <div class="flex flex-col gap-8">
              {/* Fraction 1 */}
              <div class="flex items-center gap-6">
                <div class="flex flex-col items-center gap-3">
                  <Input
                    type="number"
                    value={num1()}
                    onInput={(e) =>
                      setNum1(parseInt(e.currentTarget.value) || 0)
                    }
                    inputClass="w-24 text-center text-2xl font-black text-primary p-3"
                  />
                  <div class="w-28 h-1.5 bg-white/10 rounded-full"></div>
                  <Input
                    type="number"
                    value={den1()}
                    onInput={(e) =>
                      setDen1(parseInt(e.currentTarget.value) || 1)
                    }
                    inputClass="w-24 text-center text-2xl font-black text-primary p-3"
                  />
                </div>

                <div class="w-24 relative group">
                  <Select
                    value={operator()}
                    onChange={(e) => setOperator(e.currentTarget.value)}
                    selectClass="bg-primary border-none text-white text-3xl font-black h-16 rounded-2xl p-0 text-center pr-8"
                  >
                    <option value="+">+</option>
                    <option value="-">−</option>
                    <option value="*">×</option>
                    <option value="/">÷</option>
                  </Select>
                  <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-600 uppercase w-full text-center">
                    Solve
                  </div>
                </div>

                {/* Fraction 2 */}
                <div class="flex flex-col items-center gap-3">
                  <Input
                    type="number"
                    value={num2()}
                    onInput={(e) =>
                      setNum2(parseInt(e.currentTarget.value) || 0)
                    }
                    inputClass="w-24 text-center text-2xl font-black text-primary p-3"
                  />
                  <div class="w-28 h-1.5 bg-white/10 rounded-full"></div>
                  <Input
                    type="number"
                    value={den2()}
                    onInput={(e) =>
                      setDen2(parseInt(e.currentTarget.value) || 1)
                    }
                    inputClass="w-24 text-center text-2xl font-black text-primary p-3"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="bg-surface/50 p-6 rounded-2xl border border-dashed border-border-subtle text-center">
            <p class="text-sm text-gray-500 italic">
              "Fractions are parts of a whole, like slices of a digital pie."
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <div class="bg-primary p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden min-h-[300px]">
            {/* Background decoration */}
            <div class="absolute -right-16 -top-16 size-64 bg-white/10 rounded-full blur-3xl"></div>

            <div class="relative z-10 w-full flex flex-col gap-6">
              <div class="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">
                Simplified Result
              </div>

              <div class="flex flex-col items-center gap-4">
                {result().error ? (
                  <div class="text-white text-2xl font-bold bg-red-500/50 px-6 py-3 rounded-xl border border-red-400/50">
                    {result().error}
                  </div>
                ) : (
                  <>
                    <div class="text-8xl font-black text-white drop-shadow-2xl leading-none">
                      {result().num}
                    </div>
                    <div class="w-32 h-2 bg-white/30 rounded-full"></div>
                    <div class="text-8xl font-black text-white drop-shadow-2xl leading-none">
                      {result().den}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {!result().error && result().mixed && result().mixed.rem !== 0 && (
            <div class="bg-surface p-8 rounded-2xl border border-border-subtle shadow-md text-center animate-in zoom-in duration-500 flex flex-col gap-4">
              <div class="text-xs text-gray-500 uppercase font-bold tracking-widest">
                Mixed Number Form
              </div>
              <div class="flex items-center justify-center gap-4">
                <span class="text-8xl font-black text-white">
                  {result().mixed.whole}
                </span>
                <div class="flex flex-col items-center gap-2">
                  <span class="text-3xl font-bold text-primary">
                    {result().mixed.rem}
                  </span>
                  <div class="w-12 h-1 bg-primary/20 rounded-full"></div>
                  <span class="text-3xl font-bold text-primary">
                    {result().den}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

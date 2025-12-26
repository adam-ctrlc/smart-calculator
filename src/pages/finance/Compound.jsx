import { createSignal, createMemo } from "solid-js";
import Input from "../../components/Input";
import { currencySymbol } from "../../store/settings";

export default function CompoundInterest() {
  const [initialAmount, setInitialAmount] = createSignal(10000);
  const [monthlyContribution, setMonthlyContribution] = createSignal(500);
  const [years, setYears] = createSignal(10);
  const [rate, setRate] = createSignal(7);

  const totalBalance = createMemo(() => {
    const P = initialAmount();
    const PMT = monthlyContribution();
    const r = rate() / 100 / 12;
    const n = 12;
    const t = years();

    // Compound Interest for Principal: P * (1 + r/n)^(nt)
    const principalCompounded = P * Math.pow(1 + r, n * t);

    // Future Value of Series: PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
    const seriesFutureValue = (PMT * (Math.pow(1 + r, n * t) - 1)) / r;

    return Math.round(principalCompounded + seriesFutureValue);
  });

  const totalContributions = createMemo(
    () => initialAmount() + monthlyContribution() * 12 * years()
  );
  const totalInterest = createMemo(() => totalBalance() - totalContributions());

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Compound Interest Calculator</h1>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-6 bg-surface p-6 rounded-xl border border-border-subtle shadow-md">
          <Input
            label={`Initial Investment (${currencySymbol()})`}
            type="number"
            value={initialAmount()}
            onInput={(e) =>
              setInitialAmount(parseFloat(e.currentTarget.value) || 0)
            }
            inputClass="p-2"
          />
          <Input
            label={`Monthly Contribution (${currencySymbol()})`}
            type="number"
            value={monthlyContribution()}
            onInput={(e) =>
              setMonthlyContribution(parseFloat(e.currentTarget.value) || 0)
            }
            inputClass="p-2"
          />
          <div class="grid grid-cols-2 gap-4">
            <Input
              label="Years"
              type="number"
              value={years()}
              onInput={(e) => setYears(parseInt(e.currentTarget.value) || 0)}
              inputClass="p-2"
            />
            <Input
              label="Annual Rate (%)"
              type="number"
              step="0.1"
              value={rate()}
              onInput={(e) => setRate(parseFloat(e.currentTarget.value) || 0)}
              inputClass="p-2"
            />
          </div>
        </div>

        <div class="bg-surface p-6 rounded-xl border border-border-subtle flex flex-col justify-center gap-6 shadow-md text-center">
          <div class="flex flex-col gap-2">
            <div class="text-sm text-gray-400 uppercase tracking-wide">
              Estimated Balance
            </div>
            <div class="text-6xl font-black text-green-400">
              {currencySymbol()}
              {totalBalance().toLocaleString()}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 pt-6 border-t border-border-subtle">
            <div class="flex flex-col gap-1">
              <div class="text-xs text-gray-400 uppercase">
                Total Contributions
              </div>
              <div class="text-xl font-bold">
                {currencySymbol()}
                {totalContributions().toLocaleString()}
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="text-xs text-gray-400 uppercase">Interest Earned</div>
              <div class="text-xl font-bold text-primary">
                {currencySymbol()}
                {totalInterest().toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { createSignal, createMemo } from "solid-js";
import Select from "../../components/Select";
import Input from "../../components/Input";
import { currencySymbol } from "../../store/settings";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = createSignal(300000);
  const [downPayment, setDownPayment] = createSignal(60000);
  const [loanTerm, setLoanTerm] = createSignal(30);
  const [interestRate, setInterestRate] = createSignal(6.5);

  const loanAmount = createMemo(() => homePrice() - downPayment());
  const monthlyRate = createMemo(() => interestRate() / 100 / 12);
  const numberOfPayments = createMemo(() => loanTerm() * 12);

  const monthlyPayment = createMemo(() => {
    const r = monthlyRate();
    const n = numberOfPayments();
    const p = loanAmount();
    if (r === 0) return p / n;
    return (p * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  });

  const totalPayment = createMemo(() => monthlyPayment() * numberOfPayments());
  const totalInterest = createMemo(() => totalPayment() - loanAmount());

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Mortgage Calculator</h1>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-6 bg-surface p-6 rounded-xl border border-border-subtle shadow-md">
          <Input
            label={`Home Price (${currencySymbol()})`}
            type="number"
            value={homePrice()}
            onInput={(e) =>
              setHomePrice(parseFloat(e.currentTarget.value) || 0)
            }
            inputClass="p-2"
          />
          <Input
            label={`Down Payment (${currencySymbol()})`}
            type="number"
            value={downPayment()}
            onInput={(e) =>
              setDownPayment(parseFloat(e.currentTarget.value) || 0)
            }
            inputClass="p-2"
          />
          <div class="grid grid-cols-2 gap-4">
            <Select
              label="Loan Term (Years)"
              value={loanTerm()}
              onChange={(e) => setLoanTerm(parseInt(e.currentTarget.value))}
              selectClass="p-2"
            >
              <option value={15}>15 Years</option>
              <option value={30}>30 Years</option>
              <option value={10}>10 Years</option>
              <option value={20}>20 Years</option>
            </Select>
            <Input
              label="Interest Rate (%)"
              type="number"
              step="0.1"
              value={interestRate()}
              onInput={(e) =>
                setInterestRate(parseFloat(e.currentTarget.value) || 0)
              }
              inputClass="p-2"
            />
          </div>
        </div>

        <div class="bg-surface p-6 rounded-xl border border-border-subtle flex flex-col justify-center gap-6 shadow-md">
          <div class="text-center">
            <div class="text-sm text-gray-400 uppercase tracking-wide">
              Monthly Payment
            </div>
            <div class="text-5xl font-black text-primary my-2">
              {currencySymbol()}
              {Math.round(monthlyPayment()).toLocaleString()}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 pt-6 border-t border-border-subtle text-center">
            <div class="flex flex-col gap-1">
              <div class="text-xs text-gray-400 uppercase">Total Principle</div>
              <div class="text-xl font-bold">
                {currencySymbol()}
                {loanAmount().toLocaleString()}
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="text-xs text-gray-400 uppercase">Total Interest</div>
              <div class="text-xl font-bold text-red-400">
                {currencySymbol()}
                {Math.round(totalInterest()).toLocaleString()}
              </div>
            </div>
          </div>

          <div class="bg-background/50 p-4 rounded-lg border border-border-subtle text-center flex flex-col gap-1">
            <div class="text-xs text-gray-400 uppercase">Total Payoff</div>
            <div class="text-2xl font-bold text-green-400">
              {currencySymbol()}
              {Math.round(totalPayment()).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

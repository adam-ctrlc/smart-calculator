import { createSignal, createMemo, For } from "solid-js";
import Input from "../../components/Input";
import { currencySymbol } from "../../store/settings";

export default function LoanAmortization() {
  const [amount, setAmount] = createSignal(10000);
  const [term, setTerm] = createSignal(24); // months
  const [rate, setRate] = createSignal(5);

  const schedule = createMemo(() => {
    const P = amount();
    const r = rate() / 100 / 12;
    const n = term();

    const monthlyPayment =
      r === 0
        ? P / n
        : (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

    let balance = P;
    const rows = [];

    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = monthlyPayment - interest;
      balance = Math.max(0, balance - principal);

      rows.push({
        month: i,
        payment: monthlyPayment.toFixed(2),
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance.toFixed(2),
      });
    }
    return { rows, monthlyPayment: monthlyPayment.toFixed(2) };
  });

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Loan Amortization</h1>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-6 bg-surface p-6 rounded-xl border border-border-subtle shadow-md">
          <Input
            label={`Loan Amount (${currencySymbol()})`}
            type="number"
            value={amount()}
            onInput={(e) => setAmount(parseFloat(e.currentTarget.value) || 0)}
            inputClass="p-2"
          />
          <div class="grid grid-cols-2 gap-4">
            <Input
              label="Term (Months)"
              type="number"
              value={term()}
              onInput={(e) => setTerm(parseInt(e.currentTarget.value) || 0)}
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

          <div class="p-6 bg-primary/10 rounded-xl border border-primary/20 text-center flex flex-col gap-1">
            <div class="text-sm text-primary uppercase font-bold">
              Monthly Payment
            </div>
            <div class="text-4xl font-black text-primary">
              {currencySymbol()}
              {schedule().monthlyPayment}
            </div>
          </div>
        </div>

        <div class="bg-surface rounded-xl border border-border-subtle shadow-md flex flex-col h-[500px]">
          <div class="p-4 border-b border-border-subtle font-bold bg-background/50">
            Payment Schedule
          </div>
          <div class="flex-1 overflow-auto">
            <table class="w-full text-left border-collapse">
              <thead class="sticky top-0 bg-surface text-[10px] text-gray-400 uppercase tracking-wider border-b border-border-subtle shadow-sm">
                <tr>
                  <th class="p-4">Mo.</th>
                  <th class="p-4">Payment</th>
                  <th class="p-4">Princ.</th>
                  <th class="p-4">Int.</th>
                  <th class="p-4">Balance</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <For each={schedule().rows}>
                  {(row) => (
                    <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td class="p-4 text-gray-400">{row.month}</td>
                      <td class="p-4 font-medium">
                        {currencySymbol()}
                        {row.payment}
                      </td>
                      <td class="p-4 text-green-400">
                        {currencySymbol()}
                        {row.principal}
                      </td>
                      <td class="p-4 text-red-400">
                        {currencySymbol()}
                        {row.interest}
                      </td>
                      <td class="p-4 font-mono text-xs">
                        {currencySymbol()}
                        {row.balance}
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

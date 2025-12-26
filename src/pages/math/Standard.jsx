import { createSignal } from "solid-js";

export default function StandardCalculator() {
  const [display, setDisplay] = createSignal("0");
  const [equation, setEquation] = createSignal("");
  const [isNewNumber, setIsNewNumber] = createSignal(true);

  const handleNumber = (num) => {
    if (isNewNumber()) {
      setDisplay(num.toString());
      setIsNewNumber(false);
    } else {
      setDisplay((prev) => (prev === "0" ? num.toString() : prev + num));
    }
  };

  const handleOperator = (op) => {
    setEquation(`${display()} ${op} `);
    setIsNewNumber(true);
  };

  const handleEqual = () => {
    try {
      const fullEquation = equation() + display();
      // eslint-disable-next-line no-eval
      const result = eval(fullEquation.replace(/x/g, "*").replace(/÷/g, "/"));

      setDisplay(String(result));
      setEquation("");
      setIsNewNumber(true);
    } catch (e) {
      setDisplay("Error");
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setIsNewNumber(true);
  };

  const getIcon = (label) => {
    const iconMap = {
      C: "backspace",
      "÷": "percent",
      x: "close",
      "-": "remove",
      "+": "add",
      "=": "drag_handle",
      ".": "fiber_manual_record",
    };
    return iconMap[label];
  };

  const buttons = [
    { label: "C", type: "action", onClick: handleClear },
    { label: "(", type: "action", onClick: () => handleNumber("(") },
    { label: ")", type: "action", onClick: () => handleNumber(")") },
    { label: "÷", type: "op", onClick: () => handleOperator("/") },
    { label: "7", type: "num", onClick: () => handleNumber(7) },
    { label: "8", type: "num", onClick: () => handleNumber(8) },
    { label: "9", type: "num", onClick: () => handleNumber(9) },
    { label: "x", type: "op", onClick: () => handleOperator("*") },
    { label: "4", type: "num", onClick: () => handleNumber(4) },
    { label: "5", type: "num", onClick: () => handleNumber(5) },
    { label: "6", type: "num", onClick: () => handleNumber(6) },
    { label: "-", type: "op", onClick: () => handleOperator("-") },
    { label: "1", type: "num", onClick: () => handleNumber(1) },
    { label: "2", type: "num", onClick: () => handleNumber(2) },
    { label: "3", type: "num", onClick: () => handleNumber(3) },
    { label: "+", type: "op", onClick: () => handleOperator("+") },
    {
      label: "0",
      type: "num",
      onClick: () => handleNumber(0),
      span: "col-span-2",
    },
    { label: ".", type: "num", onClick: () => handleNumber(".") },
    { label: "=", type: "eq", onClick: handleEqual },
  ];

  return (
    <div class="max-w-md mx-auto text-white">
      <h1 class="text-3xl font-bold mb-6 text-left">Advanced Calculator</h1>
      <div class="bg-surface p-6 rounded-3xl border border-border-subtle shadow-2xl">
        {/* Display */}
        <div class="bg-background rounded-2xl p-6 mb-8 text-right border border-border-subtle shadow-inner overflow-hidden">
          <div class="text-gray-500 font-mono text-sm h-6 mb-1 tracking-wider">
            {equation()}
          </div>
          <div class="text-5xl font-black text-white overflow-x-auto overflow-y-hidden scrollbar-hide py-2">
            {display()}
          </div>
        </div>

        {/* Buttons */}
        <div class="grid grid-cols-4 gap-4">
          {buttons.map((btn) => (
            <button
              onClick={btn.onClick}
              class={`
                aspect-square flex items-center justify-center rounded-2xl transition-all duration-200 active:scale-95 shadow-lg
                ${btn.span ? btn.span + " !aspect-auto" : ""}
                ${
                  btn.type === "num"
                    ? "bg-[#2a3441] text-white hover:bg-[#374151] hover:shadow-primary/5 text-2xl font-bold"
                    : btn.type === "op"
                    ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                    : btn.type === "eq"
                    ? "bg-primary text-white hover:bg-primary-dark hover:shadow-primary/30"
                    : "bg-[#1f2937] text-gray-400 hover:text-white hover:bg-gray-700"
                }
              `}
            >
              {btn.type === "num" || btn.label === "(" || btn.label === ")" ? (
                <span class="text-2xl font-bold">{btn.label}</span>
              ) : (
                <span class="material-symbols-outlined text-2xl">
                  {getIcon(btn.label) || btn.label}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

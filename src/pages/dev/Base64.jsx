import { createSignal } from "solid-js";
import Input from "../../components/Input";

export default function Base64Converter() {
  const [input, setInput] = createSignal("");
  const [output, setOutput] = createSignal("");
  const [mode, setMode] = createSignal("encode"); // encode or decode

  const process = () => {
    try {
      if (!input().trim()) {
        setOutput("");
        return;
      }
      if (mode() === "encode") {
        setOutput(btoa(input()));
      } else {
        setOutput(atob(input()));
      }
    } catch (e) {
      setOutput("Error: Invalid input for selected mode.");
    }
  };

  const swap = () => {
    setMode(mode() === "encode" ? "decode" : "encode");
    const oldInput = input();
    setInput(output().startsWith("Error") ? "" : output());
    setOutput(oldInput);
  };

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">Base64 Converter</h1>

      <div class="bg-surface p-8 rounded-xl border border-border-subtle shadow-md flex flex-col gap-8">
        <div class="flex items-center gap-6 pb-6 border-b border-border-subtle">
          <div
            class={`flex-1 p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${
              mode() === "encode"
                ? "border-primary bg-primary/10"
                : "border-transparent bg-background/50 hover:bg-background"
            }`}
            onClick={() => {
              setMode("encode");
              process();
            }}
          >
            <div class="text-xs uppercase font-bold text-gray-500 mb-1">
              Text to
            </div>
            <div class="text-xl font-bold">Base64</div>
          </div>

          <button
            onClick={swap}
            class="size-10 rounded-full bg-border-subtle flex items-center justify-center hover:bg-primary transition-colors hover:rotate-180 duration-500"
          >
            <span class="material-symbols-outlined">swap_horiz</span>
          </button>

          <div
            class={`flex-1 p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${
              mode() === "decode"
                ? "border-primary bg-primary/10"
                : "border-transparent bg-background/50 hover:bg-background"
            }`}
            onClick={() => {
              setMode("decode");
              process();
            }}
          >
            <div class="text-xs uppercase font-bold text-gray-500 mb-1">
              Base64 to
            </div>
            <div class="text-xl font-bold">Text</div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="flex flex-col gap-4">
            <label class="text-xs text-gray-400 uppercase font-bold px-1">
              Input
            </label>
            <Input
              type="textarea"
              value={input()}
              onInput={(e) => {
                setInput(e.currentTarget.value);
                process();
              }}
              inputClass="h-48 font-mono text-sm shadow-inner"
            />
          </div>
          <div class="flex flex-col gap-4">
            <label class="text-xs text-gray-400 uppercase font-bold px-1">
              Result
            </label>
            <div class="w-full h-48 bg-background border border-border-subtle rounded-xl p-4 font-mono text-sm break-all overflow-auto text-primary">
              {output()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

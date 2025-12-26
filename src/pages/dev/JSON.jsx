import { createSignal } from "solid-js";
import Input from "../../components/Input";

export default function JSONFormatter() {
  const [input, setInput] = createSignal("");
  const [output, setOutput] = createSignal("");
  const [error, setError] = createSignal("");

  const formatJSON = () => {
    try {
      if (!input().trim()) return;
      const parsed = JSON.parse(input());
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError(e.message);
      setOutput("");
    }
  };

  const minifyJSON = () => {
    try {
      if (!input().trim()) return;
      const parsed = JSON.parse(input());
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError(e.message);
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output());
  };

  return (
    <div class="max-w-5xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">JSON Formatter</h1>

      <div class="grid md:grid-cols-2 gap-6 items-stretch">
        <div class="flex flex-col gap-4">
          <label class="text-xs text-gray-400 uppercase tracking-widest font-bold">
            Input Raw JSON
          </label>
          <Input
            type="textarea"
            value={input()}
            onInput={(e) => setInput(e.currentTarget.value)}
            placeholder='{"key": "value"}'
            inputClass="flex-1 min-h-[400px] font-mono text-sm shadow-inner"
          />
          <div class="flex gap-4">
            <button
              onClick={formatJSON}
              class="flex-1 bg-primary py-3 rounded-lg font-bold hover:bg-primary/80 transition-all shadow-lg"
            >
              Beautify
            </button>
            <button
              onClick={minifyJSON}
              class="flex-1 bg-surface border border-border-subtle py-3 rounded-lg font-bold hover:bg-white/5 transition-all"
            >
              Minify
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center px-1">
            <label class="text-xs text-gray-400 uppercase tracking-widest font-bold">
              Processed Result
            </label>
            {output() && (
              <button
                onClick={copyToClipboard}
                class="text-xs text-primary hover:underline flex items-center gap-1 font-bold"
              >
                <span class="material-symbols-outlined text-sm">
                  content_copy
                </span>
                Copy Result
              </button>
            )}
          </div>
          <div class="relative flex-1">
            <Input
              type="textarea"
              readonly
              value={output()}
              inputClass="h-full min-h-[400px] font-mono text-sm text-green-400"
            />
            {error() && (
              <div class="absolute inset-x-4 top-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200 text-xs font-mono animate-in fade-in slide-in-from-top-2">
                {error()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

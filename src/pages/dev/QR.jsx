import { createSignal } from "solid-js";
import Input from "../../components/Input";

export default function QRGenerator() {
  const [text, setText] = createSignal("https://google.com");
  const [size, setSize] = createSignal(250);

  const qrUrl = () =>
    `https://api.qrserver.com/v1/create-qr-code/?size=${size()}x${size()}&data=${encodeURIComponent(
      text()
    )}`;

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">QR Code Generator</h1>

      <div class="grid md:grid-cols-2 gap-8 items-start">
        <div class="flex flex-col gap-6 bg-surface p-6 rounded-xl border border-border-subtle shadow-md">
          <div class="flex flex-col gap-2">
            <label class="block text-sm font-medium text-gray-300">
              Content (URL or Text)
            </label>
            <Input
              type="textarea"
              value={text()}
              onInput={(e) => setText(e.currentTarget.value)}
              placeholder="Enter link or text here..."
              inputClass="h-32 font-mono text-sm"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="block text-sm font-medium text-gray-300">
              Size: {size()}px
            </label>
            <input
              type="range"
              min="100"
              max="500"
              step="50"
              value={size()}
              onInput={(e) => setSize(parseInt(e.currentTarget.value))}
              class="w-full h-2 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <a
            href={qrUrl()}
            download="qrcode.png"
            target="_blank"
            class="flex items-center justify-center gap-2 w-full bg-primary py-4 rounded-xl font-bold hover:bg-primary/80 transition-all shadow-lg mt-2"
          >
            <span class="material-symbols-outlined">download</span>
            Download Image
          </a>
        </div>

        <div class="bg-surface p-12 rounded-xl border border-border-subtle shadow-md flex flex-col items-center justify-center text-center gap-8">
          <div class="bg-white p-4 rounded-xl shadow-2xl">
            <img src={qrUrl()} alt="QR Code" class="max-w-full h-auto" />
          </div>
          <p class="text-sm text-gray-400">Scan to preview on your device</p>
        </div>
      </div>
    </div>
  );
}

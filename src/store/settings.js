import { createSignal } from "solid-js";

export const currencies = {
  PHP: { symbol: "₱", name: "Philippine Peso" },
  USD: { symbol: "$", name: "US Dollar" },
  EUR: { symbol: "€", name: "Euro" },
  GBP: { symbol: "£", name: "British Pound" },
  JPY: { symbol: "¥", name: "Japanese Yen" },
};

const [currency, setCurrency] = createSignal("PHP");

export { currency, setCurrency };

export const currencySymbol = () => currencies[currency()]?.symbol || "₱";
export const currencyName = () =>
  currencies[currency()]?.name || "Philippine Peso";

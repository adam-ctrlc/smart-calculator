import { splitProps } from "solid-js";

let selectIdCounter = 0;
const generateId = () => `select-${++selectIdCounter}`;

export default function Select(props) {
  const [local, rest] = splitProps(props, [
    "children",
    "class",
    "selectClass",
    "label",
    "labelClass",
    "id",
  ]);
  const id = local.id || generateId();

  return (
    <div class={`flex flex-col gap-2 w-full ${local.class || ""}`}>
      {local.label && (
        <label
          for={id}
          class={`block text-sm font-medium text-gray-300 px-1 ${
            local.labelClass || ""
          }`}
        >
          {local.label}
        </label>
      )}
      <div class="relative group w-full">
        <select
          {...rest}
          id={id}
          class={`
            w-full appearance-none bg-surface border border-border-subtle 
            rounded-xl p-4 pr-12 text-white text-base font-medium
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 
            transition-all cursor-pointer hover:bg-white/5
            color-scheme-dark
            ${local.selectClass || ""}
          `}
        >
          {local.children}
        </select>
        <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-[24px]">expand_more</span>
        </div>
      </div>
    </div>
  );
}

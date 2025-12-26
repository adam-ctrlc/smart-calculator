import { splitProps } from "solid-js";

let inputIdCounter = 0;
const generateId = () => `input-${++inputIdCounter}`;

export default function Input(props) {
  const [local, rest] = splitProps(props, [
    "class",
    "inputClass",
    "type",
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
        {local.type === "textarea" ? (
          <textarea
            {...rest}
            id={id}
            class={`
              w-full bg-surface border border-border-subtle 
              rounded-xl p-4 text-white text-base font-medium
              focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 
              transition-all hover:bg-white/5
              placeholder:text-gray-500
              disabled:opacity-50 disabled:cursor-not-allowed
              resize-none
              color-scheme-dark
              ${local.inputClass || ""}
            `}
          />
        ) : (
          <input
            {...rest}
            id={id}
            type={local.type || "text"}
            class={`
              w-full bg-surface border border-border-subtle 
              rounded-xl p-4 text-white text-base font-medium
              focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 
              transition-all hover:bg-white/5
              placeholder:text-gray-500
              disabled:opacity-50 disabled:cursor-not-allowed
              color-scheme-dark
              ${local.inputClass || ""}
            `}
          />
        )}
      </div>
    </div>
  );
}

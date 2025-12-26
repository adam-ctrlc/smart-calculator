import { A, useLocation } from "@solidjs/router";
import { For, createMemo } from "solid-js";
import { categories } from "../utils/toolsData";

export default function ToolLayout(props) {
  const location = useLocation();

  const currentCategory = createMemo(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    if (pathParts.length < 1) return null;
    return categories.find((cat) =>
      cat.tools.some((tool) => tool.href === location.pathname)
    );
  });

  return (
    <div class="flex flex-col lg:flex-row gap-8">
      {/* Tool Sidebar */}
      <aside class="w-full lg:w-64 flex-shrink-0">
        <div class="bg-surface border border-border-subtle rounded-xl overflow-hidden lg:fixed lg:top-28 lg:w-64">
          <div class="p-4 border-b border-border-subtle bg-primary/5">
            <div class="flex items-center gap-2 text-primary font-bold">
              <span class="material-symbols-outlined">
                {currentCategory()?.icon || "category"}
              </span>
              <span class="text-sm uppercase tracking-wider">
                {currentCategory()?.title || "Related Tools"}
              </span>
            </div>
          </div>
          <nav class="p-2 flex flex-col gap-1 overflow-hidden">
            <For each={currentCategory()?.tools}>
              {(tool) => (
                <A
                  href={tool.href}
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group min-w-0"
                  activeClass="bg-primary/10 text-primary"
                >
                  <span class="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors flex-shrink-0">
                    {tool.icon}
                  </span>
                  <span class="text-sm font-medium truncate">{tool.label}</span>
                </A>
              )}
            </For>
            <div class="pt-4 mt-4 border-t border-border-subtle p-2">
              <A
                href="/"
                class="flex items-center gap-3 p-2 text-gray-400 hover:text-white transition-colors text-sm min-w-0"
              >
                <span class="material-symbols-outlined flex-shrink-0">
                  arrow_back
                </span>
                <span class="truncate">Back to All Tools</span>
              </A>
            </div>
          </nav>
        </div>
      </aside>

      {/* Tool Content */}
      <div class="flex-1 min-w-0">{props.children}</div>
    </div>
  );
}

import { A } from "@solidjs/router";
import { For, createMemo, createSignal } from "solid-js";
import { popularTools, categories } from "../utils/toolsData";

export default function Home() {
  const [searchQuery, setSearchQuery] = createSignal("");

  const totalTools = createMemo(() =>
    categories.reduce((acc, cat) => acc + cat.tools.length, 0)
  );

  const filteredCategories = createMemo(() => {
    const query = searchQuery().toLowerCase().trim();
    if (!query) return categories;

    return categories
      .map((category) => ({
        ...category,
        tools: category.tools.filter(
          (tool) =>
            tool.label.toLowerCase().includes(query) ||
            category.title.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.tools.length > 0);
  });

  const isSearching = createMemo(() => searchQuery().trim().length > 0);

  return (
    <>
      {/* Hero Section */}
      <div class="@container mb-8">
        <div
          class="flex flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 pb-10 pt-32 md:px-10 overflow-hidden relative"
          style="
            background-image: linear-gradient(
                rgba(0, 0, 0, 0.4) 0%,
                rgba(0, 0, 0, 0.8) 100%
              ),
              url('https://lh3.googleusercontent.com/aida-public/AB6AXuAuc2wYHW-LyFQDd1G5b4Bn9dta5dTEjpQZRgD_TYTVKE-KV-9atn8tt42cnRhYYKTqM7_bwzfTAylqqRlK6kZ7JKQdwBzMd_hHIkVi6xWdLWYK4HNwCpQjtVy3jO5MmyMZjf0ZE5zgkJAZzHPHZnYBRAtYxHIWr9Ox4qAA3O-KgayT59LGBonRu5_09adk8QGidN0XxLPR2XuoDCFZvU12WdDsRQMbPCVjyM1_Yaep2Il0_BR8ouleoNN2jEDlsIbtz6WLrQYEYB0');
          "
        >
          <div class="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
          <div class="flex flex-col gap-2 text-left relative z-10">
            <h1 class="text-white text-3xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
              Your All-in-One Calculation Hub
            </h1>
            <h2 class="text-gray-200 text-sm font-normal leading-normal md:text-lg max-w-2xl">
              Access over {totalTools()} smart tools for finance, health,
              coding, and everyday tasks instantly.
            </h2>
          </div>
        </div>
      </div>

      {/* Most Popular Section - Only show if not searching */}
      {!isSearching() && (
        <div class="mb-10">
          <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
            Most Popular
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <For each={popularTools}>{(tool) => <PopularCard {...tool} />}</For>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div class="mb-10 max-w-2xl">
        <div class="flex flex-col gap-2">
          <label class="text-white text-sm font-bold uppercase tracking-widest pl-1">
            Find a Tool
          </label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
              <span class="material-symbols-outlined">search</span>
            </div>
            <input
              type="text"
              placeholder="What do you want to calculate today?"
              value={searchQuery()}
              onInput={(e) => setSearchQuery(e.currentTarget.value)}
              class="w-full bg-surface border border-border-subtle rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-lg"
            />
            {isSearching() && (
              <button
                onClick={() => setSearchQuery("")}
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <span class="material-symbols-outlined text-xl">close</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <For each={filteredCategories()}>
          {(category) => (
            <CategorySection
              title={category.title}
              icon={category.icon}
              iconColor={category.iconColor}
            >
              <For each={category.tools}>
                {(tool) => <ToolLink {...tool} />}
              </For>
            </CategorySection>
          )}
        </For>

        {isSearching() && filteredCategories().length === 0 && (
          <div class="col-span-full py-20 text-center">
            <span class="material-symbols-outlined text-6xl text-gray-700 mb-4">
              search_off
            </span>
            <p class="text-gray-400 text-lg">
              No tools found matching "{searchQuery()}"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              class="mt-4 text-primary hover:underline font-bold"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function PopularCard(props) {
  const colorClasses = {
    blue: "bg-blue-900/30 text-primary",
    green: "bg-green-900/30 text-green-400",
    purple: "bg-purple-900/30 text-purple-400",
    orange: "bg-orange-900/30 text-orange-400",
  };

  return (
    <A
      class="group flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-5 items-start hover:border-primary hover:shadow-md transition-all"
      href={props.href}
    >
      <div
        class={`size-10 rounded-full flex items-center justify-center ${
          colorClasses[props.color]
        }`}
      >
        <span class="material-symbols-outlined text-[24px]">{props.icon}</span>
      </div>
      <h2 class="text-white text-base font-bold leading-tight group-hover:text-primary">
        {props.title}
      </h2>
      <p class="text-xs text-gray-400">{props.category}</p>
    </A>
  );
}

function CategorySection(props) {
  return (
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2 pb-2 border-b border-border-subtle">
        <span class={`material-symbols-outlined ${props.iconColor}`}>
          {props.icon}
        </span>
        <h3 class="font-bold text-lg text-white">{props.title}</h3>
      </div>
      <div class="flex flex-col gap-2">{props.children}</div>
    </div>
  );
}

function ToolLink(props) {
  return (
    <A
      class="flex items-center gap-3 p-3 rounded-lg bg-surface hover:bg-[#2d3748] border border-transparent hover:border-border-subtle transition-all text-gray-200"
      href={props.href}
    >
      <div class="text-gray-400">
        <span class="material-symbols-outlined text-[20px]">{props.icon}</span>
      </div>
      <span class="font-medium text-sm">{props.label}</span>
    </A>
  );
}

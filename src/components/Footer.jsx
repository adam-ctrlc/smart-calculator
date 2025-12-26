import { A } from "@solidjs/router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="mt-12 bg-surface border-t border-border-subtle py-8">
      <div class="max-w-[1200px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-400 text-center flex items-center justify-center md:justify-start gap-1">
          <span class="material-symbols-outlined text-[16px]">copyright</span>
          {currentYear} Smart Calc App. All rights reserved.
        </p>
        <div class="flex gap-6">
          <A
            class="text-sm text-gray-400 hover:text-primary transition-colors"
            href="/legal"
          >
            Terms & Conditions
          </A>
          <a
            class="text-sm text-gray-400 hover:text-primary transition-colors"
            href="mailto:contact@smartcalc.app"
          >
            Feedback
          </a>
        </div>
      </div>
    </footer>
  );
}

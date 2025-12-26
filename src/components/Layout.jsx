import Header from "./Header";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <div class="bg-background font-display text-white min-h-screen flex flex-col">
      <Header />

      <main class="flex-1 overflow-x-hidden w-full">
        <div class="flex flex-1 justify-center py-5 px-3 md:px-10 lg:px-40">
          <div class="layout-content-container flex flex-col max-w-full lg:max-w-[1200px] flex-1 min-w-0">
            {props.children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden fixed top-0 left-0 h-[50px] w-full px-6 flex items-center bg-green-500 border-b z-50">
      <MobileSidebar/>
    </nav>
  );
};

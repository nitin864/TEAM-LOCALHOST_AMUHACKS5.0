import { MobileHeader } from "@/components/mobile-header";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { Sidebar } from "@/components/sidebar";

 

type Props = {
    children: React.ReactNode;
}

const MainLayout = ({
    children,
}:Props) => {
    return (
       <>
       <MobileHeader/>
        <Sidebar className="hidden lg:flex"/>
         <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
          <div className="max-w-[1056px] mx-auto pt-6 h-full">
            <HeartsModal/>
          {children}
          </div> 
         </main>
        </>
    )
}

export default MainLayout
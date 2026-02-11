import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";
import Image from "next/image";
import Link from "next/link";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn(
        "h-full w-[256px] bg-white px-4 border-r-2 flex flex-col",
        "lg:fixed lg:top-0 lg:left-0 lg:h-screen",
        className
      )}
    >
      {/* Logo */}
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image
            src="/mascot.svg"
            height={40}
            width={40}
            alt="Mascot"
          />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Civic Learn
          </h1>
        </div>
      </Link>

      {/* Navigation */}
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" href="/learn" iconSrc="/learn.png" />
        <SidebarItem label="LeaderBoard" href="/leaderboard" iconSrc="/leader.png" />
        <SidebarItem label="Quest" href="/quests" iconSrc="/quests.png" />
        <SidebarItem label="Shop" href="/shop" iconSrc="/store.png" />
        <SidebarItem label="AI Coach" href="/aicoach" iconSrc="/bot.png" />
        <SidebarItem label="Constitution & Rights" href="/consti" iconSrc="/consti.png" />
        <SidebarItem label="Civic Duties" href="/civic" iconSrc="/civic.png" />
        
      </div>

      {/* User */}
      <div className="p-4 flex justify-center">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};

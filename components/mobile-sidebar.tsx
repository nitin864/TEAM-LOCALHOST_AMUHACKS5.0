"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const MobileSidebar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button aria-label="Open menu" type="button">
          <Menu />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 w-[256px]">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden>
        </SheetHeader>

        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

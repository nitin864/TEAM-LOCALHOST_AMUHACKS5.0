"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};

export const SidebarItem = ({
  label,
  iconSrc,
  href,
}: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px] w-full"
      asChild
    >
      <Link href={href} className="flex items-center gap-x-3 px-3">
        <Image
          src={iconSrc}
          alt={label}
          width={32}
          height={32}
        />
        <span>{label}</span>
      </Link>
    </Button>
  );
};


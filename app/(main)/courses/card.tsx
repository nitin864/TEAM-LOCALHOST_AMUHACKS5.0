"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Props = {
  id: number;
  title: string;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
};

export const Card = ({
  id,
  title,
  imageSrc,
  onClick,
  disabled = false,
  active = false,
}: Props) => {
  return (
    <button
      onClick={() => onClick(id)}
      disabled={disabled}
      className={cn(
        "relative rounded-xl border bg-white p-4 text-left",
        "transition-all duration-200 ease-out",
        "hover:shadow-lg hover:-translate-y-0.5",
        active && "border-green-500 ring-2 ring-green-200",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
     
      {active && (
        <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow">
          <Check className="h-4 w-4 stroke-[3]" />
        </div>
      )}

      {/* Image */}
      <div className="flex justify-center mb-3">
        <Image
          src={imageSrc}
          alt={title}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Title */}
      <p
        className={cn(
          "text-center font-semibold",
          active ? "text-green-600" : "text-neutral-800"
        )}
      >
        {title}
      </p>
    </button>
  );
};

"use client";

import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";
import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";

const POINTS_TO_REFILL = 10;

type Props = {
  hearts: number;
  points: number;
};

export const Items = ({ hearts, points }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts()
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  return (
    <ul className="w-full max-w-xl">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2 border-b-2">
        <Image src="/heart.svg" alt="Heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
          <p className="text-muted-foreground text-sm">
            {hearts === 5 
              ? "Your hearts are already full!" 
              : `Refill all your hearts for ${POINTS_TO_REFILL} points`}
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            "Full"
          ) : (
            <div className="flex items-center gap-x-2">
              <Image src="/points.svg" alt="Points" height={20} width={20} />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>

      {/* Points Info */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Image src="/points.svg" alt="Points" height={24} width={24} />
            <p className="text-neutral-700 font-bold">Your Points</p>
          </div>
          <p className="text-neutral-700 font-bold text-xl">{points}</p>
        </div>
        <p className="text-muted-foreground text-xs">
          Complete lessons to earn more points!
        </p>
      </div>
    </ul>
  );
};
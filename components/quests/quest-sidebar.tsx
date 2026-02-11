import Image from "next/image";
import { CheckCircle } from "lucide-react";

export function QuestSidebar() {
  return (
    <div className="p-6 space-y-6 sticky top-0">

      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-neutral-800">
          Daily Quests
        </h2>
        <p className="text-sm text-neutral-500">
          Earn XP by learning
        </p>
      </div>

      {/* Quest Card */}
      <div className="bg-white rounded-xl border p-4 space-y-2">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-500 h-5 w-5" />
          <p className="font-medium text-sm">
            Complete 1 lesson
          </p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">1 / 1</span>
          <span className="font-bold text-orange-500 flex items-center gap-1">
            <Image src="/points.svg" alt="XP" width={16} height={16} />
            20 XP
          </span>
        </div>
      </div>

      {/* Quest Card */}
      <div className="bg-white rounded-xl border p-4 space-y-2">
        <div className="flex items-center gap-3">
          <Image src="/points.svg" alt="XP" width={18} height={18} />
          <p className="font-medium text-sm">
            Complete 5 lessons
          </p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">2 / 5</span>
          <span className="font-bold text-orange-500">
            100 XP
          </span>
        </div>
      </div>

      {/* Locked Quest */}
      <div className="bg-white rounded-xl border p-4 opacity-60">
        <p className="font-medium text-sm">
          Maintain 7-day streak
        </p>
        <p className="text-xs text-neutral-500 mt-1">
          Unlock by learning daily
        </p>
      </div>

    </div>
  );
}

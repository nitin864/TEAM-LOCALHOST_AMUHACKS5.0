import Image from "next/image";
import { Progress } from "@/components/ui/progress";

const QuestsPage = () => {
  // Mock data for demonstration
  const quests = [
    {
      id: 1,
      title: "Earn 20 XP",
      description: "Complete 2 lessons to earn your first bonus",
      xpReward: 20,
      currentProgress: 1,
      requiredCount: 2,
      completed: false,
    },
    {
      id: 2,
      title: "Earn 100 XP",
      description: "Complete 10 lessons for a bigger reward",
      xpReward: 100,
      currentProgress: 10,
      requiredCount: 10,
      completed: true,
    },
    {
      id: 3,
      title: "Earn 200 XP",
      description: "Complete 20 lessons to master your skills",
      xpReward: 200,
      currentProgress: 5,
      requiredCount: 20,
      completed: false,
    },
  ];

  const userPoints = 570; // Mock user points

  return (
    <div className="flex flex-col gap-y-6 px-6 py-6 lg:px-8 lg:py-8 max-w-[1056px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-700">
          Quests
        </h1>
        <div className="flex items-center gap-x-3 px-4 py-2 bg-orange-50 border-2 border-orange-400 rounded-xl">
          <Image src="/points.svg" alt="Points" height={32} width={32} />
          <span className="text-xl font-bold text-orange-400">
            {userPoints} XP
          </span>
        </div>
      </div>

      <p className="text-muted-foreground text-sm lg:text-base">
        Complete quests to earn bonus XP and level up faster!
      </p>

      {/* Quest List */}
      <div className="space-y-4 mt-4">
        {quests.map((quest) => {
          const progressPercentage =
            (quest.currentProgress / quest.requiredCount) * 100;
          const isCompleted = quest.completed;

          return (
            <div
              key={quest.id}
              className={`border-2 rounded-xl p-6 transition-all ${
                isCompleted
                  ? "bg-green-50 border-green-500 shadow-md"
                  : "bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-x-4">
                {/* Quest Icon & Info */}
                <div className="flex items-start gap-x-4 flex-1">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 ${
                      isCompleted ? "bg-green-500" : "bg-orange-400"
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <Image
                        src="/points.svg"
                        alt="Quest"
                        width={32}
                        height={32}
                      />
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-bold text-lg text-neutral-700">
                        {quest.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {quest.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    {!isCompleted && (
                      <div className="space-y-2">
                        <Progress value={progressPercentage} className="h-3" />
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            Progress: {quest.currentProgress} /{" "}
                            {quest.requiredCount}
                          </p>
                          <p className="text-xs font-semibold text-orange-400">
                            {Math.round(progressPercentage)}% Complete
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Completed Badge */}
                    {isCompleted && (
                      <div className="flex items-center gap-x-2">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm font-bold text-green-500">
                          Quest Completed!
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* XP Reward Badge */}
                <div
                  className={`px-4 py-2 rounded-xl font-bold text-base shrink-0 ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-orange-400 text-white"
                  }`}
                >
                  +{quest.xpReward} XP
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State (optional - shown when no quests) */}
      {quests.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
            <Image src="/points.svg" alt="No quests" width={48} height={48} />
          </div>
          <h3 className="text-xl font-bold text-neutral-700 mb-2">
            No quests available yet!
          </h3>
          <p className="text-muted-foreground">
            Check back soon for new challenges
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestsPage;
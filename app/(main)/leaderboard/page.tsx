import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getTopTenUsers, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LeaderboardPage = async () => {
  const [userProgress, leaderboard] = await Promise.all([
    getUserProgress(),
    getTopTenUsers(),
  ]);

  if (!userProgress || !userProgress.activeCourseId) {
    redirect("/courses");
  }

  const currentUserRank =
    leaderboard.findIndex(
      (user) => user.userId === userProgress.userId
    ) + 1;

  const currentUser = {
    userId: userProgress.userId,
    userName: userProgress.userName,
    userImageSrc: userProgress.userImageSrc,
    points: userProgress.points,
    rank: currentUserRank > 0 ? currentUserRank : leaderboard.length + 1,
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-orange-500";
    return "text-muted-foreground";
  };

  return (
    <div className="max-w-[980px] mx-auto px-4 py-6 lg:py-10 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">
          Leaderboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Track your progress and compete with other learners
        </p>
      </div>

      {/* Current User */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 p-5 shadow-sm border">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-14 w-14 ring-2 ring-white shadow">
                <AvatarImage src={currentUser.userImageSrc} />
                <AvatarFallback>YOU</AvatarFallback>
              </Avatar>
              <span className="absolute -bottom-1 -right-1 text-xs font-semibold bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                #{currentUser.rank}
              </span>
            </div>

            <div>
              <p className="font-semibold">{currentUser.userName}</p>
              <p className="text-xs text-muted-foreground">
                Your position
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm">
            <Image src="/points.svg" alt="XP" width={20} height={20} />
            <span className="font-semibold text-orange-400">
              {currentUser.points} XP
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Podium */}
      {leaderboard.length >= 3 && (
        <>
          <div className="grid grid-cols-3 gap-4 items-end">
            {[1, 0, 2].map((i, pos) => (
              <div
                key={i}
                className={`flex flex-col items-center ${
                  pos === 1 ? "" : "opacity-90"
                }`}
              >
                <Avatar
                  className={`mb-2 ${
                    pos === 1
                      ? "h-20 w-20 ring-4 ring-yellow-400"
                      : "h-16 w-16"
                  }`}
                >
                  <AvatarImage src={leaderboard[i].userImageSrc} />
                </Avatar>

                <p className="text-sm font-semibold truncate max-w-[90px]">
                  {leaderboard[i].userName}
                </p>

                <span className="text-orange-400 font-semibold text-sm">
                  {leaderboard[i].points} XP
                </span>

                <div
                  className={`mt-3 w-full rounded-t-xl flex items-center justify-center font-bold text-white ${
                    pos === 1
                      ? "h-28 bg-yellow-400"
                      : pos === 0
                      ? "h-20 bg-gray-400"
                      : "h-16 bg-orange-500"
                  }`}
                >
                  {pos === 1 ? "1" : pos === 0 ? "2" : "3"}
                </div>
              </div>
            ))}
          </div>

          <Separator />
        </>
      )}

      {/* Full List */}
      <div className="space-y-2">
        <h2 className="font-semibold text-lg">All Rankings</h2>

        {leaderboard.map((user, index) => (
          <div
            key={user.userId}
            className={`flex items-center justify-between p-4 rounded-xl transition shadow-sm ${
              user.userId === userProgress.userId
                ? "bg-emerald-50"
                : "bg-white hover:bg-neutral-50"
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <span
                className={`w-8 text-center font-semibold ${getRankColor(
                  index + 1
                )}`}
              >
                {getMedalEmoji(index + 1) || index + 1}
              </span>

              <Avatar className="h-10 w-10">
                <AvatarImage src={user.userImageSrc} />
              </Avatar>

              <p className="font-medium flex-1 truncate">
                {user.userName}
                {user.userId === userProgress.userId && (
                  <span className="ml-2 text-xs text-emerald-500">
                    you
                  </span>
                )}
              </p>

              <div className="flex items-center gap-1 text-orange-400 font-semibold">
                <Image src="/points.svg" alt="XP" width={16} height={16} />
                {user.points}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Motivation */}
      <div className="rounded-2xl bg-sky-50 p-6 text-center border">
        <p className="font-semibold text-sky-700">
          Keep going 🚀
        </p>
        <p className="text-sm text-sky-600 mt-1">
          Every lesson brings you closer to the top
        </p>
      </div>
    </div>
  );
};

export default LeaderboardPage;

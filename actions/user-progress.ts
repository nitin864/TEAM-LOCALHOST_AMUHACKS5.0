"use server";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


const POINTS_TO_REFILL = 10;

export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    return { error: "practice" };
  }

  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "unauthorized" };
    }

    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
      return { error: "userNotFound" };
    }

    if (currentUserProgress.hearts === 5) {
      return { error: "heartsAlreadyFull" };
    }

    if (currentUserProgress.points < POINTS_TO_REFILL) {
      return { error: "notEnoughPoints" };
    }

    await db
      .update(userProgress)
      .set({
        hearts: 5,
        points: currentUserProgress.points - POINTS_TO_REFILL,
      })
      .where(eq(userProgress.userId, userId));

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");

    return { success: true };
  } catch (error) {
    console.error("Error refilling hearts:", error);
    return { error: "unknown" };
  }
};

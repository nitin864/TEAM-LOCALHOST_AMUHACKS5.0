import { cache } from "react";
import db from "@/db/drizzle";
import { eq, desc } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import {
  challengeProgress,
  courses,
  lessons,
  units,
  userProgress,
} from "./schema";
 

//user progress
export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

/* =========================
   UNITS + LESSONS + CHALLENGES
========================= */
export const getUnits = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  const progress = await getUserProgress();

  if (!progress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.courseId, progress.activeCourseId),
    orderBy: (units, { asc }) => [asc(units.order)],
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  // 🔄 Normalize lesson completion state (correct + safe)
  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      // ✅ guard against empty lessons
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false };
      }

      const completed = lesson.challenges.every(
        (challenge) =>
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every(
            (progress) => progress.completed
          )
      );

      return { ...lesson, completed };
    });

    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
});


/* =========================
   COURSES
========================= */
export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
});

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });

  return data;
});


export const getCourseProgress = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return null;
  }

  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const firstUncompletedLesson = unitsInActiveCourse
  .flatMap((unit) => unit.lessons)
  .find((lesson) => {
    return lesson.challenges.some((challenge) => {
      return (
  !challenge.challengeProgress ||
  challenge.challengeProgress.length === 0 ||
  challenge.challengeProgress.some(
    (progress) => progress.completed === false
  )
);

    });
  });

return {
  activeLesson: firstUncompletedLesson,
  activeLessonId: firstUncompletedLesson?.id,
};
});

export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();
  const courseProgress = await getCourseProgress();

  const lessonId = id ?? courseProgress?.activeLessonId;

  if (!userId || !lessonId) {
    return null;
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  if(!data || !data.challenges){
    return null;
  }
  
  const normalizedChallenges = data.challenges.map((challenge) => {
  // TODO: If something does not work, check the last if clause

  const completed =
    challenge.challengeProgress &&
    challenge.challengeProgress.length > 0 &&
    challenge.challengeProgress.every(
      (progress) => progress.completed
    );

  return { ...challenge, completed };
});

return { ...data, challenges: normalizedChallenges };


});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();

  if (!courseProgress?.activeLessonId) {
    return 0;
  }

  const lesson = await getLesson(courseProgress.activeLessonId);

  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  );

  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );

  return percentage;
});

export const getTopTenUsers = cache(async () => {
  const data = await db
    .select({
      userId: userProgress.userId,
      userName: userProgress.userName,
      userImageSrc: userProgress.userImageSrc,
      points: userProgress.points,
    })
    .from(userProgress)
    .orderBy(desc(userProgress.points))
    .limit(10);

  return data;
});

 
export const getUserRank = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    return null;
  }

  // Count how many users have more points than current user
  const usersWithMorePoints = await db
    .select({ count: userProgress.userId })
    .from(userProgress)
    .where(eq(userProgress.points, currentUserProgress.points));

  // Rank is the count + 1
  const rank = usersWithMorePoints.length + 1;

  return rank;
});




"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState, useTransition } from "react";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize, useMount, useKey, useMedia } from "react-use";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import { ExitModal } from "@/components/modals/exit-modal";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: typeof challengeOptions.$inferSelect[];
  })[];
};

// Header Component
const Header = ({
  hearts,
  percentage,
  onExit,
}: {
  hearts: number;
  percentage: number;
  onExit: () => void;
}) => {
  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <X
        onClick={onExit}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={percentage} />
      <div className="text-rose-500 flex items-center font-bold">
        <Image
          src="/heart.svg"
          height={28}
          width={28}
          alt="Heart"
          className="mr-2"
        />
        {hearts}
      </div>
    </header>
  );
};

// Question Component (QNA Format)
const QuestionDisplay = ({ question }: { question: string }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg lg:text-2xl font-bold text-neutral-700 mb-4">
        {question}
      </h2>
    </div>
  );
};

// Answer Option Component (QNA Format) - PROPERLY FIXED
const AnswerOption = ({
  id,
  text,
  imageSrc,
  audioSrc,
  shortcut,
  selected,
  onClick,
  disabled,
  status,
}: {
  id: number;
  text: string;
  imageSrc: string | null;
  audioSrc: string | null;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none";
}) => {
  const [audio, _, controls] = useAudio({
    src: audioSrc || "",
    crossOrigin: "anonymous",
  });

  useKey(shortcut, onClick, {}, [onClick]);

  const handleClick = () => {
    if (disabled) return;
    if (audioSrc) {
      controls.play();
    }
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50",
        "flex items-center gap-4",
        selected && "border-sky-500 bg-sky-50",
        selected && status === "correct" && "border-green-500 bg-green-50",
        selected && status === "wrong" && "border-rose-500 bg-rose-50",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      {audio}
      
      {/* Shortcut Key */}
      <div
        className={cn(
          "w-8 h-8 rounded-lg border-2 flex items-center justify-center font-semibold text-sm shrink-0",
          selected && "border-sky-500 text-sky-500 bg-sky-100",
          selected && status === "correct" && "border-green-500 text-green-500 bg-green-100",
          selected && status === "wrong" && "border-rose-500 text-rose-500 bg-rose-100",
          !selected && "border-gray-300 text-gray-400"
        )}
      >
        {shortcut}
      </div>

      {/* Image if available */}
      {imageSrc && (
        <div className="relative w-16 h-16 shrink-0">
          <Image src={imageSrc} fill alt={text} className="object-contain" />
        </div>
      )}

      {/* Answer Text - ONLY DISPLAY ONCE */}
      <p
        className={cn(
          "flex-1 text-base lg:text-lg font-medium",
          selected && "text-sky-700",
          selected && status === "correct" && "text-green-700",
          selected && status === "wrong" && "text-rose-700",
          !selected && "text-neutral-700"
        )}
      >
        {text}
      </p>

      {/* Status Icon */}
      {selected && status === "correct" && (
        <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
      )}
      {selected && status === "wrong" && (
        <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
      )}
    </div>
  );
};

// Challenge Component (QNA Format)
const Challenge = ({
  question,
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
}: {
  question: string;
  options: (typeof challengeOptions.$inferSelect)[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
}) => {
  return (
    <div className="space-y-4">
      <QuestionDisplay question={question} />
      <div className="space-y-3">
        {options.map((option, i) => (
          <AnswerOption
            key={option.id}
            id={option.id}
            text={option.text}
            imageSrc={option.imageSrc}
            audioSrc={option.audioSrc}
            shortcut={`${i + 1}`}
            selected={selectedOption === option.id}
            onClick={() => onSelect(option.id)}
            status={status}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

// Footer Component
const Footer = ({
  onCheck,
  status,
  disabled,
}: {
  onCheck: () => void;
  status: "correct" | "wrong" | "none";
  disabled?: boolean;
}) => {
  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width: 1024px)");

  return (
    <footer
      className={cn(
        "lg:h-[140px] h-[100px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Nicely done!
          </div>
        )}
        {status === "wrong" && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Try again.
          </div>
        )}
        <Button
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
        </Button>
      </div>
    </footer>
  );
};

// Result Card Component
const ResultCard = ({
  value,
  variant,
}: {
  value: number;
  variant: "points" | "hearts";
}) => {
  const imageSrc = variant === "hearts" ? "/heart.svg" : "/points.svg";

  return (
    <div
      className={cn(
        "rounded-2xl border-2 w-full",
        variant === "points" && "bg-orange-400 border-orange-400",
        variant === "hearts" && "bg-rose-500 border-rose-500"
      )}
    >
      <div
        className={cn(
          "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
          variant === "hearts" && "bg-rose-500",
          variant === "points" && "bg-orange-400"
        )}
      >
        {variant === "hearts" ? "Hearts Left" : "Total XP"}
      </div>
      <div
        className={cn(
          "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
          variant === "hearts" && "text-rose-500",
          variant === "points" && "text-orange-400"
        )}
      >
        <Image
          alt="Icon"
          src={imageSrc}
          height={30}
          width={30}
          className="mr-1.5"
        />
        {value}
      </div>
    </div>
  );
};

// Main Quiz Component
export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
}: Props) => {
  const { width, height } = useWindowSize();
  const router = useRouter();

  useMount(() => {
    if (initialPercentage === 100) {
      router.push("/learn");
    }
  });

  const [correctAudio, _c, correctControls] = useAudio({
    src: "/correct.wav",
    crossOrigin: "anonymous",
  });
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: "/incorrect.wav",
    crossOrigin: "anonymous",
  });
  const [finishAudio] = useAudio({
    src: "/finish.mp3",
    autoPlay: true,
    crossOrigin: "anonymous",
  });

  const [pending, startTransition] = useTransition();
  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);

    if (!correctOption) {
      return;
    }

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              toast.error("You ran out of hearts!", {
                description: "Get more hearts from the shop to continue learning.",
                action: {
                  label: "Get Hearts",
                  onClick: () => router.push("/shop"),
                },
              });
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            // This is a practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."));
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              toast.error("You ran out of hearts!", {
                description: "Get more hearts from the shop to continue learning.",
                action: {
                  label: "Get Hearts",
                  onClick: () => router.push("/shop"),
                },
              });
              return;
            }

            incorrectControls.play();
            setStatus("wrong");

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."));
      });
    }
  };

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/finish.svg"
            alt="Finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <Image
            src="/finish.svg"
            alt="Finish"
            className="block lg:hidden"
            height={50}
            width={50}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="w-full max-w-sm mt-4"
            onClick={() => router.push("/learn")}
          >
            Continue Learning
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <ExitModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
      />
      {correctAudio}
      {incorrectAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        onExit={() => setIsExitModalOpen(true)}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[700px] w-full px-6 lg:px-0 flex flex-col gap-y-8">
            <Challenge
              question={challenge.question}
              options={options}
              onSelect={onSelect}
              status={status}
              selectedOption={selectedOption}
              disabled={pending}
            />
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};
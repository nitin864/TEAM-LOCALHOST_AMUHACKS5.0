"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ExitModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ExitModal = ({ isOpen, onClose }: ExitModalProps) => {
  const router = useRouter();

  const handleExit = () => {
    onClose();
    router.push("/learn");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src="/mascot_sad.svg"
              alt="Mascot"
              height={80}
              width={80}
              className="object-contain"
            />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Wait, don&apos;t go!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You&apos;re about to leave the lesson. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="secondary"
              className="w-full"
              size="lg"
              onClick={onClose}
            >
              Keep learning
            </Button>
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={handleExit}
            >
              End session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
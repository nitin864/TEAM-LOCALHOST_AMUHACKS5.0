import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b-2">
      <div className="flex items-center justify-between h-14 px-4 lg:px-0">
        
        {/* Left group */}
        <div className="flex items-center gap-x-3">
          <Link href="/courses">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
            </Button>
          </Link>

          <h1 className="text-lg font-semibold text-neutral-800">
            {title}
          </h1>
        </div>

        {/* Right side (stats / icons later) */}
        <div className="flex items-center gap-x-4">
          {/* points, hearts, language selector */}
        </div>

      </div>
    </div>
  );
};

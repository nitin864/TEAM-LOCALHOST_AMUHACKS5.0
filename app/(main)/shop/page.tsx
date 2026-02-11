import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Items } from "./items";
 ;

const ShopPage = async () => {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-col items-center px-4 gap-y-8 py-12">
      <Image src="/store.png" alt="Shop" height={90} width={90} />
      
      <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
        Shop
      </h1>

      <p className="text-muted-foreground text-center text-lg mb-6">
        Spend your points on cool stuff.
      </p>

      <Items 
        hearts={userProgress.hearts}
        points={userProgress.points}
      />
    </div>
  );
};

export default ShopPage;
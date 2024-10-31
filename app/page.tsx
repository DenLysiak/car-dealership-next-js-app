import { Suspense } from "react";
import { getCarMakers } from "./lib/data";
import { Manufacturer } from "./lib/types";
import Select from "./ui/Select";
import InputSkeleton from "./ui/InputSkeleton";

export default async function Home() {
  const { Results } = await getCarMakers();
  const array: Manufacturer[] = [...Results];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-space-around min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-row gap-8 row-start-2 items-center sm:items-start">
        <Suspense fallback={<InputSkeleton />}>
          <Select options={array} />
        </Suspense>
      </main>
    </div>
  );
}

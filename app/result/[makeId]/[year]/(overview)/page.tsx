import { getCarDetail } from "@/app/lib/data";
import { Table } from "@/app/ui/Table";
import TableSkeleton from "@/app/ui/TableSkeleton";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{makeId: string, year: string}>;
  }) {
  const makeId = (await params).makeId;
  const year = (await params).year;
  const { Results } = await getCarDetail(makeId, year);
  const arrayOfResult = [...Results];

  return (
    <div className="flex flex-col gap-10 p-10">
      <Suspense fallback={<TableSkeleton />}>
        {arrayOfResult.length ? <Table arrayOfResult={arrayOfResult} /> : <h1>There is no details or error fired. Please, try again!</h1>}
      </Suspense>
    </div>
  );
}

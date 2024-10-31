// export async function generateStaticParams() {
//   const results = await fetch("https://./result").then((res) => res.json());
//   return results.map((result) => ({
//     slug: result.slug,
//   }));
// }

import { getCarDetail } from "@/app/lib/data";
import { CarDetail } from "@/app/lib/types";
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
  
  const arrayOFResult = [...Results];

  return (
    <div className="flex flex-col gap-10 p-10">
      <h1>Result page:</h1>

      <Suspense fallback={<TableSkeleton />}>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr className="even:bg-gray-50">
              <th className="py-2 px-4 border-b border-gray-200 text-gray-800">
                ID
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-800">
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-800">
                Model ID
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-800">
                Model Name
              </th>
            </tr>
          </thead>

          <tbody>
            {arrayOFResult.map((details: CarDetail, i) => (
              <tr
                key={details.Model_ID + i}
                className="even:bg-gray-50 border-b border-gray-200 hover:border-black"
              >
                {Object.values(details).map((value) => (
                  <th
                    key={value}
                    className="py-2 px-4 text-gray-800 cursor-pointer"
                  >
                    {value}
                  </th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Suspense>
    </div>
  );
}

'use client';
import Link from "next/link";
import { Manufacturer } from "../lib/types";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  options: Manufacturer[];
}

export default function Select({ options }: Props) {
  const arrayOfYears = Array.from({ length: 10 }, (_, i) => i + 2015);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get('makeId') || '0';
  const year = searchParams.get('year') || '0';

  interface DataProps {
    slug: 'year' | 'makeId';
    input: string;
  }

  function handleSelect(data: DataProps) {
    const params = new URLSearchParams(searchParams);
    if (data) {
      params.set(`${data.slug}`, data.input);
    } else {
      params.delete("year");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <select
        className="bg-gray-50 w-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        defaultValue={carId ? carId : "Select car"}
        onChange={(ev) =>
          handleSelect({ slug: "makeId", input: ev.target.value })
        }
      >
        {options.map((item: Manufacturer) => (
          <option key={item.MakeId} value={`${item.MakeId}`}>
            {`${item.MakeId} ${item.MakeName} ${item.VehicleTypeId} ${item.VehicleTypeName}`}
          </option>
        ))}
      </select>

      <select
        className="bg-gray-50 w-25 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        defaultValue={year ? year : "Select year"}
        onChange={(ev) =>
          handleSelect({ slug: "year", input: ev.target.value })
        }
      >
        {arrayOfYears.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>

      <Link
        className={clsx(
          "bg-gray-50 w-25 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          {
            "pointer-events-none": false,
          }
        )}
        href={"/result/[makeId]/[year]"}
        as={`/result/${carId}/${year}`}
      >
        {"Next ->"}
      </Link>
    </>
  );
}
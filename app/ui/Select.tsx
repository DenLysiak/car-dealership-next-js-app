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
  const carId = searchParams.get('makeId') || 0;
  const year = searchParams.get('year') || 0;

  interface DataProps {
    params: 'year' | 'makeId';
    input: string;
  }

  function handleSelect(data: DataProps) {
    const params = new URLSearchParams(searchParams);
    if (data) {
      params.set(`${data.params}`, data.input);
    } else {
      params.delete("year");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="block w-full">
      <div className="block w-full mb-4">
        <label
          className="block mb-2 text-sm font-medium text-gray-600 w-full"
          htmlFor="select_car"
        >
          Car manufacturer
        </label>
        <select
          id="select_car"
          className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 hover:border-black focus:outline-none"
          onChange={(ev) => {
            handleSelect({ params: "makeId", input: ev.target.value });
          }}
        >
          {options.map((item: Manufacturer) => (
            <option key={item.MakeId} value={`${item.MakeId}`}>
              {`${item.MakeId} ${item.MakeName} ${item.VehicleTypeId} ${item.VehicleTypeName}`}
            </option>
          ))}
        </select>
      </div>

      <div className="block w-full md-4">
        <label
          className="block mb-2 text-sm font-medium text-gray-600 w-full"
          htmlFor="select-year"
        >
          Year of production
        </label>
        <select
          id="select_year"
          className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 hover:border-black focus:outline-none"
          onChange={(ev) => {
            handleSelect({ params: "year", input: ev.target.value });
          }}
        >
          {arrayOfYears.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <Link
        className={clsx(
          "h-12 mt-4 border pointer-events-none border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 hover:border-black focus:outline-none",
          {
            "pointer-events-auto": carId && year,
          }
        )}
        href={"/result/[makeId]/[year]"}
        as={`/result/${carId}/${year}`}
      >
        {"Next ->"}
      </Link>
    </div>
  );
}
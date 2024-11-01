import { CarDetail } from "../lib/types";

interface Props {
  arrayOfResult: CarDetail[];
}

export function Table({ arrayOfResult }: Props) {
  return (
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
        {arrayOfResult.map((details: CarDetail, i) => (
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
  );
}
export default function InputSkeleton() {
  return (
    <div role="status" className="w-full animate-pulse flex flex-col p-10">
      <div className="h-12.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-12.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-12.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    </div>
  );
}

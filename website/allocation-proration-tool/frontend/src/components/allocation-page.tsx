import React, { useState } from "react";
import { AllocationResults } from "../types/allocation-type";
import AllocationResult from "./allocation-result";
import AllocationRequest from "./allocation-request";

const AllocationPage: React.FC = () => {
  const [result, setResult] = useState<AllocationResults | null>(null);

  const handleResult = (result: AllocationResults) => {
    setResult(result);
  };
  return (
    <div>
      <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
        Allocation Proration Tool
      </h1>
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-4 gap-4">
        <div className="col-span-3 bg-white p-6 rounded-lg shadow-md">
          <AllocationRequest handleResult={handleResult} />
        </div>

        <div className="col-span-1 bg-slate-500 p-6 rounded-lg shadow-md text-white">
          <AllocationResult result={result} />
        </div>
      </div>
    </div>
  );
};

export default AllocationPage;

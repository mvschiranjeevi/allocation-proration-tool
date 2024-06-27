import React from "react";
import { AllocationResults } from "../types/allocation-type";

interface AllocationResultProps {
  result: AllocationResults | null;
}

const AllocationResult: React.FC<AllocationResultProps> = ({ result }) => {
  return (
    <div>
      {/* <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4"> */}
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      {/* </div> */}
      {result ? (
        <div>
          <ul>
            {Object.entries(result).map(([name, amount]) => (
              <li
                key={name}
                className="flex items-center justify-between py-2 px-4 bg-white rounded-lg shadow-sm mb-2 text-black"
              >
                <span className="text-lg">{name}</span>
                <span className="text-lg font-bold">${amount.toFixed(4)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Enter Investment Details, To View The Results</p>
      )}
    </div>
  );
};

export default AllocationResult;

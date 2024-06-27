import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { Investor, AllocationRequestProps } from "../types/allocation-type";
import { prorate } from "../lib/api";

const AllocationRequest: React.FC<AllocationRequestProps> = ({
  handleResult,
}) => {
  const [allocationAmount, setAllocationAmount] = useState<number>();
  const [error, setError] = useState<string | null>(null);

  const [investors, setInvestors] = useState<Investor[]>([
    { name: "", requested_amount: 0, average_amount: 0 },
    { name: "", requested_amount: 0, average_amount: 0 },
  ]);

  const handleInvestorChange = (
    index: number,
    field: keyof Investor,
    value: string | number
  ) => {
    const newInvestors = [...investors];
    newInvestors[index] = {
      ...newInvestors[index],
      [field]: field === "name" ? value : parseFloat(value as string),
    };
    setInvestors(newInvestors);
  };

  const handleRemoveInvestor = (index: number) => {
    const newInvestors = investors.filter((_, i) => i !== index);
    setInvestors(newInvestors);
  };

  const handleAddInvestor = () => {
    setInvestors([
      ...investors,
      { name: "", requested_amount: 0, average_amount: 0 },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (allocationAmount === undefined || allocationAmount < 0) {
      setError("Allocation amount must be a non-negative number.");
      return;
    }
    for (const investor of investors) {
      if (investor.requested_amount < 0 || investor.average_amount < 0) {
        setError(
          "Requested amount and average amount must be non-negative numbers."
        );
        return;
      }
    }

    const investorNames = investors.map((investor) => investor.name);
    const uniqueNames = new Set(investorNames);

    if (uniqueNames.size !== investorNames.length) {
      setError("Investor names must be unique.");
      return;
    }
    try {
      const response = await prorate({ allocationAmount, investors });
      handleResult(response.data);
    } catch (error) {
      console.error("Error submitting data", error);
      setError("There was an error processing your request.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inputs</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Total Available Allocation
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-gray-500">
              $
            </span>
            <input
              type="number"
              className="mt-1 block pl-10 pr-3 py-2 border rounded"
              placeholder="Allocation"
              value={allocationAmount ?? ""}
              onChange={(e) => setAllocationAmount(parseFloat(e.target.value))}
              required
            />
          </div>
        </div>
        <h2 className="text-lg font-bold mb-2">Investor Breakdown</h2>
        {investors.map((investor, index) => (
          <div
            key={index}
            className="mb-4 grid grid-cols-[3fr_3fr_3fr_1fr] gap-2 items-center"
          >
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-gray-500">
                <FontAwesomeIcon icon={faUser} className="text-sm" />
              </span>
              <input
                type="text"
                className="mt-1 block w-full pl-10 pr-3 py-2 border rounded"
                placeholder="Name"
                value={investor.name}
                onChange={(e) =>
                  handleInvestorChange(index, "name", e.target.value)
                }
                required
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-gray-500">
                $
              </span>
              <input
                type="number"
                className="mt-1 block w-full pl-10 pr-3 py-2 border rounded"
                placeholder="Requested Amount"
                value={investor.requested_amount}
                onChange={(e) =>
                  handleInvestorChange(
                    index,
                    "requested_amount",
                    e.target.value
                  )
                }
                required
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-gray-500">
                $
              </span>
              <input
                type="number"
                className="mt-1 block w-full pl-10 pr-3 py-2 border rounded"
                placeholder="Average Amount"
                value={investor.average_amount}
                onChange={(e) =>
                  handleInvestorChange(index, "average_amount", e.target.value)
                }
                required
              />
            </div>
            {index >= 2 && (
              <div className="flex justify-center items-center col-span-1">
                <button
                  type="button"
                  className="mt-1 bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleRemoveInvestor(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>
        ))}
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="button"
          className="mt-2 mb-4 mr-2 bg-brand-600 text-white px-4 py-2 rounded"
          onClick={handleAddInvestor}
        >
          Add Investor
        </button>
        <button
          type="submit"
          className="mt-2 mb-4 bg-brand-500 text-white px-4 py-2 rounded"
        >
          Prorate
        </button>
      </form>
    </div>
  );
};

export default AllocationRequest;

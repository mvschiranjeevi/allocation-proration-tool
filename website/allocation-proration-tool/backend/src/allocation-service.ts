import { ProratedData, Investment } from "./types/types";

export const prorateAllocation = (
  allocationAmount: number,
  investorData: Investment[]
): ProratedData => {
  const result: ProratedData = {};

  const totalRequested = investorData.reduce(
    (acc, investor) => acc + investor.requested_amount,
    0
  );

  const totalAverage = investorData.reduce(
    (acc, investor) => acc + investor.average_amount,
    0
  );

  // I started with the approach of using prorated formula and distributing remaining amount equally
  // Later, I used recursion in allocationg the amount to the investors.
  const prorateCalculation = (
    allocationAmount: number,
    totalAverage: number,
    investorAmounts: Investment[]
  ) => {
    //case 0 (Base) : Check if the Allocation amount is less than Zero or Investment data is empty
    // Return the result
    if (allocationAmount <= 0 || investorData.length === 0) {
      console.log("Allocation or investors array must not be empty.");
      return result;
    }
    //Variables to keep track of the reamining allocation and average amount
    let updatedAverageAmount = totalAverage;
    let reaminingAllocation = allocationAmount;

    // case 1 : If the Allocation amount is less than total requested amount, allocate the requested amount
    // to each investor
    if (totalRequested <= allocationAmount) {
      //Iterate over the investors
      investorAmounts.forEach((investment) => {
        const investorName = investment.name;
        // Update the result with the new requested amount
        // If there was a previous allocation, add to it; otherwise, set the new allocation
        if (result[investorName]) {
          result[investorName] += investment.requested_amount;
        } else {
          result[investorName] = investment.requested_amount;
        }
      });
      return result;
    }

    for (const investment of investorAmounts) {
      // Ignore investors who got the amount requested
      if (investment.allocation_complete) {
        continue;
      }

      //Formula to calculate prorated amount
      let proratedAmount =
        allocationAmount * (investment.average_amount / totalAverage);

      if (
        proratedAmount > investment.requested_amount ||
        proratedAmount === investment.requested_amount
      ) {
        //Once after allocationg requested amount to this investor, update by subtracting the average amount to keep track of avg amount
        proratedAmount = investment.requested_amount;
        updatedAverageAmount -= investment.average_amount;

        // Toogle the allocation complete flag for this investor, so that this investor will not be considered next time.
        investment.allocation_complete = true;
      }
      reaminingAllocation -= proratedAmount;

      // Update the result with the new prorated amount
      // If there was a previous allocation, add to it; otherwise, set the new allocation
      const investorName = investment.name;
      if (result[investorName]) {
        result[investorName] += proratedAmount;
      } else {
        result[investorName] = proratedAmount;
      }
    }

    //Recursion happens here
    prorateCalculation(
      reaminingAllocation,
      updatedAverageAmount,
      investorAmounts
    );
  };

  prorateCalculation(allocationAmount, totalAverage, investorData);
  return result;
};

export interface Investor {
  name: string;
  requested_amount: number;
  average_amount: number;
}

export interface ProratedInvestor {
  name: string;
  prorated_amount: number;
}

export interface AllocationResults {
  [key: string]: number;
}

export interface AllocationRequestProps {
  handleResult: (result: AllocationResults) => void;
}

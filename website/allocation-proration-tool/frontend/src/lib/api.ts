import axios from "axios";
import { Investor } from "../types/allocation-type";

export const prorate = async (body: {
  allocationAmount: number | undefined;
  investors: Investor[];
}) => {
  const { allocationAmount, investors } = body;
  return await axios.post("http://localhost:5001/prorate", {
    allocation_amount: allocationAmount,
    investor_amounts: investors,
  });
};

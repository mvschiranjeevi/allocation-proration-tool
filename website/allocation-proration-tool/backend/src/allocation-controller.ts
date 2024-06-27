import { Request, Response } from "express";
import { prorateAllocation } from "./allocation-service";

export function handleProration(req: Request, res: Response) {
  const { allocation_amount, investor_amounts } = req.body;
  const result = prorateAllocation(allocation_amount, investor_amounts);
  res.json(result);
}

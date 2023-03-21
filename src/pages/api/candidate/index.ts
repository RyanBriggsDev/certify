import type { NextApiRequest, NextApiResponse } from "next";
import * as utils from "@/lib/utils";
import { createCandidate } from "@/lib/schema";
import { handleErrors } from "@/lib/errors";

type CandidateResponse = {
  success: Boolean;
  data: Object[] | Object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await utils.checkAuth(req, res);

  switch (req.method) {
    case "GET":
      try {
        const courses = await utils.prisma.candidate.findMany({
          include: {
            company: true,
          },
        });
        const response: CandidateResponse = { success: true, data: courses };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;

    case "POST":
      const { body } = req;
      try {
        const inputData = await createCandidate.parse({
          ...body,
        });
        const candidate = await utils.prisma.candidate.create({
          data: inputData,
        });
        const response: CandidateResponse = { success: true, data: candidate };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;
  }
}

export const getCandidates = async (ctx) => {
  const token = await utils.checkAuth(ctx.req, ctx.res);
  try {
    const candidates = await utils.prisma.candidate.findMany({
      include: {
        company: true,
      },
    });
    return candidates;
  } catch (error) {
    return error;
  }
};

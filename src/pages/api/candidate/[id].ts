import type { NextApiRequest, NextApiResponse } from "next";
import * as utils from "@/lib/utils";
import { updateCandidate } from "@/lib/schema";
import { handleErrors } from "@/lib/errors";

type CandidateResponse = {
  success: Boolean;
  data: Object[] | Object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await utils.checkAuth(req, res);
  const { body, query } = req;

  switch (req.method) {
    case "GET":
      try {
        const candidate = await utils.prisma.candidate.findMany({
          where: {
            id: query.id?.toString(),
            createdById: token?.sub,
          },
          include: {
            company: true,
            results: true,
          },
        });
        const response: CandidateResponse = { success: true, data: candidate };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;

    case "PUT":
      try {
        // Validate user input
        const inputData = await updateCandidate.parse(body);
        const updatedCandidate = await utils.prisma.candidate.updateMany({
          where: {
            id: query.id?.toString(),
            createdById: token?.sub,
          },
          data: inputData,
        });
        const response: CandidateResponse = { success: true, data: updatedCandidate };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;

    case "DELETE":
      try {
        const deletedCandidate = await utils.prisma.candidate.deleteMany({
          where: {
            id: query.id?.toString(),
            createdById: token?.sub,
          },
        });
        const response: CandidateResponse = { success: true, data: deletedCandidate };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;
  }
}

export const getCandidate = async (ctx) => {
  const token = await utils.checkAuth(ctx.req, ctx.res);
  try {
    const candidate = await utils.prisma.candidate.findMany({
      where: {
        id: ctx.query.id?.toString(),
      },
      include: {
        company: true,
        results: {
          include: {
            course: true,
          },
        },
      },
    });
    return candidate;
  } catch (error) {
    return error;
  }
};

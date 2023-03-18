import type { NextApiRequest, NextApiResponse } from "next";
import * as utils from "@/lib/utils";
import { updateResult } from "@/lib/schema";
import { handleErrors } from "@/lib/errors";

type EnrollResponse = {
  success: Boolean;
  data: Object[] | Object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  await utils.checkAuth(req, res);

  switch (req.method) {
    case "GET":
      const { body } = req;
      try {
        const result = await utils.prisma.result.findMany({
          where: {
            id: query.id?.toString(),
          },
        });
        const response: EnrollResponse = { success: true, data: result };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;

    case "PUT":
      try {
        // Validate user input
        const inputData = await updateResult.parse(body);
        const updatedResult = await utils.prisma.result.updateMany({
          where: {
            id: query.id?.toString(),
          },
          data: inputData,
        });
        const response: EnrollResponse = { success: true, data: updatedResult };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;

    case "DELETE":
      try {
        const deletedResult = await utils.prisma.result.deleteMany({
          where: {
            id: query.id?.toString(),
          },
        });
        const response: EnrollResponse = { success: true, data: deletedResult };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;
  }
}

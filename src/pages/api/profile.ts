import type { NextApiRequest, NextApiResponse } from "next";
import * as utils from "@/lib/utils";
import { updateAdmin } from "@/lib/schema";
import { handleErrors } from "@/lib/errors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await utils.checkAuth(req, res);

  if (req.method == "GET") {
    try {
      const profile = await utils.prisma.admin.findUnique({
        where: {
          id: token?.sub,
        },
      });
      const filtered = await utils.filterProfile(profile);
      res.status(200).json({ success: true, data: filtered });
    } catch (error) {
      await handleErrors(error, res);
    }
  } else if (req.method == "PUT") {
    const { body } = req;
    try {
      const update = await updateAdmin.parse(body);
      const profile = await utils.prisma.admin.update({
        where: {
          id: token?.sub,
        },
        data: update,
      });
      const filtered = await utils.filterProfile(profile);
      res.status(200).json({ success: true, data: filtered });
    } catch (error) {
      await handleErrors(error, res);
    }
  }
}

export const getProfile = async (ctx) => {
  const token = await utils.checkAuth(ctx.req, ctx.res);
  try {
    const profile = await utils.prisma.admin.findUnique({
      where: {
        id: token?.sub,
      },
    });
    const filtered = await utils.filterProfile(profile);
    return filtered;
  } catch (error) {
    return error;
  }
};

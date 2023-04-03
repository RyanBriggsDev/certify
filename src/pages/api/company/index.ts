import type { NextApiRequest, NextApiResponse } from "next";
import * as utils from "@/lib/utils";
import { createCompany } from "@/lib/schema";
import { handleErrors } from "@/lib/errors";

type CompanyResponse = {
  success: Boolean;
  data: Object[] | Object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await utils.checkAuth(req, res);
  switch (req.method) {
    case "GET":
      try {
        const companies = await utils.prisma.company.findMany();
        const response: CompanyResponse = { success: true, data: companies };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;

    case "POST":
      const { body } = req;
      try {
        const inputData = await createCompany.parse(body);
        const company = await utils.prisma.company.create({
          data: inputData,
        });
        const response: CompanyResponse = { success: true, data: company };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;
  }
}

export const getCompanies = async (ctx) => {
  const _ = await utils.checkAuth(ctx.req, ctx.res);
  try {
    const companies = await utils.prisma.company.findMany();
    return companies;
  } catch (error) {
    return error;
  }
};

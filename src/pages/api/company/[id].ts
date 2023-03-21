import type { NextApiRequest, NextApiResponse } from "next";
import * as utils from "@/lib/utils";
import { updateCompany } from "@/lib/schema";
import { handleErrors } from "@/lib/errors";

type CompanyResponse = {
  success: Boolean;
  data: Object[] | Object;
};

type NoCompanyResponse = {
  success: Boolean;
  data: null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const _ = await utils.checkAuth(req, res);
  const { body, query } = req;

  switch (req.method) {
    case "GET":
      try {
        const companies = await utils.prisma.company.findMany({
          where: {
            id: query.id?.toString(),
          },
          include: {
            candidates: true,
          },
        });
        if (companies.length === 0) {
          const nocompanies: NoCompanyResponse = { success: false, data: null };
          res.status(200).json(nocompanies);
          return;
        }
        const companyCandidates = await utils.prisma.candidate.findMany({
          where: {
            companyId: query.id?.toString(),
          },
        });
        const response: CompanyResponse = { success: true, data: { companies, companyCandidates } };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;

    case "PUT":
      try {
        // Validate user input
        const inputData = await updateCompany.parse(body);
        const updatedCompany = await utils.prisma.company.updateMany({
          where: {
            id: query.id?.toString(),
          },
          data: inputData,
        });
        const response: CompanyResponse = { success: true, data: updatedCompany };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;

    case "DELETE":
      try {
        const deletedCompany = await utils.prisma.company.deleteMany({
          where: {
            id: query.id?.toString(),
          },
        });
        const response: CompanyResponse = { success: true, data: deletedCompany };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;
  }
}

export const getSingleCompany = async (ctx) => {
  const _ = await utils.checkAuth(ctx.req, ctx.res);
  try {
    const companies = await utils.prisma.company.findMany({
      where: {
        id: ctx.query.id?.toString(),
      },
      include: {
        candidates: true,
      },
    });
    if (companies.length === 0) {
      const nocompanies: NoCompanyResponse = { success: false, data: null };
      return nocompanies;
    }
    const response: CompanyResponse = { success: true, data: companies };
    return response;
  } catch (error) {
    return error;
  }
};
